import courseService from "../api/courseService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseSidebar from "../components/CourseSidebar";
import ModuleAccordionList from "../components/ModuleAccordionList";
import AddDropdown from "../components/AddDropdown";
import Breadcrumb from "../components/Breadcrumb";

function ModulePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const courseData = await courseService.show(courseId);
      setCourse(courseData);
    };

    fetchData();
  }, [courseId]);

  if (!course) return <p>Cargando curso...</p>;

  const breadcrumbItems = [
    { name: course.subject.name, href: `/courses/${courseId}` },
    { name: "Módulos", href: `/courses/${courseId}/modules` }
  ];

  return (
    <div className="container-fluid h-100">
      <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      <div className="row">
        <CourseSidebar courseId={courseId} />
        <section className="col-md-9 p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">
              <i className="bi bi-bookmark-fill pe-1"></i>
              Módulos del Curso
            </h2>
            <AddDropdown courseId={courseId} />
          </div>

          <ModuleAccordionList courseId={courseId} />
        </section>
      </div>
    </div>
  );
}

export default ModulePage;
