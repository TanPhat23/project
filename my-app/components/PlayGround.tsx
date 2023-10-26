import Split from "react-split";
import PreferenceNavbar from "./PreferenceNavbar";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/lib/problems/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PlayGRoundProps = {
  problem: Problem;
};
const PlayGround: React.FC<PlayGRoundProps> = ({ problem }) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  return (
    <>
      <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
        <PreferenceNavbar />
        <Split
          className="h-[calc(100vh-94px)]"
          direction="vertical"
          sizes={[60, 40]}
          minSize={60}
        >
          <div className="w-full overflow-auto">
            <CodeMirror
              value={problem.starterCode}
              theme={vscodeDark}
              extensions={[javascript()]}
              style={{ fontSize: 16 }}
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
              {problem.examples.map((example, index) => (
                <div
                  className="mr-2 items-start mt-2 text-white"
                  key={example.id}
                  onClick={()=> setActiveTestCaseId(index)}
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
                {problem.examples[activeTestCaseId].inputText}
              </div>
              <p className="text-sm font-medium mt-4 text-white">Output:</p>
              <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                {problem.examples[activeTestCaseId].outputText}
              </div>
            </div>
          </div>
        </Split>
        <EditorFooter />
      </div>
    </>
  );
};

export default PlayGround;
