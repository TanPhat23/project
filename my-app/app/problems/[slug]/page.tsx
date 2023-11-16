import Navbar from "@/components/Navbar";
import Workspace from "@/components/problemComponents/Workspace";

import { problems } from "@/lib/problems";
import { notFound } from "next/navigation";
import { firestore } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

// export async function generateStaticParams() {
//   const problems = await getDocs(collection(firestore, "problems"));
//   return problems.docs.map((d) => ({ slug: d.data()["id"] }));
// }

export default async function ProblemPage({
  params,
}: {
  params: { slug: string };
}) {
  const problem = problems[params.slug];
  if (!problem) return notFound;
  return (
    <div>
      <div className="bg-dark-layer-1 text-white ">
        <Navbar />
      </div>
      <Workspace params={params} />
    </div>
  );
}
