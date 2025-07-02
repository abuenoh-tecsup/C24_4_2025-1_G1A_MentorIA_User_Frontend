import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import materialService from "../api/materialService";
import courseService from "../api/courseService";
import CourseSidebar from "../components/CourseSidebar";
import AddDropdown from "../components/AddDropdown";
import ResourceList from "../components/ResourceList";
import Breadcrumb from "../components/Breadcrumb";

function MaterialPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    materialService.getAll().then((data) => {
      const filtered = data.filter(
        (mat) => mat.module.course.id === Number(courseId)
      );
      setMaterials(filtered);
    });
    courseService.show(courseId).then((data)=>{setCourse(data)});
  }, [courseId]);

  if (!course) return <p>Cargando curso...</p>;

  const breadcrumbItems = [
    { name: course.subject.name, href: `/courses/${courseId}` },
    { name: "Materiales", href: `/courses/${courseId}/materials` }
  ];

  return (
    <div className="container-fluid h-100">
      <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      <div className="row">
        <CourseSidebar courseId={courseId} />
        <section className="col-md-9 p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">
              <i className="bi bi-paperclip pe-2"></i>
              Materiales del Curso
            </h2>
            <AddDropdown courseId={courseId} />
          </div>

          <ResourceList
            items={materials}
            courseId={courseId}
            resourceType="material"
          />
        </section>
      </div>
    </div>
  );
}

export default MaterialPage;
