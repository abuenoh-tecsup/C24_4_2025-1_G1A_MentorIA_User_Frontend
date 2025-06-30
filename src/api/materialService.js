import { createCrudService } from "../utils/createCrudService";
import axiosInstance from "../utils/axiosInstance";

const BASE_URL = "/materials";

const materialService = {
  ...createCrudService(BASE_URL),

  create: async (data) => {
    try {
      const response = await axiosInstance.post(BASE_URL, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Error al crear material";
      throw new Error(message);
    }
  },
};

export default materialService;
