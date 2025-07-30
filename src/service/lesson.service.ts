import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { ParamsType } from "@types";

export const lessonsService = {
  async getLessons(params: ParamsType | {}) {
    const res = await apiConfig().getRequest(ApiUrls.LESSONS, params);
    return res;
  },
  async getLessonsById(id: Number) {
    const res = await apiConfig().getRequest(
      `${ApiUrls.LESSONS}/${id ? id : 0}`
    );
    return res;
  },

  async deleteLessons(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.LESSONS}/${id}`);
    return res;
  },
  async updateLessons(id: number, body: object) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.LESSONS}/${id}`,
      body
    );
    return res;
  },
  async updateLessonsStatusAndNotes(id: number, body: object) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.UPDATE_LESSONS_STATUS_AND_NOTES(id)}`,
      body
    );
    return res;
  },
  async createLessons(body: object) {
    const res = await apiConfig().postRequest(`${ApiUrls.LESSONS}`, body);
    return res;
  },
};
