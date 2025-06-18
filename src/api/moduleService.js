import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "http://localhost:8080/api/modules";

const moduleService = {
  ...createCrudService(BASE_URL),
};

export default moduleService;
