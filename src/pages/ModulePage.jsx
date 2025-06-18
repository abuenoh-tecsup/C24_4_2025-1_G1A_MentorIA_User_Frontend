import courseService from "../api/courseService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseSidebar from "../components/CourseSidebar";
import ModuleAccordionList from "../components/ModuleAccordionList";
import AddDropdown from "../components/AddDropdown";

function ModulePage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const courseData = await courseService.show(id);
      setCourse(courseData);
    };

    fetchData();
  }, [id]);

  if (!course) return <p>Cargando curso...</p>;

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar />
        <section className="col-md-10 p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">Módulos del Curso</h2>
            <AddDropdown />
          </div>

          <ModuleAccordionList courseId={id} />
        </section>
      </div>
    </div>
  );
}

export default ModulePage;
