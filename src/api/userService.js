import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "/users";

const userService = {
  ...createCrudService(BASE_URL),
};

export default userService;
