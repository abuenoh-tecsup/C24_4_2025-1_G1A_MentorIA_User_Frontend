import Header from "../components/Header";
import SideBar from "../components/SideBar";
import courseService from "../api/courseService";
import { useEffect, useState } from "react";

function HomePage() {
  const [courses, seetCourses] = useState([]);

  const fetchCourses = async () => {
    const data = await courseService.getAll();
    seetCourses(data)
  }

  useEffect(() => {
    fetchCourses()
  }, []);
  return (
    <>
      <Header />
      <div className="container-fluid flex-grow-1 bg-secondary p-0 d-flex">
        <div className="row g-0 flex-grow-1">
            <SideBar className="col-1 d-flex" />
            <main className="col bg-light">
                <h2>Cursos</h2>
            {courses.length === 0 ? (
              <p>No hay cursos disponibles.</p>
            ) : (
              <ul className="list-group">
                {courses.map((course) => (
                  <li key={course.id} className="list-group-item">
                    ID: {course.id} - Materia: {course.subject?.name || "Sin nombre"} - Profesor: {course.professor?.username || "Sin nombre"}
                  </li>
                ))}
              </ul>
            )}
            </main>
        </div>
      </div>
    </>
  );
}

export default HomePage;
