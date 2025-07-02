import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import evaluationService from "../api/evaluationService";
import CourseSidebar from "../components/CourseSidebar";
import AddDropdown from "../components/AddDropdown";
import ResourceList from "../components/ResourceList";

function EvaluationPage() {
  const { courseId } = useParams();
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    evaluationService.getAll().then((data) => {
      const filtered = data.filter(
        (evaluation) => evaluation.module.course.id === Number(courseId)
      );
      setEvaluations(filtered);
    });
  }, [courseId]);

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId} />
        <section className="col-md-9 p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">
              <i class="bi bi-clipboard-fill pe-2"></i>
              Evaluaciones del Curso</h2>
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
