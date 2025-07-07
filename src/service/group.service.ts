import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import { type Group } from "@types";

export const groupService = {
  async getGroups() {
    const res = await apiConfig().getRequest(ApiUrls.GROUPS);
    return res;
  },

  async createGroup(model: Omit<Group, "id">): Promise<any> {
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

  async getCourses() {
    const res = await apiConfig().getRequest(ApiUrls.COURSES);
    return res;
  },
};
