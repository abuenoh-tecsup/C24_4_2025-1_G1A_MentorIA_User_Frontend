import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import taskService from "../api/taskService";
import courseService from "../api/courseService";
import moduleService from "../api/moduleService";
import CourseSidebar from "../components/CourseSidebar";
import Breadcrumb from "../components/Breadcrumb";

function TaskFormPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("taskId");

  const isEditing = !!taskId;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    moduleService.getAll().then((allModules) => {
      const filtered = allModules.filter(
        (mod) => mod.course.id === parseInt(courseId)
      );
      courseService.show(courseId).then((data)=>{setCourse(data)});
      setModules(filtered);
    });
  }, [courseId]);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      taskService
        .show(taskId)
        .then((data) => {
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("publicationDate", data.publicationDate?.slice(0, 16));
          setValue("dueDate", data.dueDate?.slice(0, 16));
          setValue("moduleId", data.module.id);
        })
        .finally(() => setLoading(false));
    }
  }, [isEditing, taskId, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        moduleId: Number(data.moduleId),
        publicationDate: new Date(data.publicationDate).toISOString(),
        dueDate: new Date(data.dueDate).toISOString(),
      };

      if (isEditing) {
        await taskService.update(taskId, payload);
      } else {
        await taskService.create(payload);
      }

      navigate(`/courses/${courseId}/tasks`);
    } catch (error) {
      setError("root", {
        type: "server",
        message: error.message || "Error del servidor",
      });
    }
  };

  if (loading) return <p className="p-3">Cargando tarea...</p>;

  const breadcrumbItems = [
    { name: course?.subject.name, href: `/courses/${courseId}` },
    { name: "Tareas", href: `/courses/${courseId}/tasks` },
    { name: (isEditing) ? "Editar tarea" : "Crear tarea" , href: "/" },
  ];

  return (
    <div className="container-fluid h-100">
      <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      <div className="row">
        <CourseSidebar courseId={courseId} />

        <section className="col-md-9 p-3">
          <h2 className="m-0">
            <i className="bi bi-pencil-square pe-2"></i>
            {isEditing ? "Editar Tarea" : "Nueva Tarea"}
          </h2>

          {errors.root && (
            <div className="alert alert-danger">{errors.root.message}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-3 bg-white p-3 basic-border">
            <div className="mb-3">
              <label className="form-label">Título</label>
              <input
                className="form-control"
                {...register("title", { required: "Título obligatorio" })}
              />
              {errors.title && (
                <div className="text-danger">{errors.title.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                rows={3}
                {...register("description", {
                  required: "Descripción obligatoria",
                })}
              />
              {errors.description && (
                <div className="text-danger">{errors.description.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha de publicación</label>
              <input
                type="datetime-local"
                className="form-control"
                {...register("publicationDate", {
                  required: "Fecha de publicación obligatoria",
                })}
              />
              {errors.publicationDate && (
                <div className="text-danger">
                  {errors.publicationDate.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha de entrega</label>
              <input
                type="datetime-local"
                className="form-control"
                {...register("dueDate", {
                  required: "Fecha de entrega obligatoria",
                })}
              />
              {errors.dueDate && (
                <div className="text-danger">{errors.dueDate.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Módulo</label>
              <select
                className="form-select"
                {...register("moduleId", {
                  required: "Módulo obligatorio",
                })}
              >
                <option value="">Seleccione un módulo</option>
                {modules.map((mod) => (
                  <option key={mod.id} value={mod.id}>
                    {mod.moduleOrder}. {mod.title}
                  </option>
                ))}
              </select>
              {errors.moduleId && (
                <div className="text-danger">{errors.moduleId.message}</div>
              )}
            </div>

            <button className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default TaskFormPage;
