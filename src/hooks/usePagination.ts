import { useState } from "react";

export const usePagination = (defaultPageSize = 6) => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const onChange = (page: number, newSize?: number) => {
    setCurrent(page);
    if (newSize) setPageSize(newSize);
  };

  return {
    current,
    pageSize,
    onChange,
    pagination: {
      current,
      pageSize,
      onChange,
    },
  };
};
