import Split from "react-split"
import ProblemDescription from "./WorksSpaceDescription"
type WorkSpaceProps = {}
const Workspace: React.FC<WorkSpaceProps> = () => {
  return (
    <Split className="split" minSize={0}>
        <ProblemDescription/>
        <div className="h-screen">
          The Code Editor will be here
        </div>
    </Split>
  )
}

export default Workspace