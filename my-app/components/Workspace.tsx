"use client";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import PlayGround from "./PlayGround";
import { Problem } from "@/lib/problems/types";
import { useState } from "react";

type WorkSpaceProps = {
  problem: Problem;
};
const Workspace: React.FC<WorkSpaceProps> = ({ problem }) => {
  const [success, setSuccess] = useState(false);
  const [solved, setSolved] = useState(false);
  return (
    <Split className="split h-full">
      <ProblemDescription problem={problem} _solved={solved}/>
      <div>
        <PlayGround problem={problem} setSuccess={setSuccess} setSolved={setSolved} />
      </div>
    </Split>
  );
};

export default Workspace;
