import axiosInstance from ".";
import { Notification } from "@helpers";

export function apiConfig() {
  async function getRequest(url: string, params: object = {}) {
    try {
      const res = await axiosInstance.get(url, { params });
      return res;
    } catch (err:any) {
      console.log(err)
      Notification("error", err?.message);
    }
  }

  async function postRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.post(url, body);
      Notification("success", res.data.message);
      return res;
    } catch (err: any) {
      console.log(err)
      Notification("error", err?.message);
    }
  }

  async function patchRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.patch(url, body);
      Notification("success", res.data.message);
      return res;
    } catch (err: any) {
      console.log(err);
      Notification("error", err?.message);
    }
  }

  async function deleteRequest(url: string, params:object = {}) {
    try {
      const res = await axiosInstance.delete(url, { params });
      Notification("success", res.data.message);
      return res;
    } catch (err: any) {
      console.log(err);
      Notification("error", err?.message);
    }
  }

  return {
    getRequest,
    postRequest,
    patchRequest,
    deleteRequest,
  };
}
