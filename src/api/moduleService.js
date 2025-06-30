import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "/modules";

const moduleService = {
  ...createCrudService(BASE_URL),
};

export default moduleService;
