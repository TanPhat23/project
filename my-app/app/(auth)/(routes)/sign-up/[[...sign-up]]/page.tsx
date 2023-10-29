import { firestore } from "@/app/firebase/firebase";
import { SignUp, auth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const { user } = auth();
  const router = useRouter();
  if (user) {
    router.push("/");
  }
  return <SignUp afterSignUpUrl="/makeuserdata" />;
}
