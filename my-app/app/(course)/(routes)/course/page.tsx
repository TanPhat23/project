"use client";
import ProblemsTable from "@/components/problemComponents/ProblemTable";
import SearchBar from "@/components/problemComponents/SearchBar";

import { useState } from "react";

export default function Problem() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <main className="ml-72 flex flex-col">
      {loadingProblems && (
        <div className="ml-72 flex w-full flex-col justify-center h-full animate-pulse">
          {[...Array(10)].map((_, idx) => (
            <LoadingSkeleton key={idx} />
          ))}
        </div>
      )}
      <div className="flex flex-col">
        {!loadingProblems && (
        <div className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] ml-72 mt-5">
          <SearchBar onSearch={handleSearch} />
        </div>)}
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] ml-72">
          {!loadingProblems && (
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b ">
              <tr>
                <th scope="col" className="px-1 py-3 w-0 font-medium">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Difficulty
                </th>

                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Video
                </th>
              </tr>
            </thead>
          )}
          <ProblemsTable
            setLoadingProblems={setLoadingProblems}
            searchQuery={searchQuery}
          />
        </table>
      </div>
    </main>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
