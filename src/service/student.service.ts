import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import { type Student, type ParamsType } from "@types";

export const studentService = {
  async getStudents(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.STUDENT, params);
    return res;
  },

  async getStudentStudents(params: ParamsType, id: number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.STUDENT}/${id}`,
      params
    );
    return res;
  },

  async createStudent(model: Student): Promise<any> {
    const res = await apiConfig().postRequest(ApiUrls.STUDENT, model);
    return res;
  },

  async updateStudent(id: number, model: Omit<Student, "id">): Promise<any> {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.STUDENT}/${id}`,
      model
    );
    return res;
  },

  async deleteStudent(id: number): Promise<any> {
    const res = await apiConfig().deleteRequest(`${ApiUrls.STUDENT}/${id}`);
    return res;
  },
};
