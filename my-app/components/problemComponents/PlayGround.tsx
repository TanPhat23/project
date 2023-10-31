"use client";
import Split from "react-split";
import PreferenceNavbar from "./PreferenceNavbar";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/lib/problems/types";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { problems } from "@/lib/problems";
import { firestore } from "@/app/firebase/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useLocalStorage from "@/lib/hooks/useLocalStorage";

type PlayGRoundProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};
type ParamsType = {
  params: {
    id: string;
  };
};
export interface PlayGroundSettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropDownIsOpen: boolean;
}
const PlayGround: React.FC<PlayGRoundProps> = ({
  problem,
  setSuccess,
  setSolved,
}) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
  let [userCode, setUserCode] = useState<string>(problem.starterCode);
  const [settings, setSettings] = useState<PlayGroundSettings>({
    fontSize: fontSize,
    settingsModalIsOpen: false,
    dropDownIsOpen: false,
  });

  const { user } = useUser();
  const id: string = problem.id;

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You need to be log in to write code");
      return;
    }
    try {
      userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb = new Function(`return ${userCode}`)();
      const handler = problems[id as string].handlerFunction;

      if (typeof handler === "function") {
        const success = handler(cb);
        if (success) {
          toast.success("Congrats! All tests passed!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 4000);
          setSolved(true);
        }
        const userRef = doc(firestore, "users", user.id);
        await updateDoc(userRef, {
          solvedProblems: arrayUnion(id),
        });
      }
    } catch (error: any) {
      console.log(error.message);
      if (
        error.message.startsWith(
          "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:"
        )
      ) {
        toast.error("Oops! One or more test cases failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };
  useEffect(() => {
    const code = localStorage.getItem(`code-${id}`);
    if (user) {
      setUserCode(code ? JSON.parse(code) : problem.starterCode);
    } else {
      setUserCode(problem.starterCode);
    }
  }, [id, user, problem.starterCode]);
  const onChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${id}`, JSON.stringify(value));
  };

  return (
    <>
      <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
        <PreferenceNavbar settings={settings} setSettings={setSettings} />
        <Split
          className="h-[calc(100vh-94px)]"
          direction="vertical"
          sizes={[60, 40]}
          minSize={60}
        >
          <div className="w-full overflow-auto">
            <CodeMirror
              value={userCode}
              theme={vscodeDark}
              onChange={onChange}
              extensions={[javascript()]}
              style={{ fontSize: settings.fontSize }}
            />
          </div>
          <div className="w-full px-5 overflow-auto">
            <div className="flex h-10 items-center space-x-6">
              <div className="relative flex h-full flex-col justify-center cursor-pointer">
                <div className="text-sm font-medium leading-5 text-white">
                  Text cases
                </div>
                <hr className=" absolute bottom-0 h-0.5 w-full rounded-full bg-white border-none" />
              </div>
            </div>

            <div className="flex">
              {problem?.examples.map((example, index) => (
                <div
                  className="mr-2 items-start mt-2 text-white"
                  key={example.id}
                  onClick={() => setActiveTestCaseId(index)}
                >
                  <div className="flex flex-wrap items-center gap-y-4">
                    <div
                      className={cn(
                        "font-medium items-center transition-all focus:outline-none inline-block bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 cursor-pointer whitespace-nowrap",
                        activeTestCaseId === index
                          ? "text-white"
                          : "text-gray-500"
                      )}
                    >
                      Case {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {}
            <div className="font-semibold">
              <p className="text-sm font-medium mt-4 text-white">Input:</p>
              <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                {problem?.examples[activeTestCaseId].inputText}
              </div>
              <p className="text-sm font-medium mt-4 text-white">Output:</p>
              <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                {problem?.examples[activeTestCaseId].outputText}
              </div>
            </div>
          </div>
        </Split>
        <EditorFooter handleSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default PlayGround;
