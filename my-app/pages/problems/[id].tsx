
import Navbar from "@/components/Navbar";
import Workspace from "@/components/Workspace";
import { problems } from "@/lib/problems";
import { Problem } from "@/lib/problems/types";
import React from "react";

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {

  return (
    <div>
      <Navbar/>
      <Workspace problem={problem} />
    </div>
  );
};
export default ProblemPage;

export async function getStaticPaths() {
  const paths = Object.keys(problems).map((key) => ({
    params: { id: key },
  }));

  return {
    paths,
    fallback: false,
  };
}


export async function getStaticProps({ params }: { params: { id: string } }) {
  const { id } = params;
  const problem = problems[id];

  if (!problem) {
    return {
      notFound: true,
    };
  }
  problem.handlerFunction = problem.handlerFunction.toString();
  return {
    props: {
      problem,
    },
  };
}
