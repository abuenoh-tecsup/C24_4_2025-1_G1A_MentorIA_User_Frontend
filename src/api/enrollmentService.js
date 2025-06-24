import { createCrudService } from "../utils/createCrudService";

const BASE_URL = "http://localhost:8080/api/enrollments";

const enrollmentService = {
  ...createCrudService(BASE_URL),

  getEnrollmentsByCourseId: async (courseId) => {
    const response = await fetch(`${BASE_URL}/course/${courseId}`);
    if (!response.ok) {
      throw new Error("Error al obtener inscripciones del curso");
    }
    return await response.json();
  },

  getStudentsByCourseId: async (courseId) => {
    const enrollments = await enrollmentService.getEnrollmentsByCourseId(
      courseId
    );

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
