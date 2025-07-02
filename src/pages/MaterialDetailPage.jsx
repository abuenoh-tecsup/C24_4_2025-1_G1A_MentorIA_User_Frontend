import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import materialService from "../api/materialService";
import generatedContentService from "../api/generatedContentService";
import CourseSidebar from "../components/CourseSidebar";
import { useAuthStore } from "../store/auth.store";

function MaterialDetailPage() {
  const user = useAuthStore((state) => state.user);
  const isProfessor = user?.role === "professor";

  const { courseId, materialId } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [generatedContent, setGeneratedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    Promise.all([
      materialService.show(materialId),
      generatedContentService.getByMaterial(materialId),
    ])
      .then(([mat, content]) => {
        setMaterial(mat);
        setGeneratedContent(content);
      })
      .finally(() => setLoading(false));
  }, [materialId]);

  const handleGenerate = async (type) => {
    try {
      setGenerating(true);
      const newContent = await generatedContentService.generate({
        userId: user.id,
        materialId: Number(materialId),
        contentType: type.toLowerCase(),
        outputFormat: "text",
      });
      setGeneratedContent((prev) => [...prev, newContent]);
    } catch (err) {
      console.error(err);
      alert(
        "Error al generar contenido IA: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <p className="p-3">Cargando material...</p>;
  if (!material) return <p className="p-3">Material no encontrado</p>;

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId} />

        <section className="col-md-9 p-3">
          {/* Sección 1: Detalles del material */}
          <h2 className="mb-3">
            <i class="bi bi-paperclip pe-2"></i>
            {material.title}
          </h2>

          <section className="bg-white basic-border p-4 mb-4">
            <div className="mb-3">
              <strong>Descripción:</strong>
              <p>{material.description}</p>
            </div>
            <div className="mb-3">
              <strong>Tipo:</strong> <p className="d-inline">{material.type}</p>
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

          <section className="bg-white basic-border p-4 mb-4">
            <h5>Generar contenido con IA</h5>
            <div className="d-flex gap-3">
              <button
                className="btn btn-outline-success"
                disabled={generating}
                onClick={() => handleGenerate("summary")}
              >
                Generar resumen
              </button>
              <button
                className="btn btn-outline-info"
                disabled={generating}
                onClick={() => handleGenerate("flashcards")}
              >
                Generar flashcards
              </button>
            </div>
          </section>

          <section className="bg-white basic-border p-4 mb-4">
            <h5>Contenidos generados</h5>
            {generatedContent.length === 0 ? (
              <p className="text-muted">
                Aún no se ha generado contenido con IA.
              </p>
            ) : (
              <ul className="list-group">
                {generatedContent.map((item) => (
                  <li key={item.id} className="list-group-item">
                    <strong>{item.contentType}:</strong>
                    <pre
                      className="mt-2 mb-0 text-wrap"
                      style={{ whiteSpace: "pre-wrap" }}
                    >
                      {item.content.slice(0, 200)}
                      {item.content.length > 200 && "..."}
                    </pre>
                    <div className="text-muted small mt-1">
                      Generado el {new Date(item.creationDate).toLocaleString()}
                    </div>
                    <div className="mt-2 d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() =>
                          navigate(
                            `/courses/${courseId}/materials/${materialId}/generated/${item.id}`
                          )
                        }
                      >
                        Ver detalle
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={async () => {
                          if (
                            confirm(
                              "¿Seguro que deseas eliminar este contenido generado?"
                            )
                          ) {
                            await generatedContentService.remove(item.id);
                            setGeneratedContent((prev) =>
                              prev.filter((g) => g.id !== item.id)
                            );
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </section>
      </div>
    </div>
  );
}

export default MaterialDetailPage;
