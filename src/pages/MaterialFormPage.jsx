import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import materialService from "../api/materialService";
import moduleService from "../api/moduleService";
import CourseSidebar from "../components/CourseSidebar";

function MaterialFormPage() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const materialId = searchParams.get("materialId");

  const isEditing = !!materialId;
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
    const fetchModules = async () => {
      const allModules = await moduleService.getAll();
      const courseModules = allModules.filter(
        (mod) => mod.course.id === parseInt(courseId)
      );
      setModules(courseModules);
    };

    fetchModules();
  }, [courseId]);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      materialService
        .show(materialId)
        .then((data) => {
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("type", data.type);
          setValue("moduleId", data.module.id);
        })
        .finally(() => setLoading(false));
    }
  }, [isEditing, materialId, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("type", data.type);
      formData.append("moduleId", data.moduleId);

      if (!isEditing && data.file[0]) {
        formData.append("file", data.file[0]);
      }

      if (isEditing) {
        await materialService.update(materialId, {
          title: data.title,
          description: data.description,
          type: data.type,
          moduleId: Number(data.moduleId),
        });
      } else {
        await materialService.create(formData);
      }

      navigate(`/courses/${courseId}/materials`);
    } catch (error) {
      setError("root", {
        type: "server",
        message: error.message || "Error del servidor",
      });
    }
  };

  if (loading) return <p className="p-3">Cargando material...</p>;

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId} />

        <section className="col-md-10 p-4">
          <h3>{isEditing ? "Editar Material" : "Nuevo Material"}</h3>

          {errors.root && (
            <div className="alert alert-danger">{errors.root.message}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
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
              <label className="form-label">Tipo</label>
              <select
                className="form-select"
                {...register("type", { required: "Tipo obligatorio" })}
              >
                <option value="">Seleccione un tipo</option>
                <option value="document">Documento</option>
                <option value="video">Video</option>
                <option value="link">Enlace</option>
                <option value="image">Imagen</option>
                <option value="audio">Audio</option>
              </select>
              {errors.type && (
                <div className="text-danger">{errors.type.message}</div>
              )}
            </div>

            {!isEditing && (
              <div className="mb-3">
                <label className="form-label">Archivo</label>
                <input
                  type="file"
                  className="form-control"
                  {...register("file", { required: "Archivo obligatorio" })}
                />
                {errors.file && (
                  <div className="text-danger">{errors.file.message}</div>
                )}
              </div>
            )}

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
            {isEditing && (
              <button
                type="button"
                className="btn btn-danger ms-2"
                onClick={async () => {
                  const confirmed = window.confirm(
                    "¿Seguro que deseas eliminar este material?"
                  );
                  if (confirmed) {
                    try {
                      await materialService.remove(materialId);
                      navigate(`/courses/${courseId}/materials`);
                    } catch (error) {
                      alert("Error al eliminar: " + error.message);
                    }
                  }
                }}
              >
                Eliminar
              </button>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}

export default MaterialFormPage;
