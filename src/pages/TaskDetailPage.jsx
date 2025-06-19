import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import taskService from "../api/taskService";
import CourseSidebar from "../components/CourseSidebar";

function TaskDetailPage() {
  const { courseId, taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    taskService
      .show(taskId)
      .then(setTask)
      .finally(() => setLoading(false));
  }, [taskId]);

  if (loading) return <p className="p-3">Cargando tarea...</p>;
  if (!task) return <p className="p-3">Tarea no encontrada</p>;

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId} />

        <section className="col-md-10 p-4">
          <h3 className="mb-4">{task.title}</h3>

          <div className="mb-3">
            <strong>Descripción:</strong>
            <p>{task.description}</p>
          </div>

          <div className="mb-3">
            <strong>Fecha de publicación:</strong>{" "}
            {new Date(task.publicationDate).toLocaleString()}
          </div>

          <div className="mb-3">
            <strong>Fecha de entrega:</strong>{" "}
            {new Date(task.dueDate).toLocaleString()}
          </div>

          <div className="mt-4">
            <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
              Volver
            </button>
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate(`/courses/${courseId}/tasks/form?taskId=${taskId}`)
              }
            >
              Editar
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TaskDetailPage;
