import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ParamsType } from "@types";
import { lessonsService } from "@service";

export const useLessons = (params: ParamsType | {}) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["lessons", params],
    queryFn: async () => lessonsService.getLessons(params),
  });
  const useLessonCreate = () => {
    return useMutation({
      mutationFn: async (data: any) => lessonsService.createLessons(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["lessons"] });
      },
    });
  };
  const useLessonUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: any }) =>
        lessonsService.updateLessons(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["lessons"] });
      },
    });
  };
  const useLessonUpdateStatusAndNotes = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: any }) =>
        lessonsService.updateLessonsStatusAndNotes(id, data),
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({ queryKey: ["lessons", variables.id] });
      },
    });
  };
  const useLessonDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => lessonsService.deleteLessons(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["lessons"] });
      },
    });
  };

  return {
    useLessonCreate,
    data,
    useLessonUpdate,
    useLessonDelete,
    useLessonUpdateStatusAndNotes,
  };
};
