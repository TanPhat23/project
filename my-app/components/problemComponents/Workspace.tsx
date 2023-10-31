"use client";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import PlayGround from "./PlayGround";
import { useState } from "react";
import { problems } from "@/lib/problems";

const Workspace = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const problem = problems[id];
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
