"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function Pagination({ currentPage }: { currentPage: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex justify-center mt-8 space-x-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 disabled:bg-gray-400"
      >
        Previous
      </button>
      <span>{currentPage}</span>
      <button onClick={() => handlePageChange(currentPage + 1)} className="px-4 py-2 bg-gray-200">
        Next
      </button>
    </div>
  );
}
