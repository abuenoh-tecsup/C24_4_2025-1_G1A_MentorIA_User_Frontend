import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "/evaluations";

const evaluationService = {
  ...createCrudService(BASE_URL),
};

export default evaluationService;
