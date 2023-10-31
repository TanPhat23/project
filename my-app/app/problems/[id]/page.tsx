import Navbar from "@/components/Navbar";
import Workspace from "@/components/Workspace";
import { problems } from "@/lib/problems";
import { Problem } from "@/lib/problems/types";
import { notFound } from "next/navigation";
export const dynamicParams = false;
export async function generateStaticParams() {
  const paths = Object.keys(problems).map((key) => ({
    params: { id: key },
  }));
  return paths;
}

type ProblemPageProps = {
  params: { id: string };
};
const ProblemPage: React.FC<ProblemPageProps> = ({ params }) => {
  const { id } = params;
  const problem = problems[id]; 

  if (!problem) return notFound();
  return (
    <div>
      <Navbar/>
      <Workspace params={params}/>
    </div>
  );
};
export default ProblemPage;
