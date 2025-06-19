import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "http://localhost:8080/api/tasks";

const taskService = {
  ...createCrudService(BASE_URL),
};

export default taskService;
