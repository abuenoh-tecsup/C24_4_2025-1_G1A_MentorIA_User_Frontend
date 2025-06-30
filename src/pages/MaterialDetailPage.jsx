import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import materialService from "../api/materialService";
import CourseSidebar from "../components/CourseSidebar";
import { useAuthStore } from "../store/auth.store";

function MaterialDetailPage() {
  const isProfessor = useAuthStore((state) => state.user?.role === "professor");

  const { courseId, materialId } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    materialService
      .show(materialId)
      .then(setMaterial)
      .finally(() => setLoading(false));
  }, [materialId]);

  if (loading) return <p className="p-3">Cargando material...</p>;
  if (!material) return <p className="p-3">Material no encontrado</p>;

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId} />

        <section className="col-md-10 p-4">
          <h3 className="mb-4">{material.title}</h3>

          

          <div className="mb-3">
            <strong>Descripción:</strong>
            <p>{material.description}</p>
          </div>

          <div className="mb-3">
            <strong>Tipo:</strong> {material.type}
          </div>

          <div className="mb-3">
            <strong>Recurso:</strong>{" "}
            <a href={material.resourceUrl} target="_blank" rel="noreferrer">
              {material.resourceUrl}
            </a>
          </div>

          <div className="mb-3">
            <strong>Fecha de creación:</strong>{" "}
            {new Date(material.creationDate).toLocaleString()}
          </div>

          <div className="mt-4">
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
                  navigate(
                    `/courses/${courseId}/materials/form?materialId=${materialId}`
                  )
                }
              >
                Editar
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MaterialDetailPage;
