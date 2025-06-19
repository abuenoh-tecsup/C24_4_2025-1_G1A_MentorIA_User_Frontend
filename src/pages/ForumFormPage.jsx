import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import forumService from "../api/forumService";
import moduleService from "../api/moduleService";
import userService from "../api/userService";
import CourseSidebar from "../components/CourseSidebar";

function ForumFormPage() {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const forumId = searchParams.get("forumId");

  const isEditing = !!forumId;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchModulesAndUsers = async () => {
      const [allModules, allUsers] = await Promise.all([
        moduleService.getAll(),
        userService.getAll(),
      ]);

      const courseModules = allModules.filter(
        (mod) => mod.course.id === parseInt(courseId)
      );

      setModules(courseModules);
      setUsers(allUsers);
    };

    fetchModulesAndUsers();
  }, [courseId]);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      forumService
        .show(forumId)
        .then((data) => {
          setValue("title", data.title);
          setValue("description", data.description);
          setValue("creationDate", data.creationDate?.slice(0, 16));
          setValue("authorId", data.author.id);
          setValue("moduleId", data.module.id);
        })
        .finally(() => setLoading(false));
    }
  }, [isEditing, forumId, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        authorId: Number(data.authorId),
        moduleId: Number(data.moduleId),
        creationDate: new Date(data.creationDate).toISOString(),
      };

      if (isEditing) {
        await forumService.update(forumId, payload);
      } else {
        await forumService.create(payload);
      }

      navigate(`/courses/${courseId}/forums`);
    } catch (error) {
      setError("root", {
        type: "server",
        message: error.message || "Error del servidor",
      });
    }
  };

  if (loading) return <p className="p-3">Cargando foro...</p>;

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId} />

        <section className="col-md-10 p-4">
          <h3>{isEditing ? "Editar Foro" : "Nuevo Foro"}</h3>

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
              <label className="form-label">Fecha de creación</label>
              <input
                type="datetime-local"
                className="form-control"
                {...register("creationDate", {
                  required: "Fecha obligatoria",
                })}
              />
              {errors.creationDate && (
                <div className="text-danger">{errors.creationDate.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Autor</label>
              <select
                className="form-select"
                {...register("authorId", { required: "Autor obligatorio" })}
              >
                <option value="">Seleccione un autor</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.username})
                  </option>
                ))}
              </select>
              {errors.authorId && (
                <div className="text-danger">{errors.authorId.message}</div>
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

export default ForumFormPage;
