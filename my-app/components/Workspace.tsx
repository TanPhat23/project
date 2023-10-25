import Split from "react-split";
import ProblemDescription from "./WorksSpaceDescription";
import PlayGround from "./PlayGround";
type WorkSpaceProps = {};
const Workspace: React.FC<WorkSpaceProps> = () => {
  return (
    <div className="scrollbar scrollbar-thumb-gray-900 scroll-track-gray-100">
      <Split className="split" minSize={0}>
        <ProblemDescription />
        <PlayGround />
      </Split>
    </div>
  );
};

export default Workspace;
