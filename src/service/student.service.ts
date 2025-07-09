import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";
import type { Student } from "../types/student";

export const studentService = {
  async getStudents() {
    const res = await apiConfig().getRequest(ApiUrls.STUDENT);
    return res;
  },

  async createStudent(model: Omit<Student, "id">): Promise<any> {
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
