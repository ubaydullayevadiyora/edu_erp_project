import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import { type Rooms, type ParamsType } from "@types";

export const roomService = {
  async getRooms(params: ParamsType) {
    const res = await apiConfig().getRequest(ApiUrls.ROOM, params);
    return res;
  },

//   async getRoomStudents(params: ParamsType, id: number) {
//     const res = await apiConfig().getRequest(`${ApiUrls.ROOM}/${id}`, params);
//     return res;
//   },

  async createRoom(model: Rooms): Promise<any> {
    const res = await apiConfig().postRequest(ApiUrls.ROOM, model);
    return res;
  },

  async updateRoom(id: number, model: Omit<Rooms, "id">): Promise<any> {
    const res = await apiConfig().patchRequest(`${ApiUrls.ROOM}/${id}`, model);
    return res;
  },

  async deleteRoom(id: number): Promise<any> {
    const res = await apiConfig().deleteRequest(`${ApiUrls.ROOM}/${id}`);
    return res;
  },
};
