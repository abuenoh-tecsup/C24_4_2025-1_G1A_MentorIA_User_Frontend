import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "/courses";

const courseService = {
  ...createCrudService(BASE_URL),
};

export default courseService;
