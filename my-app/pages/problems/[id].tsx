"use client";
import { Problem } from "@/lib/problems/types";
import { problems } from "@/lib/problems";
import Workspace from "@/components/Workspace";
import Navbar from "@/components/Navbar";

type ProblemPageProps = {
  problem: Problem;
};

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
  const {id} = params
  const problem = problems[id];
    problem.handlerFunction = problem.handlerFunction.toString()
  return {
    props: {
      problem,
    },
  };
}
const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
  console.log(problem);

  return (
    <div className="">
      <Navbar />
      <Workspace problem={problem} />
    </div>
  );
};

export default ProblemPage;
