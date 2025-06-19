import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "http://localhost:8080/api/forums";

const forumService = {
  ...createCrudService(BASE_URL),
};

export default forumService;
