import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import submissionService from "../api/submissionService";
import CourseSidebar from "../components/CourseSidebar";
import Breadcrumb from "../components/Breadcrumb";

function SubmissionDetailPage() {
  const { submissionId } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  const [grade, setGrade] = useState("");
  const [status, setStatus] = useState("submitted");

  useEffect(() => {
    submissionService
      .show(submissionId)
      .then((data) => {
        setSubmission(data);
        setGrade(data.grade ?? "");
        setStatus(data.status);
      })
      .finally(() => setLoading(false));
  }, [submissionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submissionService.update(submissionId, {
        grade: parseFloat(grade),
        status,
        comments: submission.comments,
        fileUrl: submission.fileUrl,
        taskId: submission.task.id,
        userId: submission.user.id,
      });

      navigate(`/courses/${submission.task.module.course.id}/tasks/${submission.task.id}`);
    } catch (error) {
      alert("Error al guardar la calificación");
    }
  };

  if (loading) return <p className="p-3">Cargando entrega...</p>;
  if (!submission) return <p className="p-3">Entrega no encontrada</p>;

  console.log(submission)

  const breadcrumbItems = [
    { name: submission.task.module.course.subject.name, href: `/courses/${submission.task.module.course.id}` },
    { name: "Tareas", href: `/courses/${submission.task.module.course.id}/tasks` },
    { name: submission.task.title , href: `/courses/${submission.task.module.course.id}/tasks/${submission.task.id}` },
    { name:`Entrega de ${submission.user.firstName}`, href: "/" },
  ];

  return (
    <div className="container-fluid h-100">
      <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      <div className="row">
        <CourseSidebar courseId={submission.task.module.course.id} />

        <main className="col-md-9 p-4">
          <header className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Calificar Entrega</h3>
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Volver
            </button>
          </header>

          <form onSubmit={handleSubmit} className="bg-white border p-4 rounded mb-4">
            <div className="row mb-3 align-items-end">
              <div className="col-md-6">
                <label className="form-label">Nota</label>
                <input
                  type="number"
                  className="form-control"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  step="0.1"
                  min="0"
                  max="20"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="submitted">Enviado</option>
                  <option value="graded">Calificado</option>
                  <option value="pending">Pendiente</option>
                  <option value="late">Tarde</option>
                  <option value="empty">Vacío</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Guardar Calificación
            </button>
          </form>

          <section className="bg-white border p-4 rounded">
            <h5>Detalles de la Entrega</h5>
            <p>
              <strong>Estudiante:</strong> {submission.user.fullName}
            </p>
            <p>
              <strong>Archivo:</strong>{" "}
              {submission.fileUrl ? (
                <a href={submission.fileUrl} target="_blank" rel="noreferrer">
                  Ver archivo
                </a>
              ) : (
                <span className="text-muted">—</span>
              )}
            </p>
            <p>
              <strong>Fecha de entrega:</strong>{" "}
              {new Date(submission.submissionDate).toLocaleString()}
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default SubmissionDetailPage;
