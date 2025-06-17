import courseService from "../api/courseService";
import { useEffect, useState } from "react";

function HomePage() {
  const [courses, seetCourses] = useState([]);

  const fetchCourses = async () => {
    const data = await courseService.getAll();
    seetCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
      <h2>Cursos</h2>
      {courses.length === 0 ? (
        <p>No hay cursos disponibles.</p>
      ) : (
        <ul className="list-group">
          {courses.map((course) => (
            <li key={course.id} className="list-group-item">
              ID: {course.id} - Materia: {course.subject?.name || "Sin nombre"}{" "}
              - Profesor: {course.professor?.username || "Sin nombre"}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default HomePage;
