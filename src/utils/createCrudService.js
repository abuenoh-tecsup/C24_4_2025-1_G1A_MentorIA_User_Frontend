import axios from "axios";

export function createCrudService(baseUrl) {
  return {
    getAll: async () => {
      try {
        const response = await axios.get(baseUrl);
        return response.data;
      } catch (error) {
        console.error(`Error al obtener todos desde ${baseUrl}`, error);
        //throw error;
        return [];
      }
    },

    create: async (data) => {
      try {
        const response = await axios.post(baseUrl, data);
        return response.data;
      } catch (error) {
        console.error(`Error al crear en ${baseUrl}`, error);
        //throw error;
        return [];
      }
    },

    show: async (id) => {
      try {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
      } catch (error) {
        console.error(
          `Error al obtener el recurso ${id} desde ${baseUrl}`,
          error
        );
        //throw error;
        return [];
      }
    },

    update: async (id, data) => {
      try {
        const response = await axios.put(`${baseUrl}/${id}`, data);
        return response.data;
      } catch (error) {
        console.error(
          `Error al actualizar el recurso ${id} en ${baseUrl}`,
          error
        );
        //throw error;
        return [];
      }
    },

    remove: async (id) => {
      try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response.data;
      } catch (error) {
        console.error(
          `Error al eliminar el recurso ${id} desde ${baseUrl}`,
          error
        );
        //throw error;
        return [];
      }
    },
  };
}
