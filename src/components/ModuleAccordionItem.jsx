import { Link } from "react-router-dom";

function ModuleAccordionItem({
  module,
  materials = [],
  evaluations = [],
  forums = [],
  tasks = [],
  index,
  course,
}) {
  const isEmpty =
    materials.length === 0 &&
    evaluations.length === 0 &&
    forums.length === 0 &&
    tasks.length === 0;

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${module.id}`}>
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
            {module.moduleOrder}. {module.title}
          </button>
          <div className="px-3">
            <Link
              to={`/courses/${course}/modules/form?moduleId=${module.id}`}
              className="btn btn-sm btn-outline-primary"
              onClick={(e) => e.stopPropagation()}
            >
              Editar
            </Link>
          </div>
        </div>
      </h2>

      <div
        id={`collapse-${module.id}`}
        className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
        aria-labelledby={`heading-${module.id}`}
        data-bs-parent="#modulesAccordion"
      >
        <div className="accordion-body">

          {materials.length > 0 && (
            <>
              <h6>Materiales</h6>
              <ul className="list-group mb-3">
                {materials.map((mat) => (
                  <li key={mat.id} className="list-group-item">
                    <strong>{mat.title}</strong> <br />
                    <span>{mat.description}</span> <br />
                    <a
                      href={mat.resourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver recurso
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}

          {evaluations.length > 0 && (
            <>
              <h6>Evaluaciones</h6>
              <ul className="list-group mb-3">
                {evaluations.map((ev) => (
                  <li key={ev.id} className="list-group-item">
                    <strong>{ev.title}</strong> <br />
                    <span>{ev.description}</span> <br />
                    Inicio: {new Date(ev.startDate).toLocaleString()} <br />
                    Fin: {new Date(ev.endDate).toLocaleString()} <br />
                    Límite de tiempo: {ev.timeLimit} minutos
                  </li>
                ))}
              </ul>
            </>
          )}

          {forums.length > 0 && (
            <>
              <h6>Foros</h6>
              <ul className="list-group mb-3">
                {forums.map((f) => (
                  <li key={f.id} className="list-group-item">
                    <strong>{f.title}</strong> <br />
                    <span>{f.description}</span> <br />
                    Autor: {f.author.firstName} {f.author.lastName} ({f.author.role})
                  </li>
                ))}
              </ul>
            </>
          )}

          {tasks.length > 0 && (
            <>
              <h6>Tareas</h6>
              <ul className="list-group mb-3">
                {tasks.map((t) => (
                  <li key={t.id} className="list-group-item">
                    <strong>{t.title}</strong> <br />
                    <span>{t.description}</span> <br />
                    Publicación: {new Date(t.publicationDate).toLocaleString()} <br />
                    Entrega: {new Date(t.dueDate).toLocaleString()}
                  </li>
                ))}
              </ul>
            </>
          )}

          {isEmpty && (
            <p className="text-muted">Este módulo está vacío.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModuleAccordionItem;
