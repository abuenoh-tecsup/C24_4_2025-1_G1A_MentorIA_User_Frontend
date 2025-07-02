import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import forumService from "../api/forumService";
import commentService from "../api/commentService";
import CourseSidebar from "../components/CourseSidebar";
import { useAuthStore } from "../store/auth.store";
import Breadcrumb from "../components/Breadcrumb";

function ForumDetailPage() {
  const user = useAuthStore((state) => state.user);

  const { courseId, forumId } = useParams();
  const navigate = useNavigate();

  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [commentText, setCommentText] = useState("");

  const fetchForum = async () => {
    setLoading(true);
    try {
      const data = await forumService.show(forumId);
      setForum(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    const data = await commentService.getByForumId(forumId);
    setComments(data);
  };

  useEffect(() => {
    fetchForum();
    fetchComments();
  }, [forumId]);

  const handleSubmitComment = async () => {
    try {
      await commentService.create({
        content: commentText,
        forumId: parseInt(forumId),
        userId: user?.id,
        creationDate: new Date().toISOString(),
      });

      setCommentText("");
      setShowForm(false);
      fetchComments();
    } catch (err) {
      alert("Error al enviar comentario");
    }
  };

  if (loading) return <p className="p-3">Cargando foro...</p>;
  if (!forum) return <p className="p-3">Foro no encontrado</p>;

  const author = forum.author;

  const breadcrumbItems = [
    { name: forum.module.course.subject.name, href: `/courses/${courseId}` },
    { name: "Foros", href: `/courses/${courseId}/forums` },
    { name: forum.title, href: `/courses/${courseId}/forums/${forumId}` }
  ];

  return (
    <div className="container-fluid h-100">
      <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      <div className="row">
        <CourseSidebar courseId={courseId} />

        <main className="col-md-9 p-4">
          {/* Header */}
          <header className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">{forum.title}</h3>
            <div>
              <button
                className="btn btn-secondary me-2"
                onClick={() => navigate(-1)}
              >
                Volver
              </button>
              {user?.role === "professor" && (
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(
                      `/courses/${courseId}/forums/form?forumId=${forumId}`
                    )
                  }
                >
                  Editar
                </button>
              )}
            </div>
          </header>

          {/* Info del foro */}
          <section className="bg-white basic-border p-4 mb-4">
            <h5>Descripción</h5>
            <p>{forum.description}</p>

            <h5 className="mt-3">Autor</h5>
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

            <h5 className="mt-3">Fecha de creación</h5>
            <p>{new Date(forum.creationDate).toLocaleString()}</p>
          </section>

          {/* Comentario usuario */}
          <section className="bg-white basic-border p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Responder</h5>
              <button
                className="btn btn-outline-success"
                onClick={() => setShowForm((prev) => !prev)}
              >
                {showForm ? "Cancelar" : "Responder al foro"}
              </button>
            </div>

            {showForm && (
              <div>
                <textarea
                  className="form-control mb-2"
                  rows="4"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                />
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitComment}
                >
                  Enviar comentario
                </button>
              </div>
            )}
          </section>

          {/* Lista de respuestas */}
          <section className="bg-white basic-border p-4 mb-4">
            <h5 className="mb-3">Respuestas</h5>
            {comments.length === 0 ? (
              <p className="text-muted">Este foro aún no tiene respuestas.</p>
            ) : (
              <ul className="list-group">
                {comments.map((comment) => (
                  <li key={comment.id} className="list-group-item">
                    <p className="mb-1">{comment.content}</p>
                    <small className="text-muted">
                      Por {comment.user.username} el{" "}
                      {new Date(comment.creationDate).toLocaleString()}
                    </small>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default ForumDetailPage;
