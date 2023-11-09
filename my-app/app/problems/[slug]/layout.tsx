import { firestore } from "@/lib/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
export const dynamicParams = true;

export async function generateStaticParams() {
  const problems = await getDocs(collection(firestore, "problems"));
  return problems.docs.map((d) => ({ slug: d.data()["id"] }));
}

const PageLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
