import { NavLink, useParams } from "react-router-dom";

function CourseSidebar() {
  const { id } = useParams();

  return (
    <aside className="col-md-2 p-0">
      <div className="list-group rounded-0">
        <NavLink
          to={`/courses/${id}`}
          end
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? "active" : ""}`
          }
        >
          Página de inicio
        </NavLink>
        <NavLink
          to={`/courses/${id}/modules`}
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? "active" : ""}`
          }
        >
          Módulos
        </NavLink>
        <NavLink
          to={`/courses/${id}/tasks`}
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? "active" : ""}`
          }
        >
          Tareas
        </NavLink>
        <NavLink
          to={`/courses/${id}/evaluations`}
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? "active" : ""}`
          }
        >
          Evaluaciones
        </NavLink>
        <NavLink
          to={`/courses/${id}/forums`}
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? "active" : ""}`
          }
        >
          Foros
        </NavLink>
      </div>
    </aside>
  );
}

export default CourseSidebar;
