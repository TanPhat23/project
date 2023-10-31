import Navbar from "@/components/Navbar";
import Workspace from "@/components/problemComponents/Workspace";
import { problems } from "@/lib/problems";
import { notFound } from "next/navigation";
export const dynamicParams = true;
export const dynamic = "force-dynamic";
export async function generateStaticParams() {3 
  const paths = Object.keys(problems).map((key) => ({
    params: { id: key },
  }));
  return paths;
}

export default async function ProblemPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const problem = problems[id];

  if (!problem) return notFound();
  return (
    <div>
      <Navbar />
      <Workspace params={params} />
    </div>
  );
}
