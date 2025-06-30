import axiosInstance from "./axiosInstance";

export function createCrudService(baseUrl) {
  return {
    getAll: async () => {
      const response = await axiosInstance.get(baseUrl);
      return response.data;
    },

    create: async (data) => {
      try {
        const response = await axiosInstance.post(baseUrl, data);
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || "Error al crear";
        throw new Error(message);
      }
    },

    show: async (id) => {
      try {
        const response = await axiosInstance.get(`${baseUrl}/${id}`);
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || "Error al obtener";
        throw new Error(message);
      }
    },

    update: async (id, data) => {
      try {
        const response = await axiosInstance.put(`${baseUrl}/${id}`, data);
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || "Error al actualizar";
        throw new Error(message);
      }
    },

    remove: async (id) => {
      try {
        const response = await axiosInstance.delete(`${baseUrl}/${id}`);
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || "Error al eliminar";
        throw new Error(message);
      }
    },
  };
}