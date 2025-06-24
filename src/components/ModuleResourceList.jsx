import { Link } from "react-router-dom";

function ModuleResourceList({ title, items, route, courseId }) {
  if (!items || items.length === 0) return null;

  return (
    <>
      <h6>{title}</h6>
      <ul className="list-group mb-3">
        {items.map((item) => (
          <li key={item.id} className="list-group-item">
            <Link
              to={`/courses/${courseId}/${route}/${item.id}`}
              className="text-decoration-none"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ModuleResourceList;
