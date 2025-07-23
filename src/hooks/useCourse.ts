import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { courseService } from "@service";
import type { Course, ParamsType } from "@types";

export const useCourse = (params: ParamsType, ) => {
  //id?:number

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["courses", params],
    queryFn: async () => courseService.getCourses(params),
  });

  const useCourseCreate = () => {
    return useMutation({
      mutationFn: async (data: Course) => courseService.createCourse(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
    });
  };
  const useCourseUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, ...rest }: Course) =>
        courseService.updateCourse(id!, rest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
    });
  };
  const useCourseDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => courseService.deleteCourse(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
      },
    });
  };

  return {
    data,
    useCourseCreate,
    useCourseUpdate,
    useCourseDelete,
  };
};
