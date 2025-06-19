import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import forumService from "../api/forumService";
import CourseSidebar from "../components/CourseSidebar";

function ForumDetailPage() {
  const { courseId, forumId } = useParams();
  const navigate = useNavigate();
  const [forum, setForum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    forumService
      .show(forumId)
      .then(setForum)
      .finally(() => setLoading(false));
  }, [forumId]);

  if (loading) return <p className="p-3">Cargando foro...</p>;
  if (!forum) return <p className="p-3">Foro no encontrado</p>;

  const author = forum.author;

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId} />

        <section className="col-md-10 p-4">
          <h3 className="mb-4">{forum.title}</h3>

          <div className="mb-3">
            <strong>Descripción:</strong>
            <p>{forum.description}</p>
          </div>

          <div className="mb-3">
            <strong>Fecha de creación:</strong>{" "}
            {new Date(forum.creationDate).toLocaleString()}
          </div>

          <div className="mb-3">
            <strong>Autor:</strong>
            <ul className="list-unstyled ms-3">
              <li>
                <strong>Nombre:</strong> {author.firstName} {author.lastName}
              </li>
              <li>
                <strong>Usuario:</strong> {author.username}
              </li>
              <li>
                <strong>Correo:</strong> {author.email}
              </li>
              <li>
                <strong>Rol:</strong> {author.role}
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
              Volver
            </button>
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate(`/courses/${courseId}/forums/form?forumId=${forumId}`)
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

export default ForumDetailPage;
