"use client";
import Link from "next/link";
import { CheckCircle, XIcon, YoutubeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { DBProblem } from "@/lib/problems/types";
import { useUser } from "@clerk/nextjs";
import { firestore } from "@/lib/firebase/firebase";
import YouTube from "react-youtube";

type ProblemsTableProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
};
const ProblemsTable: React.FC<ProblemsTableProps> = ({
  setLoadingProblems,
  searchQuery,
}) => {
  const problems = useGetProblems(setLoadingProblems);
  const [youtubePlayer, setYoutubePlayer] = useState({
    isOpen: false,
    videoId: "",
  });
  const closeModal = () => {
    setYoutubePlayer({ isOpen: false, videoId: "" });
  };
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  const solvedProblems = useGetSolvedProblems();
  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <tbody className="w-full ">
        {filteredProblems.map((problem, idx) => {
          const difficultyColor =
            problem.difficulty === "Easy"
              ? "text-green-500"
              : problem.difficulty === "Medium"
              ? "text-yellow-500"
              : problem.difficulty === "Hard"
              ? "text-pink-500"
              : "";

          return (
            <tr
              className={`${idx % 2 === 1 ? "" : "bg-gray-800 text-white"}`}
              key={problem.id}
            >
              <th className="px-2 py-4 font-medium whitespace-nowrap text-green-500">
                {solvedProblems.includes(problem.id) && (
                  <CheckCircle fontSize={18} width={18} />
                )}
              </th>
              <td
                className={`px-6 py-4 ${
                  idx % 2 === 1 ? "hover:text-gray-400" : "hover:text-gray-600"
                }`}
              >
                {problem.link ? (
                  <Link href={problem.link} target="_blank">
                    {problem.title}
                  </Link>
                ) : (
                  <Link href={`problems/[id]`} as={`problems/${problem.id}`}>
                    {problem.title}
                  </Link>
                )}
              </td>
              <td className={`px-6 py-4 ${difficultyColor}`}>
                {problem.difficulty}
              </td>
              <td className={`px-6 py-4`}>{problem.category}</td>
              <td className={`px-6 py-4`}>
                {problem.videoId ? (
                  <YoutubeIcon className="hover:text-red-500 cursor-pointer"
                    onClick={() => {
                      setYoutubePlayer({
                        isOpen: true,
                        videoId: problem.videoId as string,
                      });
                    }}
                  ></YoutubeIcon>
                ) : (
                  <p></p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
      {youtubePlayer.isOpen && (
        <tfoot className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
          <div
            className="bg-black z-10 opacity-70 top-0 left-0 w-screen h-screen absolute"
            onClick={closeModal}
          ></div>
          <div className="w-full z-50 h-full px-6 relative max-w-4xl">
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="w-full relative">
                <XIcon
                  fontSize={"35"}
                  className="cursor-pointer absolute -top-16 right-0"
                  onClick={closeModal}
                />
                <YouTube
                  videoId={youtubePlayer.videoId}
                  loading="lazy"
                  iframeClassName="w-full min-h-[500px]"
                />
              </div>
            </div>
          </div>
        </tfoot>
      )}
    </>
  );
};
export default ProblemsTable;

function useGetProblems(
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [problems, setProblems] = useState<DBProblem[]>([]);

  useEffect(() => {
    const getProblems = async () => {
      // fetching data logic
      setLoadingProblems(true);
      const q = query(
        collection(firestore, "problems"),
        orderBy("order", "asc")
      );
      const querySnapshot = await getDocs(q);
      const tmp: DBProblem[] = [];
      querySnapshot.forEach((doc) => {
        tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
      });
      setProblems(tmp);
      setLoadingProblems(false);
    };

    getProblems();
  }, [setLoadingProblems]);
  return problems;
}
function useGetSolvedProblems() {
  const { user } = useUser();
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
  useEffect(() => {
    const getSolvedProblems = async () => {
      const userRef = doc(firestore, "users", user!.id);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setSolvedProblems(userDoc.data().solvedProblems);
      }
    };
    if (user) getSolvedProblems();
    if (!user) setSolvedProblems([]);
  }, [user]);
  return solvedProblems;
}
