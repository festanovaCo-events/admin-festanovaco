import { useState, useEffect, useMemo } from "react";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  resetDependencies?: unknown[];
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
  resetDependencies = [],
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Resetear a página 1 cuando cambian las dependencias
  useEffect(() => {
    setCurrentPage(1);
  }, resetDependencies);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    handlePageChange,
  };
};

