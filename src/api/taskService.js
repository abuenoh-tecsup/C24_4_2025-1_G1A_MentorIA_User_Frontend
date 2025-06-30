import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "/tasks";

const taskService = {
  ...createCrudService(BASE_URL),
};

export default taskService;
