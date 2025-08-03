import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import { type Group, type ParamsType } from "@types";

export const groupService = {
  async getGroups(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.GROUPS, params);
    return res;
  },

  async getGroupStudents(id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.GROUP_STUDENTS_BY_GROUP_ID}/${id}`
    );
    return res;
  },

  async getGroupLessons(id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.GROUP_LESSONS}/${id}`);
    return res;
  },

  async getGroupTeachers(id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.GROUP_TEACHERS_BY_GROUP_ID}/${id}`
    );
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

  // async searchGroup(search: string) {
  //   const res = await axios.get(`/groups?search=${search}`);
  //   return res.data;
  // },

  async addStudentToGroup(data: any) {
    const res = await apiConfig().postRequest(
      `${ApiUrls.GROUP_STUDENTS}`,
      data
    );
    return res;
  },
  async addTeacherToGroup(data: any) {
    const res = await apiConfig().postRequest(
      `${ApiUrls.GROUP_TEACHERS}`,
      data
    );
    return res;
  },
};
