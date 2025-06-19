import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import materialService from "../api/materialService";
import CourseSidebar from "../components/CourseSidebar";
import AddDropdown from "../components/AddDropdown"; // O uno especializado
import ResourceList from "../components/ResourceList";

function MaterialPage() {
  const { courseId } = useParams();
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    materialService.getAll().then((data) => {
      const filtered = data.filter(
        (mat) => mat.module.course.id === Number(courseId)
      );
      setMaterials(filtered);
    });
  }, [courseId]);

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId} />
        <section className="col-md-10 p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">Materiales del Curso</h2>
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
