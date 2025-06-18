import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "http://localhost:8080/api/materials";

const materialService = {
  ...createCrudService(BASE_URL),
};

export default materialService;
