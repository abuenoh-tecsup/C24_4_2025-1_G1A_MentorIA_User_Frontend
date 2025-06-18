function ModuleAccordionItem({ module, materials = [], index }) {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={`heading-${module.id}`}>
        <button
          className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${module.id}`}
          aria-expanded={index === 0 ? "true" : "false"}
          aria-controls={`collapse-${module.id}`}
        >
          {module.order}. {module.title}
        </button>
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
                  <a href={mat.resourceUrl} target="_blank" rel="noopener noreferrer">
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