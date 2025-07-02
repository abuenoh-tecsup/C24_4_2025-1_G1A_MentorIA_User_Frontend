import courseService from "../api/courseService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseSidebar from "../components/CourseSidebar";

function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const data = await courseService.show(courseId);
      setCourse(data);
    };
    fetchCourse();
  }, [courseId]);

  if (!course) return <p>Cargando curso...</p>;

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId}/>
        <section className="col-md-9 p-3">
          <h2>Detalle del Curso</h2>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>ID:</strong> {course.id}
            </li>
            <li className="list-group-item">
              <strong>Materia:</strong> {course.subject?.name || "Sin materia"}
            </li>
            <li className="list-group-item">
              <strong>Profesor:</strong> {course.professor?.firstName}{" "}
              {course.professor?.lastName}
            </li>
            <li className="list-group-item">
              <strong>Email del profesor:</strong> {course.professor?.email}
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default CoursePage;
