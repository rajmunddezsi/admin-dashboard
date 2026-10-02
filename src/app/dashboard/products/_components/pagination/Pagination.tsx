"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const navigateToPage = (page: number) => {
    const nextParams = new URLSearchParams(params);
    if (page === 1) {
      nextParams.delete("page");
    } else {
      nextParams.set("page", page.toString());
    }

    const queryString = nextParams.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handlePrevClick = () => {
    if (currentPage <= 1) {
      return;
    }

    navigateToPage(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage >= totalPages) {
      return;
    }

    navigateToPage(currentPage + 1);
  };

  return (
    <div>
      <button disabled={currentPage <= 1} onClick={handlePrevClick}>
        Previous
      </button>
      {currentPage} of {totalPages}
      <button disabled={currentPage >= totalPages} onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
}
