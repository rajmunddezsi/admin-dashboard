export function parsePage(page?: string): { currentPage: number; isValid: boolean } {
  const parsedPage = Number(page);

  const isValid =
    Number.isFinite(parsedPage) &&
    Number.isInteger(parsedPage) &&
    parsedPage >= 1;

  return {
    currentPage: isValid ? parsedPage : 1,
    isValid: isValid,
  };
}

export function calculateSkip(currentPage: number, pageSize: number): number {
    return (currentPage - 1) * pageSize;
}

export function calculateTotalPages(total: number, pageSize: number): number {
    return Math.ceil(total / pageSize)
}