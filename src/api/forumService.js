import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "/forums";

const forumService = {
  ...createCrudService(BASE_URL),
};

export default forumService;
