import { useNavigate } from "react-router-dom";
import type { PaginationConfig } from "@types";

export const useGeneral = () => {
  const navigate = useNavigate();

  const handlePagination = ({ pagination, setParams }: PaginationConfig) => {
    const { current, pageSize } = pagination;

    setParams({
      page: current!,
      limit: pageSize!,
    });

    const searchParams = new URLSearchParams();
    searchParams.set("page", current!.toString());
    searchParams.set("limit", pageSize!.toString());
    navigate({ search: `?${searchParams.toString()}` });
  };

  return { handlePagination };
};
