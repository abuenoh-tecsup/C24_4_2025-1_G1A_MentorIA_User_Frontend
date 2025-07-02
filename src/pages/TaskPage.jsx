import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import taskService from "../api/taskService";
import CourseSidebar from "../components/CourseSidebar";
import AddDropdown from "../components/AddDropdown";
import ResourceList from "../components/ResourceList";

function TaskPage() {
  const { courseId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    taskService.getAll().then((data) => {
      const filtered = data.filter(
        (task) => task.module.course.id === Number(courseId)
      );
      setTasks(filtered);
    });
  }, [courseId]);

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <CourseSidebar courseId={courseId} />
        <section className="col-md-9 p-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">
              <i class="bi bi-pencil-square pe-2"></i>
              Tareas del Curso
            </h2>
            <AddDropdown courseId={courseId} />
          </div>

          <ResourceList items={tasks} courseId={courseId} resourceType="task" />
        </section>
      </div>
    </div>
  );
}

export default TaskPage;
