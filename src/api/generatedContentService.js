import { createCrudService } from "../utils/createCrudService";
import axiosInstance from "../utils/axiosInstance";

const BASE_URL = "/generated";

const generatedContentService = {
  ...createCrudService(BASE_URL),

  generate: async ({ userId, materialId, contentType, outputFormat }) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/generate`, {
        userId,
        materialId,
        contentType,
        outputFormat,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Error al generar contenido con IA";
      throw new Error(message);
    }
  },

  getByUser: async (userId) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener contenido por usuario");
    }
  },

  getByMaterial: async (materialId) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/material/${materialId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener contenido por material");
    }
  },
};

export default generatedContentService;
