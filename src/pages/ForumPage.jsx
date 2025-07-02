import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import forumService from "../api/forumService";
import courseService from "../api/courseService";
import CourseSidebar from "../components/CourseSidebar";
import AddDropdown from "../components/AddDropdown";
import ResourceList from "../components/ResourceList";
import Breadcrumb from "../components/Breadcrumb";

function ForumPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [forums, setForums] = useState([]);

  useEffect(() => {
    forumService.getAll().then((data) => {
      const filtered = data.filter(
        (forum) => forum.module.course.id === Number(courseId)
      );
      setForums(filtered);
      courseService.show(courseId).then((data)=>{setCourse(data)});
    });
  }, [courseId]);

  if (!forums) return <p className="p-3">Cargando foros...</p>;

  const breadcrumbItems = [
    {
      name: course?.subject?.name,
      href: `/courses/${courseId}`,
    },
    {
      name: "Foros",
      href: `/courses/${courseId}/forums`,
    },
  ];

  return (
    <div className="container-fluid h-100">
      <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      <div className="row">
        <CourseSidebar courseId={courseId} />
        <section className="col-md-9 p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">
              <i className="bi bi-chat-fill pe-2"></i>
              Foros del Curso
            </h2>
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
