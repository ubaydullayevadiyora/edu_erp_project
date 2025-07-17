import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { branchService } from "@service";
import { type Branch, type ParamsType } from "@types";

export const useBranch = (params: ParamsType) => {

  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["branches", params],
    queryFn: async () => branchService.getBranches(params),
  });

  // Mutations
  const useBranchCreate = () => {
    return useMutation({
      mutationFn: async (data: Branch) => branchService.createBranches(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branches"] });
      },
    });
  };
  const useBranchUpdate = () => {
    return useMutation({
      mutationFn: async ({id, ...rest}:Branch) => branchService.updateBranches(id, rest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branches"] });
      },
    });
  };
  const useBranchDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => branchService.deleteBranches(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branches"] });
      },
    });
  };


  return {
    data,
    useBranchCreate,
    useBranchUpdate,
    useBranchDelete,
  };
};
