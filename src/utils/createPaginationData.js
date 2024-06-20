







export const createPaginationData = (count, perPage, page) => {
  const totalItems = count;
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage,
    hasNextPage,
  };
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseInt(page) || 1;
  const parsedPerPage = parseInt(perPage) || 10;

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};

























/*export const createPaginationData = (count, perPage, page) => {
    const totalPage = Math.ceil(count / perPage);
    const hasNextPage = Boolean(totalPage - page);
    const hasPreviousPage = page !== 1;
  
    return {
      page,
      perPage,
      totalItems: count,
      totalPage,
      hasNextPage,
      hasPreviousPage,
    };
  };*/