import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import evaluationService from "../api/evaluationService";
import CourseSidebar from "../components/CourseSidebar";
import { useAuthStore } from "../store/auth.store";

function EvaluationDetailPage() {
  const isProfessor = useAuthStore((state) => state.user?.role === "professor");

  const { courseId, evaluationId } = useParams();
  const navigate = useNavigate();
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    evaluationService
      .show(evaluationId)
      .then(setEvaluation)
      .finally(() => setLoading(false));
  }, [evaluationId]);

  if (loading) return <p className="p-3">Cargando evaluación...</p>;
  if (!evaluation) return <p className="p-3">Evaluación no encontrada</p>;

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId} />

        <main className="col-md-9 p-3">
          <h2 className="mb-3"><i class="bi bi-clipboard-fill pe-2"></i>{evaluation.title}</h2>

          <section className="bg-white basic-border p-4 mb-4">
            <div className="mb-3">
              <strong>Descripción:</strong>
              <p>{evaluation.description}</p>
            </div>
            <div className="mb-3">
              <strong>Fecha de inicio:</strong>{" "}
              {new Date(evaluation.startDate).toLocaleString()}
            </div>
            <div className="mb-3">
              <strong>Fecha de fin:</strong>{" "}
              {new Date(evaluation.endDate).toLocaleString()}
            </div>
            <div className="mb-3">
              <strong>Límite de tiempo:</strong> {evaluation.timeLimit} minutos
            </div>
            <div className="mt-4">
              <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
                Volver
              </button>
              {isProfessor && (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/courses/${courseId}/evaluations/form?evaluationId=${evaluationId}`)
                  }
                >
                  Editar
                </button>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default EvaluationDetailPage;
