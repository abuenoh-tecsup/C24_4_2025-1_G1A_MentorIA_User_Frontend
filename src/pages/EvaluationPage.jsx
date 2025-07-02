import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import evaluationService from "../api/evaluationService";
import courseService from "../api/courseService";
import CourseSidebar from "../components/CourseSidebar";
import AddDropdown from "../components/AddDropdown";
import ResourceList from "../components/ResourceList";
import Breadcrumb from "../components/Breadcrumb";

function EvaluationPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    evaluationService.getAll().then((data) => {
      const filtered = data.filter(
        (evaluation) => evaluation.module.course.id === Number(courseId)
      );
      setEvaluations(filtered);
      courseService.show(courseId).then((data)=>{setCourse(data)});
    });
  }, [courseId]);

  if (!course) return <p className="p-3">Cargando evaluaciones...</p>;

  const breadcrumbItems = [
    {
      name: course?.subject?.name,
      href: `/courses/${courseId}`,
    },
    {
      name: "Evaluaciones",
      href: `/courses/${courseId}/evaluations`,
    },
  ];

  return (
    <div className="container-fluid h-100">
      <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      <div className="row">
        <CourseSidebar courseId={courseId} />
        <section className="col-md-9 p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">
              <i className="bi bi-clipboard-fill pe-2"></i>
              Evaluaciones del Curso
            </h2>
            <AddDropdown courseId={courseId} />
          </div>

          <ResourceList
            items={evaluations}
            courseId={courseId}
            resourceType="evaluation"
          />
        </section>
      </div>
    </div>
  );
}

export default EvaluationPage;
