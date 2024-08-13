import { api } from "@/lib/api";

export const load = (sort: boolean, keyword: string, limit: any) =>
  api.get("api/phonebooks", {
    params: {
      sort: sort ? (sort === true ? "desc" : "asc") : "asc",
      keyword,
      limit,
    },
  });

export const add = (name: string, phone: string) =>
  api.post("api/phonebooks", {
    name,
    phone,
  });

export const remove = (id: number) => api.delete(`api/phonebooks/${id}`);

export const update = (id: number, name: string, phone: string) =>
  api.put(`api/phonebooks/${id}`, {
    name,
    phone,
  });

export const updateAvatar = (id: number, formData: any) =>
  api.put(`api/phonebooks/${id}/avatar`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
