import courseService from "../api/courseService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const data = await courseService.getAll();
    setCourses(data);
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
              <Link to={`/courses/${course.id}`}>
                ID: {course.id} - Materia: {course.subject?.name || "Sin nombre"}{" "}
              - Profesor: {course.professor?.username || "Sin nombre"}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default HomePage;
