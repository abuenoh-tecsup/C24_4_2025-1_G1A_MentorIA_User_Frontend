import { useNavigate, useParams } from "react-router-dom";

function AddDropdown() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCreate = (type) => {
    navigate(`/courses/${id}/new${type}`);
  };

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
          <button className="dropdown-item" onClick={() => handleCreate("Module")}>
            Módulo
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => handleCreate("Material")}>
            Material
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => handleCreate("Task")}>
            Tarea
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => handleCreate("Evaluation")}>
            Evaluación
          </button>
        </li>
        <li>
          <button className="dropdown-item" onClick={() => handleCreate("Forum")}>
            Foro
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AddDropdown;
