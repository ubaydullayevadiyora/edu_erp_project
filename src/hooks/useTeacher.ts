import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "@service";
import { type Teacher, type ParamsType } from "@types";

export const useTeacher = (params: ParamsType) => {

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["teachers", params],
    queryFn: async () => teacherService.getTeachers(params),
  });
  
//   const teacherStudentsQuery = useQuery({
//     queryKey: ["teacher-students", params],
//     queryFn: async () => teacherService.getTeacherStudents(params, id!),
//   });
//   const students = teacherStudentsQuery.data;

  // Mutations
  const useTeacherCreate = () => {
    return useMutation({
      mutationFn: async (data: Teacher) => teacherService.createTeacher(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });
  };
  const useTeacherUpdate = () => {
    return useMutation({
      mutationFn: async ({id, ...rest}:Teacher) => teacherService.updateTeacher(id, rest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });
  };
  const useTeacherDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => teacherService.deleteTeacher(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });
  };


  return {
    data,
    useTeacherCreate,
    useTeacherUpdate,
    useTeacherDelete,
  };
};
