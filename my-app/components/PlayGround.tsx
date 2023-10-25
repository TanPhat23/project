import Split from "react-split";
import PreferenceNavbar from "./PreferenceNavbar";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";

type PlayGRoundProps = {};
const PlayGround: React.FC<PlayGRoundProps> = () => {
  const BoilerPlate = `function twoSum(nums, target){
    //Write your code here
}`;
  return (
    <>
      <div className="flex flex-col w-full bg-dark-layer-1 overflow-x-hidden">
        <PreferenceNavbar />
        <Split
          className="h-[calc(100vh-94px)]"
          direction="vertical"
          sizes={[60, 40]}
          minSize={60}
        >
          <div className="w-full overflow-auto">
            <CodeMirror
              value={BoilerPlate}
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
              <div className="mr-2 items-start mt-2 text-white">
                <div className="flex flex-wrap items-center gap-y-4">
                  <div className="font-medium items-center transition-all focus:outline-none inline-block bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 cursor-pointer whitespace-nowrap">
                    Case 1
                  </div>
                </div>
              </div>
              <div className="mr-2 items-start mt-2 text-white">
                <div className="flex flex-wrap items-center gap-y-4">
                  <div className="font-medium items-center transition-all focus:outline-none inline-block bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 cursor-pointer whitespace-nowrap">
                    Case 2
                  </div>
                </div>
              </div>
              <div className="mr-2 items-start mt-2 text-white">
                <div className="flex flex-wrap items-center gap-y-4">
                  <div className="font-medium items-center transition-all focus:outline-none inline-block bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 cursor-pointer whitespace-nowrap">
                    Case 3
                  </div>
                </div>
              </div>
            </div>
            {}
            <div className="font-semibold">
              <p className="text-sm font-medium mt-4 text-white">Input:</p>
              <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                nums:[2,7,11,15], target: 9
              </div>
              <p className="text-sm font-medium mt-4 text-white">Output:</p>
              <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                nums:[0,1]
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
