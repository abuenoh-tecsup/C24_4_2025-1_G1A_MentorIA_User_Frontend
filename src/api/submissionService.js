import axios from "axios";
import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "http://localhost:8080/api/submissions";

const submissionService = {
  ...createCrudService(BASE_URL),

  getByTask: async (taskId) => {
    try {
      const response = await axios.get(`${BASE_URL}/task/${taskId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Error al obtener entregas por tarea";
      throw new Error(message);
    }
  },

  getByUser: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Error al obtener entregas por usuario";
      throw new Error(message);
    }
  }
};

export default submissionService;
