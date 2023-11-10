"use client";
import Split from "react-split";
import PreferenceNavbar from "./PreferenceNavbar";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/lib/problems/types";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { problems } from "@/lib/problems";
import { firestore } from "@/lib/firebase/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useLocalStorage from "@/lib/hooks/useLocalStorage";

type PlayGRoundProps = {
  problem: Problem;
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
export interface LanguageSettings {
  language: string;
}
const PlayGround: React.FC<PlayGRoundProps> = ({ problem, setSolved }) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
  const [actual, setActual] = useState<any | undefined>(undefined);
  const [actualTF, setActualTF] = useState<boolean[] | undefined>(undefined);
  const [testcaseActive, setTestcaseActive] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
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
    userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
    const cb = new Function(`return ${userCode}`)();
    const [results, resultsTF, success] = problems[id].handlerFunction(cb);
    console.log(results);
    console.log(resultsTF);
    setActual(results);
    setActualTF(resultsTF);
    setSuccess(success);
    setTestcaseActive(false);
    if (success) {
      toast.success("Congrats! All tests passed!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      setSuccess(true);
      setSolved(true);
      const userRef = doc(firestore, "users", user.id);
      await updateDoc(userRef, {
        solvedProblems: arrayUnion(id),
      });
    } else {
      toast.error("One or more test cases failed.", {
        style: {
          background: "#333",
          color: "#fff",
          marginRight: "70px",
          marginTop: "40px",
        },
      });
    }
  };
  let [selectedLanguage, setSelectedLanguage] = useState<LanguageSettings>({
    language: "JavaScript",
  });

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
        <PreferenceNavbar
          settings={settings}
          setSettings={setSettings}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
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
              extensions={
                selectedLanguage.language === "C++" ? [cpp()] : [javascript()]
              }
              style={{ fontSize: settings.fontSize }}
            />
          </div>
          <div className="bg-[#282828] rounded-lg flex flex-col min-w-[354px]">
            {/* TABS */}
            <div className="flex w-full gap-8 px-5 min-h-[36px] h-9 rounded-t-lg bg-[#303030] items-center text-xs border-b-[1px] border-[#454545] font-medium text-[#eff1f6bf]">
              <button
                onClick={() => setTestcaseActive(true)}
                className={`flex items-center ${
                  testcaseActive && "border-b-[2px] text-white pt-[2px]"
                } border-white h-full hover:text-white cursor-pointer`}
              >
                Testcase
              </button>
              <button
                onClick={() => setTestcaseActive(false)}
                className={`flex items-center ${
                  !testcaseActive && "border-b-[2px] text-white pt-[2px]"
                } border-white h-full hover:text-white cursor-pointer`}
              >
                Result
              </button>
            </div>
            {/* Console */}
            <div
              className={`flex flex-col w-full overflow-y-auto bg-[#282828] rounded-b-lg p-5 ${
                !actual &&
                !testcaseActive &&
                "items-center justify-center h-full"
              }`}
            >
              {success != undefined && !testcaseActive && (
                <div
                  className={`text-xl ${
                    success ? "text-green-500" : "text-red-500"
                  }  font-medium mb-4 -mt-1`}
                >
                  {success ? "Accepted" : "Wrong Answer"}
                </div>
              )}
              {/* Cases */}
              {!actual && !testcaseActive ? (
                <div className="text-sm text-[#ebebf54d]">
                  You must run your code first
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex space-x-3 text-sm tracking-tight items-center text-[#eff1f6bf]">
                    {problem.examples.map((example, index) => (
                      <button
                        onClick={() => setActiveTestCaseId(index)}
                        key={example.id}
                      >
                        <div
                          className={`${
                            index == activeTestCaseId &&
                            "bg-[#3E3E3E] text-white"
                          } hover:bg-[#464646] rounded-lg hover:text-white py-1 px-3`}
                        >
                          <pre className="flex items-center whitespace-pre-wrap">
                            {actualTF && !testcaseActive && (
                              <div
                                className={`h-1 w-1 mr-2 rounded-full ${
                                  actualTF[index]
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                            )}

                            <div>Case {index + 1}</div>
                          </pre>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div>
                    <p className="font-medium text-xs text-[#eff1f6bf]">
                      Input:
                    </p>
                    <div className=" bg-[#3E3E3E] text-white rounded-lg py-2 px-4 mt-[9px]">
                      <pre className="whitespace-pre-wrap">
                        {problem.examples[activeTestCaseId].inputText}
                      </pre>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-xs text-[#eff1f6bf]">
                      Output:
                    </p>
                    <div className=" bg-[#3E3E3E] text-white rounded-lg py-2 px-4 mt-[9px]">
                      <pre className="whitespace-pre-wrap">
                        {problem.examples[activeTestCaseId].outputText}
                      </pre>
                    </div>
                  </div>
                  {actual && !testcaseActive && (
                    <div>
                      <p className="font-medium text-xs text-[#eff1f6bf]">
                        Actual:
                      </p>
                      <div className=" bg-[#3E3E3E] text-white rounded-lg py-2 px-4 mt-[9px]">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(actual[activeTestCaseId])}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Split>
        <EditorFooter handleSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default PlayGround;
