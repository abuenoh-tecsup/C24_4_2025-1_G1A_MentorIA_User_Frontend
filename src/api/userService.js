import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "http://localhost:8080/api/users";

const userService = {
  ...createCrudService(BASE_URL),
};

export default userService;
