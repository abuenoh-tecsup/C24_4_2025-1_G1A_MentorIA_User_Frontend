import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "http://localhost:8080/api/courses";

const courseService = {
  ...createCrudService(BASE_URL),
};

export default courseService;
