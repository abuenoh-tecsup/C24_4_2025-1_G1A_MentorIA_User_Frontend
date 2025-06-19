import ResourceItem from "./ResourceItem";

function ResourceList({ items = [], courseId, resourceType }) {
  if (items.length === 0) {
    return <p className="text-muted">No hay elementos disponibles.</p>;
  }

  return (
    <div>
      {items.map((item) => (
        <ResourceItem
          key={item.id}
          resource={item}
          type={resourceType}
          editPath={`/courses/${courseId}/${resourceType}s/form?${resourceType}Id=${item.id}`}
          detailPath={`/courses/${courseId}/${resourceType}s/${item.id}`}
        />
      ))}
    </div>
  );
}

export default ResourceList;
