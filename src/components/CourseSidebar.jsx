import { NavLink, useParams } from "react-router-dom";

function CourseSidebar({ courseId }) {
  const id = courseId;

  return (
    <aside className="col-md-2 p-0">
      <nav className="nav nav-pills flex-column">
        <NavLink
          to={`/courses/${id}`}
          end
          className={({ isActive }) =>
            `nav-link course-nav-link ${isActive ? "active" : ""}`
          }
        >
          <i class="bi bi-house-fill pe-1"></i>
          Página de inicio
        </NavLink>
        <NavLink
          to={`/courses/${id}/modules`}
          className={({ isActive }) =>
            `nav-link course-nav-link ${isActive ? "active" : ""}`
          }
        >
          <i class="bi bi-bookmark-fill pe-1"></i>
          Módulos
        </NavLink>
        <NavLink
          to={`/courses/${id}/materials`}
          className={({ isActive }) =>
            `nav-link course-nav-link ${isActive ? "active" : ""}`
          }
        >
          <i class="bi bi-paperclip pe-1"></i>
          Materiales
        </NavLink>
        <NavLink
          to={`/courses/${id}/tasks`}
          className={({ isActive }) =>
            `nav-link course-nav-link ${isActive ? "active" : ""}`
          }
        >
          <i class="bi bi-pencil-square pe-1"></i>
          Tareas
        </NavLink>
        <NavLink
          to={`/courses/${id}/evaluations`}
          className={({ isActive }) =>
            `nav-link course-nav-link ${isActive ? "active" : ""}`
          }
        >
          <i class="bi bi-clipboard-fill pe-1"></i>
          Evaluaciones
        </NavLink>
        <NavLink
          to={`/courses/${id}/forums`}
          className={({ isActive }) =>
            `nav-link course-nav-link ${isActive ? "active" : ""}`
          }
        >
          <i class="bi bi-chat-fill pe-1"></i>
          Foros
        </NavLink>
      </nav>
    </aside>
  );
}

export default CourseSidebar;
