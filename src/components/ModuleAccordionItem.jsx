import { Link } from "react-router-dom";

function ModuleAccordionItem({ module, materials = [], index, course }) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${module.id}`}>
        <div className="d-flex justify-content-between align-items-center ">
          <button
            className={`accordion-button outline-none ${index !== 0 ? "collapsed" : ""}`}
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
              onClick={(e) => e.stopPropagation()} // ¡Esto es importante!
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
          <h6>Materiales</h6>
          {materials.length > 0 ? (
            <ul className="list-group">
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
          ) : (
            <p className="text-muted">No hay materiales para este módulo.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModuleAccordionItem;
