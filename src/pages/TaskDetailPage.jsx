import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTaskDetailData } from "../hooks/useTaskDetailData";
import submissionService from "../api/submissionService";
import CourseSidebar from "../components/CourseSidebar";
import SubmissionForm from "../components/SubmissionForm";
import { SubmissionDetails } from "../components/SubmissionDetails";
import { useAuthStore } from "../store/auth.store";

function TaskDetailPage() {
  const { courseId, taskId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const userId = user?.id;
  const userRole = user?.role;

  const isStudent = userRole === "student";
  const isProfessor = userRole === "professor";

  const [showForm, setShowForm] = useState(false);

  const {
    loading,
    task,
    userSubmission,
    setUserSubmission,
    enrichedSubmissions,
    setEnrichedSubmissions,
    refreshSubmissions,
  } = useTaskDetailData(taskId, courseId, userId, userRole);

  const handleFormSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        taskId: parseInt(taskId),
        status: "submitted",
      };

      if (userSubmission) {
        await submissionService.update(userSubmission.id, payload);
      } else {
        await submissionService.create(payload);
      }

      await refreshSubmissions();
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="p-3">Cargando tarea...</p>;
  if (!task) return <p className="p-3">Tarea no encontrada</p>;

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId} />

        <main className="col-md-10 p-4">
          {/* Header */}
          <header className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">{task.title}</h3>
            <div>
              <button
                className="btn btn-secondary me-2"
                onClick={() => navigate(-1)}
              >
                Volver
              </button>
              {isProfessor && (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/courses/${courseId}/tasks/form?taskId=${taskId}`)
                  }
                >
                  Editar
                </button>
              )}
            </div>
          </header>

          {/* Info Tarea */}
          <section className="bg-white border p-4 rounded mb-4">
            <h5>Descripción</h5>
            <p>{task.description}</p>

            <h5 className="mt-3">Fechas</h5>
            <ul className="list-unstyled">
              <li>
                <strong>Publicación:</strong>{" "}
                {new Date(task.publicationDate).toLocaleString()}
              </li>
              <li>
                <strong>Entrega:</strong>{" "}
                {new Date(task.dueDate).toLocaleString()}
              </li>
            </ul>
          </section>

          {/* Entrega Estudiante */}
          {isStudent && (
            <section className="bg-white border p-4 rounded mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Entrega</h5>
                <button
                  className="btn btn-outline-success"
                  onClick={() => setShowForm((prev) => !prev)}
                >
                  {showForm
                    ? "Cancelar"
                    : userSubmission
                    ? "Volver a entregar"
                    : "Realizar entrega"}
                </button>
              </div>

              {showForm ? (
                <SubmissionForm
                  defaultValues={{
                    userId: userId,
                    fileUrl: userSubmission?.fileUrl || "",
                    comments: userSubmission?.comments || "",
                  }}
                  onSubmit={handleFormSubmit}
                />
              ) : userSubmission ? (
                <SubmissionDetails submission={userSubmission} />
              ) : (
                <p className="text-muted">
                  No has realizado ninguna entrega aún.
                </p>
              )}
            </section>
          )}

          {/* Lista de Entregas - Profesor */}
          {isProfessor && (
            <section className="bg-white border p-4 rounded mb-4">
              <h5 className="mb-3">Entregas de estudiantes</h5>
              {enrichedSubmissions.length === 0 ? (
                <p className="text-muted">No hay estudiantes registrados.</p>
              ) : (
                <table className="table table-bordered table-striped">
                  <thead className="table-light">
                    <tr>
                      <th>Estudiante</th>
                      <th>Estado</th>
                      <th>Fecha</th>
                      <th>Nota</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrichedSubmissions.map(({ student, submission }) => (
                      <tr key={student.studentId}>
                        <td>{student.fullName}</td>
                        <td>{submission?.status ?? "No entregado"}</td>
                        <td>
                          {submission?.submissionDate
                            ? new Date(
                                submission.submissionDate
                              ).toLocaleString()
                            : "—"}
                        </td>
                        <td>{submission?.grade ?? "—"}</td>
                        <td>
                          {submission ? (
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() =>
                                navigate(`/submissions/${submission.id}`)
                              }
                            >
                              Calificar
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={async () => {
                                try {
                                  await submissionService.create({
                                    taskId: parseInt(taskId),
                                    userId: student.userId,
                                    status: "empty",
                                    comments: "",
                                    fileUrl: "",
                                  });
                                  await refreshSubmissions();
                                } catch (error) {
                                  alert("Error al registrar entrega vacía");
                                }
                              }}
                            >
                              Registrar entrega vacía
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default TaskDetailPage;
