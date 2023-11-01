"use client";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import PlayGround from "./PlayGround";
import { useState } from "react";
import { Problem } from "@/lib/problems/types";

type WorkspaceProps = {
  problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  const [success, setSuccess] = useState(false);
  const [solved, setSolved] = useState(false);
  return (
    <Split className="split h-full">
      <ProblemDescription problem={problem} _solved={solved} />
      <div>
        <PlayGround
          problem={problem}
          setSuccess={setSuccess}
          setSolved={setSolved}
        />
      </div>
    </Split>
  );
};

export default Workspace;
