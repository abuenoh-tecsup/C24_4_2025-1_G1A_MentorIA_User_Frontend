import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import forumService from "../api/forumService";
import CourseSidebar from "../components/CourseSidebar";
import AddDropdown from "../components/AddDropdown";
import ResourceList from "../components/ResourceList";

function ForumPage() {
  const { courseId } = useParams();
  const [forums, setForums] = useState([]);

  useEffect(() => {
    forumService.getAll().then((data) => {
      const filtered = data.filter(
        (forum) => forum.module.course.id === Number(courseId)
      );
      setForums(filtered);
    });
  }, [courseId]);

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId} />
        <section className="col-md-10 p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">Foros del Curso</h2>
            <AddDropdown courseId={courseId} />
          </div>

          <ResourceList
            items={forums}
            courseId={courseId}
            resourceType="forum"
          />
        </section>
      </div>
    </div>
  );
}

export default ForumPage;
