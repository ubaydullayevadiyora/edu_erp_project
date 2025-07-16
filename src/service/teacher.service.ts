import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import { type Teacher, type ParamsType } from "@types";

export const teacherService = {
  async getTeachers(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.TEACHER, params);
    return res;
  },

  async getTeacherStudents(params: ParamsType, id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.TEACHER}/${id}`, params);
    return res;
  },

  async createTeacher(model: Teacher): Promise<any> {
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
