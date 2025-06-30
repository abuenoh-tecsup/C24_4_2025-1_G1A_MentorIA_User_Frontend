import { createCrudService } from "../utils/createCrudService";
import axiosInstance from "./axiosInstance";

const BASE_URL = "/enrollments";

const enrollmentService = {
  ...createCrudService(BASE_URL),

  getEnrollmentsByCourseId: async (courseId) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/course/${courseId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener inscripciones del curso");
    }
  },

  getStudentsByCourseId: async (courseId) => {
    const enrollments = await enrollmentService.getEnrollmentsByCourseId(courseId);

    return enrollments.map((enrollment) => {
      const user = enrollment.student.user;
      return {
        enrollmentId: enrollment.id,
        userId: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        username: user.username,
        email: user.email,
        status: enrollment.status,
      };
    });
  },
};

export default enrollmentService;