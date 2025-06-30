import { createCrudService } from "../utils/createCrudService";
import axiosInstance from "../utils/axiosInstance";

const BASE_URL = "/comments";

const commentService = {
  ...createCrudService(BASE_URL),

  getByForumId: async (forumId) => {
    const response = await axiosInstance.get(`${BASE_URL}/forum/${forumId}`);
    return response.data;
  },
  
};

export default commentService;
