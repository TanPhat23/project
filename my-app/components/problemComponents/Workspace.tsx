"use client";
import Split from "react-split";
import ProblemDescription from "./ProblemDescription";
import PlayGround from "./PlayGround";
import { useState } from "react";
import { problems } from "@/lib/problems";

const Workspace = ({ params }: { params: { slug: string } }) => {
  const { slug} = params;
  const problem = problems[slug];

  const [solved, setSolved] = useState(false);
  return (
    <Split className="split h-full">
      <ProblemDescription problem={problem} _solved={solved} />
      <div>
        <PlayGround
          problem={problem}
          setSolved={setSolved}
        />
      </div>
    </Split>
  );
};

export default Workspace;
