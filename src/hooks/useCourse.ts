import { useQuery } from "@tanstack/react-query";
import { courseService } from "@service";
import type { ParamsType } from "@types";

export const useCourse = (params: ParamsType) => {
  const { data } = useQuery({
    queryKey: ["courses", params],
    queryFn: async () => courseService.getCourses(params),
  });

  return {
    data,
  };
};
