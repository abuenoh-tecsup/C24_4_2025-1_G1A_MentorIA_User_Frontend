import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

function AddDropdown({courseId}) {
  const navigate = useNavigate();

  const { user } = useAuthStore();
  const isProfessor = user?.role === "professor";

  const handleCreate = (type) => {
    navigate(`/courses/${courseId}/${type}s/form`);
  };

  if (!isProfessor) return null; 

  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="addDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Agregar
      </button>
      <ul className="dropdown-menu" aria-labelledby="addDropdown">
        <li>
          <button className="dropdown-item" onClick={() => handleCreate("module")}>
            Módulo
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => handleCreate("material")}>
            Material
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => handleCreate("task")}>
            Tarea
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => handleCreate("evaluation")}>
            Evaluación
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => handleCreate("forum")}>
            Foro
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AddDropdown;
