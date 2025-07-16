import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import { type Group, type ParamsType } from "@types";

export const groupService = {
  async getGroups(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.GROUPS, params);
    return res;
  },

  async getGroupStudents(params: ParamsType, id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUPS}/${id}`, params);
    return res;
  },

  async createGroup(model: Group): Promise<any> {
    const res = await apiConfig().postRequest(ApiUrls.GROUPS, model);
    return res;
  },

  async updateGroup(id: number, model: Omit<Group, "id">): Promise<any> {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.GROUPS}/${id}`,
      model
    );
    return res;
  },

  async deleteGroup(id: number): Promise<any> {
    const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${id}`);
    return res;
  },
};
