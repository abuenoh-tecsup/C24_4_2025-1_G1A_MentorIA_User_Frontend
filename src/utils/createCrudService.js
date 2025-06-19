import axios from "axios";

export function createCrudService(baseUrl) {
  return {
    getAll: async () => {
      const response = await axios.get(baseUrl);
      return response.data;
    },

    create: async (data) => {
      try {
        const response = await axios.post(baseUrl, data);
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || "Error al crear";
        throw new Error(message);
      }
    },

    show: async (id) => {
      try {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || "Error al obtener";
        throw new Error(message);
      }
    },

    update: async (id, data) => {
      try {
        const response = await axios.put(`${baseUrl}/${id}`, data);
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || "Error al actualizar";
        throw new Error(message);
      }
    },

    remove: async (id) => {
      try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || "Error al eliminar";
        throw new Error(message);
      }
    },
  };
}
