import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "/materials";

const materialService = {
  ...createCrudService(BASE_URL),
};

export default materialService;
