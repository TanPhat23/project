"use client";
import { useEffect, useState } from "react"; // Import useEffect and useState
import { useAuth, useUser } from "@clerk/nextjs";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";

export default function AddData() {
  const { user } = useUser();
  const auth = getAuth();
  const userData = {
    uid: user?.id.toString(),
    email: user?.emailAddresses.toString(),
    displayName: user?.username?.toString(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    likedProblems: [],
    dislikedProblems: [],
    solvedProblems: [],
    starredProblems: [],
  };
  const { getToken } = useAuth();
  const [submit, setSumit] = useState(false);

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    const firebaseClerkToken = await getToken({
      template: "integration_firebase",
    });
    const userCredentials = await signInWithCustomToken(
      auth,
      firebaseClerkToken
    );
    console.log("user ::", userCredentials.user);
    if (user) {
      await setDoc(doc(firestore, "users", user?.id.toString()), userData);
      setSumit(true);
    }
    if (submit) router.push("/");
  };
  const router = useRouter();
  return <div></div>;
}
