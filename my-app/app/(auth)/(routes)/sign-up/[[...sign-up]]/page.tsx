import { firestore } from "@/app/firebase/firebase";
import { SignUp, auth, useUser } from "@clerk/nextjs";

export default function Page() {
  
  return <SignUp afterSignUpUrl='/makeuserdata'/>
}
