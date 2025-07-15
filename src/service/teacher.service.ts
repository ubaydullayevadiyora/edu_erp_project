import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";

export const teacherService = {
  async getTeachers() {
    const res = await apiConfig().getRequest(ApiUrls.TEACHER);
    return res;
  },

  async createTeacher(model: Omit<Teacher, "id">): Promise<any> {
    const res = await apiConfig().postRequest(ApiUrls.TEACHER, model);
    return res;
  },

  async updateTeacher(id: number, model: Omit<Teacher, "id">): Promise<any> {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.TEACHER}/${id}`,
      model
    );
    return res;
  },

  async deleteTeacher(id: number): Promise<any> {
    const res = await apiConfig().deleteRequest(`${ApiUrls.TEACHER}/${id}`);
    return res;
  },
};
