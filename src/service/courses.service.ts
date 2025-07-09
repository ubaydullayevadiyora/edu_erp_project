import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";
import type { Course } from "../types";

export const courseService = {
  async getCourses() {
    const res = await apiConfig().getRequest(ApiUrls.COURSES);
    return res;
  },

  async createCourse(
    model: Omit<Course, "id" | "created_at" | "updated_at">
  ): Promise<any> {
    const res = await apiConfig().postRequest(ApiUrls.COURSES, model);
    return res;
  },

  async updateCourse(
    id: number,
    model: Omit<Course, "id" | "created_at" | "updated_at">
  ): Promise<any> {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.COURSES}/${id}`,
      model
    );
    return res;
  },

  async deleteCourse(id: number): Promise<any> {
    const res = await apiConfig().deleteRequest(`${ApiUrls.COURSES}/${id}`);
    return res;
  },
};
