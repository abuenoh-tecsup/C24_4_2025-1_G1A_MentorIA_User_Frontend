import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

function ResourceItem({ resource, type, editPath, detailPath }) {
const isProfessor = useAuthStore((state) => state.user?.role === "professor");

  return (
    <div className="card mb-3 rounded-0 border-top-item">
      <div className="card-body">
        <h5 className="card-title">{resource.title}</h5>
        <p className="card-text">{resource.description}</p>

        {type === "material" && (
          <a
            href={resource.resourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-secondary me-2"
          >
            Ver recurso
          </a>
        )}

        <div className="mt-2">
          <Link to={detailPath} className="btn btn-sm btn-outline-info me-2">
            Ver detalle
          </Link>

          {isProfessor && (
            <Link to={editPath} className="btn btn-sm btn-outline-primary">
              Editar
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResourceItem;
