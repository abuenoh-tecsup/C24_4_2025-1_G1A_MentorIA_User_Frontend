import { Link } from "react-router-dom";
import ModuleResourceList from "./ModuleResourceList";
import { useAuthStore } from "../store/auth.store";

function ModuleAccordionItem({
  module,
  materials = [],
  evaluations = [],
  forums = [],
  tasks = [],
  index,
  course,
}) {
  const isProfessor = useAuthStore((state) => state.user?.role === "professor");

  const isEmpty =
    materials.length === 0 &&
    evaluations.length === 0 &&
    forums.length === 0 &&
    tasks.length === 0;

  return (
    <div className="accordion-item mb-4 rounded-0">
      <h2 className="accordion-header basic-border" id={`heading-${module.id}`}>
        <div className="d-flex justify-content-between align-items-center">
          <button
            className={`accordion-button outline-none ${
              index !== 0 ? "collapsed" : ""
            }`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${module.id}`}
            aria-expanded={index === 0 ? "true" : "false"}
            aria-controls={`collapse-${module.id}`}
          >
            <h5 className="m-0">
              {module.moduleOrder}. {module.title}
            </h5>
          </button>
          {isProfessor && (
            <div className="px-3">
              <Link
                to={`/courses/${course}/modules/form?moduleId=${module.id}`}
                className="btn btn-sm btn-outline-primary"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="bi bi-pencil-square"></i>
              </Link>
            </div>
          )}
        </div>
      </h2>

      <div
        id={`collapse-${module.id}`}
        className={`basic-border border-top-0 accordion-collapse collapse ${index === 0 ? "show" : ""}`}
        aria-labelledby={`heading-${module.id}`}
        data-bs-parent="#modulesAccordion"
      >
        <div className="accordion-body">
          <ModuleResourceList
            title="Materiales"
            items={materials}
            route="materials"
            courseId={course}
          />
          <ModuleResourceList
            title="Evaluaciones"
            items={evaluations}
            route="evaluations"
            courseId={course}
          />
          <ModuleResourceList
            title="Foros"
            items={forums}
            route="forums"
            courseId={course}
          />
          <ModuleResourceList
            title="Tareas"
            items={tasks}
            route="tasks"
            courseId={course}
          />

          {isEmpty && <p className="text-muted">Este módulo está vacío.</p>}
        </div>
      </div>
    </div>
  );
}

export default ModuleAccordionItem;
