import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "@service";
import { type Teacher, type ParamsType } from "@types";

export const useTeacher = (params?: ParamsType) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["teachers", params],
    queryFn: () => teacherService.getTeachers(params!),
  });

  const useTeacherCreate = () =>
    useMutation({
      mutationFn: (data: Teacher) => teacherService.createTeacher(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });

  const useTeacherUpdate = () =>
    useMutation({
      mutationFn: ({ id, ...rest }: Teacher) =>
        teacherService.updateTeacher(id, rest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });

  const useTeacherDelete = () =>
    useMutation({
      mutationFn: (id: number) => teacherService.deleteTeacher(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });

  const useTeacherUploadImage = () =>
    useMutation({
      mutationFn: ({ data, id }: { data: FormData; id: number }) =>
        teacherService.setImage(data, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });

  return {
    data,
    useTeacherCreate,
    useTeacherUpdate,
    useTeacherDelete,
    useTeacherUploadImage,
  };
};
