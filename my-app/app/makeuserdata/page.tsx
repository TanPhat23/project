"use client";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase/firebase";
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
  const { push } = useRouter();
  const handleSubmit = async () => {
    const firebaseClerkToken = await getToken({
      template: "integration_firebase",
    });

    if (user) {
      await setDoc(doc(firestore, "users", user?.id.toString()), userData);
    }
  };
  useEffect(() => {
    handleSubmit();
    setTimeout(() => {
      push("/");
    }, 5000);
  }, [push]);

  return <div>hello</div>;
}
