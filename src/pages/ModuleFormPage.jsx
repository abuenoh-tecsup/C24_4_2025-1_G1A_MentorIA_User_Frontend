import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moduleService from "../api/moduleService";
import CourseSidebar from "../components/CourseSidebar";

function ModuleFormPage() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const moduleId = searchParams.get("moduleId");

  const isEditing = !!moduleId;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      moduleService
        .show(moduleId)
        .then((data) => {
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("moduleOrder", data.moduleOrder);
        })
        .finally(() => setLoading(false));
    }
  }, [isEditing, moduleId, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        courseId: Number(courseId),
        moduleOrder: Number(data.moduleOrder),
      };

      if (isEditing) {
        await moduleService.update(moduleId, payload);
      } else {
        await moduleService.create(payload);
      }

      navigate(`/courses/${courseId}/modules`);
    } catch (error) {
      setError("root", {
        type: "server",
        message: error.message || "Error del servidor",
      });
    }
  };

  if (loading) return <p className="p-3">Cargando módulo...</p>;

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId} />

        <section className="col-md-9 p-3">
          <h2>
            <i class="bi bi-bookmark-fill pe-1"></i>
            {isEditing ? "Editar Módulo" : "Nuevo Módulo"}
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
              <label className="form-label">Orden</label>
              <input
                type="number"
                className="form-control"
                {...register("moduleOrder", {
                  required: "Orden obligatorio",
                  min: { value: 1, message: "Debe ser mayor que 0" },
                })}
              />
              {errors.moduleOrder && (
                <div className="text-danger">{errors.moduleOrder.message}</div>
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

export default ModuleFormPage;
