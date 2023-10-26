import Split from "react-split";
import ProblemDescription from "./WorksSpaceDescription";
import PlayGround from "./PlayGround";
import { Problem } from "@/lib/problems/types";
type WorkSpaceProps = {
  problem: Problem
};
const Workspace: React.FC<WorkSpaceProps> = ({problem}) => {
  return (
    <div className="scrollbar scrollbar-thumb-gray-900 scroll-track-gray-100">
      <Split className="split h-full">
        <ProblemDescription problem = {problem}/>
        <PlayGround problem = {problem}/>
      </Split>
    </div>
  );
};

export default Workspace;
