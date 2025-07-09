import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { groupService } from "../service";
import type { Group } from "../types";

export const useGroup = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["groups"],
    queryFn: async () => groupService.getGroups(),
  });

  const useGroupCreate = () => {
    return useMutation({
      mutationFn: async (data: Group) => groupService.createGroup(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupUpdate = () =>
    useMutation({
      mutationFn: async (data: Group) => {
        const { id, ...rest } = data;
        return groupService.updateGroup(id, rest);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });

  const useGroupDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => groupService.deleteGroup(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  return {
    data,
    useGroupCreate,
    useGroupUpdate,
    useGroupDelete,
  };
};
