import Navbar from "@/components/Navbar";
import Workspace from "@/components/problemComponents/Workspace";

import { problems } from "@/lib/problems";
import { notFound } from "next/navigation";


export default async function ProblemPage({
  params,
}: {
  params: { slug: string };
}) {
  const problem = problems[params.slug];
  if (!problem) return notFound;
  return (
    <div>
      <Navbar />
      <Workspace params={params} />
    </div>
  );
}
