import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import generatedContentService from "../api/generatedContentService";
import CourseSidebar from "../components/CourseSidebar";
import ReactMarkdown from "react-markdown";
import Flashcard from "../components/Flashcard";
import Breadcrumb from "../components/Breadcrumb";

function GeneratedContentDetailPage() {
  const { courseId, materialId, generatedId } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generatedContentService
      .show(generatedId)
      .then(setContent)
      .finally(() => setLoading(false));
  }, [generatedId]);

  let parsedFlashcards = [];

  if (content?.contentType === "flashcards") {
    try {
      parsedFlashcards = JSON.parse(content.content);
    } catch (error) {
      console.error("Error al parsear flashcards:", error);
      parsedFlashcards = null;
    }
  }

  if (loading) return <p className="p-3">Cargando contenido generado...</p>;
  if (!content) return <p className="p-3">Contenido no encontrado</p>;

  const breadcrumbItems = [
    { name: content.material.module.course.subject.name, href: `/courses/${content.material.module.course.id}` },
    { name: "Materiales", href: `/courses/${courseId}/materials` },
    { name: content.material.title , href: `/courses/${courseId}/materials/${content.material.id}` },
    { name: "Contenido generado" , href: "/" },
  ];

  return (
    <div className="container-fluid h-100">
      <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      <div className="row">
        <CourseSidebar courseId={courseId} />
        <section className="col-md-9 p-4">
          <h3 className="mb-4">Detalle de contenido generado</h3>

          <div className="mb-3">
            <strong>Tipo:</strong> {content.contentType}
          </div>
          <div className="mb-3">
            <strong>Fecha:</strong>{" "}
            {new Date(content.creationDate).toLocaleString()}
          </div>
          <div className="mb-3">
            <strong>Contenido:</strong>
            <div className="mt-2">
              {content.contentType === "flashcards" && parsedFlashcards ? (
                parsedFlashcards.map((card, index) => (
                  <Flashcard
                    key={index}
                    question={card.question}
                    answer={card.answer}
                  />
                ))
              ) : (
                <ReactMarkdown>{content.content}</ReactMarkdown>
              )}
            </div>
          </div>

          <button
            className="btn btn-secondary"
            onClick={() =>
              navigate(`/courses/${courseId}/materials/${materialId}`)
            }
          >
            Volver
          </button>
        </section>
      </div>
    </div>
  );
}

export default GeneratedContentDetailPage;
