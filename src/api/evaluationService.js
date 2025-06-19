import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "http://localhost:8080/api/evaluations";

const evaluationService = {
  ...createCrudService(BASE_URL),
};

export default evaluationService;
