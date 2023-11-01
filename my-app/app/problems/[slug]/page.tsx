import Navbar from "@/components/Navbar";
import Workspace from "@/components/problemComponents/Workspace";
import { firestore } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";
export const dynamicParams = false;

export async function generateStaticParams() {
  const problems = await getDocs(collection(firestore, "problems"));
  return problems.docs.map((d) => ({ slug: d.data()["id"] }));
}

export default async function ProblemPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <Navbar />
      <Workspace params={params} />
    </div>
  );
}
