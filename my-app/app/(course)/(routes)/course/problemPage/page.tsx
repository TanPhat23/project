import Link from "next/link";
import { problems } from "./problems";
import { CheckCircle } from "lucide-react";
type ProblemsTableProps = {};
const Problem: React.FC<ProblemsTableProps> = () => {
  return (
    <div className="pt-16 ">
      <table className="overflow-hidden ml-72 w-full">
        <tbody>
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
                  <Link
                    href={`/course/problemPage/[id]`}
                    as={`/course/problemPage/${problem.id}`}
                  >
                    {problem.title}
                  </Link>
                </td>
                <td className={`px-6 py-4 ${difficultyColor}`}>
                  {problem.difficulty}
                </td>
                <td className={`px-6 py-4`}>{problem.category}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Problem;
