import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { groupService } from "@service";
import { type Group, type ParamsType } from "@types";

export const useGroup = (params: ParamsType, id?: number) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["groups", params],
    queryFn: async () => groupService.getGroups(params,),
  });

  // const searchGroupQuery = useQuery({
  //   enabled: !!params?.search,
  //   queryKey: ["search-group", params.search],
  //   queryFn: async () => groupService.searchGroup(params.search!),
  // });
  // const searchedGroups = searchGroupQuery.data;

  const groupStudentsQuery = useQuery({
    enabled: !!id,
    queryKey: ["group-students"],
    queryFn: async () => groupService.getGroupStudents(id!),
  });
  const students = groupStudentsQuery.data;

  const groupLessonsQuery = useQuery({
    enabled: !!id,
    queryKey: ["group-lessons"],
    queryFn: async () => groupService.getGroupLessons(id!),
  });
  const lessons = groupLessonsQuery.data;

  const groupTeachersQuery = useQuery({
    enabled: !!id,
    queryKey: ["group-teachers"],
    queryFn: async () => groupService.getGroupTeachers(id!),
  });
  const teachers = groupTeachersQuery.data;

  // Mutations
  const useGroupCreate = () => {
    return useMutation({
      mutationFn: async (data: Group) => groupService.createGroup(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };
  const useGroupUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, ...rest }: Group) =>
        groupService.updateGroup(id, rest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };
  const useGroupDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => groupService.deleteGroup(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupAddStudent = () => {
    return useMutation({
      mutationFn: async (data: any) => groupService.addStudentToGroup(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["group-student"] });
      },
    });
  };

  const useGroupAddTeacher = () => {
    return useMutation({
      mutationFn: async (data: any) => groupService.addTeacherToGroup(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups", "add-teacher"] });
      },
    });
   
  };

  return {
    data,
    students,
    lessons,
    teachers,
    // searchedGroups,
    useGroupCreate,
    useGroupUpdate,
    useGroupDelete,
    useGroupAddStudent,
    useGroupAddTeacher,
  };
};
