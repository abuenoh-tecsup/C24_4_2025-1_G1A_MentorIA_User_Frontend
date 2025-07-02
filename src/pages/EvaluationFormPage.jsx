import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import evaluationService from "../api/evaluationService";
import moduleService from "../api/moduleService";
import courseService from "../api/courseService";
import CourseSidebar from "../components/CourseSidebar";
import Breadcrumb from "../components/Breadcrumb";

function EvaluationFormPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [searchParams] = useSearchParams();
  const evaluationId = searchParams.get("evaluationId");

  const isEditing = !!evaluationId;
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

  // Obtener módulos del curso
  useEffect(() => {
    const fetchModules = async () => {
      const allModules = await moduleService.getAll();
      const courseModules = allModules.filter(
        (mod) => mod.course.id === parseInt(courseId)
      );
      setModules(courseModules);
      courseService.show(courseId).then((data) => {
        setCourse(data);
      });
    };

    fetchModules();
  }, [courseId]);

  // Obtener evaluación si estamos editando
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      evaluationService
        .show(evaluationId)
        .then((data) => {
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("startDate", data.startDate?.slice(0, 16));
          setValue("endDate", data.endDate?.slice(0, 16));
          setValue("timeLimit", data.timeLimit);
          setValue("moduleId", data.module.id);
        })
        .finally(() => setLoading(false));
    }
  }, [isEditing, evaluationId, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        moduleId: Number(data.moduleId),
        timeLimit: Number(data.timeLimit),
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      if (isEditing) {
        await evaluationService.update(evaluationId, payload);
      } else {
        await evaluationService.create(payload);
      }

      navigate(`/courses/${courseId}/evaluations`);
    } catch (error) {
      setError("root", {
        type: "server",
        message: error.message || "Error del servidor",
      });
    }
  };

  if (loading) return <p className="p-3">Cargando evaluación...</p>;

  const breadcrumbItems = [
    { name: course?.subject.name, href: `/courses/${courseId}` },
    { name: "Evaluaciones", href: `/courses/${courseId}/evaluations` },
    { name: isEditing ? "Editar evaluacion" : "Crear evaluación", href: "/" },
  ];

  return (
    <div className="container-fluid h-100">
      <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      <div className="row">
        <CourseSidebar courseId={courseId} />

        <section className="col-md-9 p-3">
          <h2 className="m-0">
            <i className="bi bi-clipboard-fill pe-2"></i>
            {isEditing ? "Editar Evaluación" : "Nueva Evaluación"}
          </h2>

          {errors.root && (
            <div className="alert alert-danger">{errors.root.message}</div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-3 bg-white p-3 basic-border"
          >
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
              <label className="form-label">Fecha de inicio</label>
              <input
                type="datetime-local"
                className="form-control"
                {...register("startDate", {
                  required: "Fecha de inicio obligatoria",
                })}
              />
              {errors.startDate && (
                <div className="text-danger">{errors.startDate.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha de fin</label>
              <input
                type="datetime-local"
                className="form-control"
                {...register("endDate", {
                  required: "Fecha de fin obligatoria",
                })}
              />
              {errors.endDate && (
                <div className="text-danger">{errors.endDate.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Tiempo límite (minutos)</label>
              <input
                type="number"
                className="form-control"
                {...register("timeLimit", {
                  required: "Tiempo obligatorio",
                  min: { value: 1, message: "Debe ser mayor que 0" },
                })}
              />
              {errors.timeLimit && (
                <div className="text-danger">{errors.timeLimit.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Módulo</label>
              <select
                className="form-select"
                {...register("moduleId", { required: "Módulo obligatorio" })}
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

export default EvaluationFormPage;
