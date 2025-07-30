import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "@service";
import { type Teacher, type ParamsType } from "@types";
import axios from "axios";
import { message } from "antd";

export const useTeacher = (params: ParamsType, groupId?: number) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["teachers", params],
    queryFn: async () => teacherService.getTeachers(params),
  });

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
      mutationFn: async ({ id, ...rest }: Teacher) =>
        teacherService.updateTeacher(id, rest),
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

  const useAddTeacherToGroup = () => {
    return useMutation({
      mutationFn: async (teacherId: number) =>
        axios.post(`/group-teachers`, {
          group_id: groupId,
          teacher_id: teacherId,
        }),
      onSuccess: () => {
        message.success("Teacher added to group");
        queryClient.invalidateQueries({ queryKey: ["group", groupId] });
      },
      onError: () => {
        message.error("Failed to add teacher to group");
      },
    });
  };

  return {
    data,
    useTeacherCreate,
    useTeacherUpdate,
    useTeacherDelete,
    useAddTeacherToGroup, 
  };
};
