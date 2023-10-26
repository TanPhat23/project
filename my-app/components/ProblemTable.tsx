"use client";
import Link from "next/link";
// import { problems } from "./problems";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "@/app/firebase/firebase";

type ProblemsTableProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};
const ProblemsTable: React.FC<ProblemsTableProps> = ({
  setLoadingProblems,
}) => {
  const problems = useGetProblems(setLoadingProblems);
  return (
    <tbody className="w-full">
      {problems.map((problem, idx) => {
        const difficultyColor =
          problem.difficulty === "Easy"
            ? "text-green-500"
            : "Medium"
            ? "text-yellow-500"
            : "Hard"
            ? "text-pink-500"
            : "";
        return (
          <tr
            className={`${idx % 2 == 1 ? "" : "bg-gray-800 text-white"}`}
            key={problem.id}
          >
            <th className="px-2 py-4 font-medium whitespace-nowrap text-green-500">
              <CheckCircle fontSize={18} width={18} />
            </th>
            <td
              className={`px-6 py-4 ${
                idx % 2 == 1 ? "hover:text-gray-400" : "hover:text-gray-600"
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
          </tr>
        );
      })}
    </tbody>
  );
};
export default ProblemsTable;

function useGetProblems(
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const getProblems = async () => {
      // fetching data logic
      setLoadingProblems(true);
      const q = query(
        collection(firestore, "problems"),
        orderBy("order", "asc")
      );
      const querySnapshot = await getDocs(q);
      const tmp = [];
      querySnapshot.forEach((doc) => {
        tmp.push({ id: doc.id, ...doc.data() });
      });
      setProblems(tmp);
      setLoadingProblems(false);
    };

    getProblems();
  }, [setLoadingProblems]);
  return problems;
}
