import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import { type Branch, type ParamsType } from "@types";

export const branchService = {
  async getBranches(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.BRANCH, params);
    return res;
  },

  async getBrancheStudents(params: ParamsType, id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.BRANCH}/${id}`, params);
    return res;
  },

  async createBranches(model: Branch): Promise<any> {
    const res = await apiConfig().postRequest(ApiUrls.BRANCH, model);
    return res;
  },

  async updateBranches(id: number, model: Omit<Branch, "id">): Promise<any> {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.BRANCH}/${id}`,
      model
    );
    return res;
  },

  async deleteBranches(id: number): Promise<any> {
    const res = await apiConfig().deleteRequest(`${ApiUrls.BRANCH}/${id}`);
    return res;
  },
};
