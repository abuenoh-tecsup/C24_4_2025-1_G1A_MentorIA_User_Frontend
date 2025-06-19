import { useEffect, useState } from "react";
import moduleService from "../api/moduleService";
import materialService from "../api/materialService";
import evaluationService from "../api/evaluationService";
import forumService from "../api/forumService";
import taskService from "../api/taskService";
import ModuleAccordionItem from "./ModuleAccordionItem";

function ModuleAccordionList({ courseId }) {
  const [modules, setModules] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [forums, setForums] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allModules = await moduleService.getAll();
        const courseModules = allModules
          .filter((mod) => mod.course.id === parseInt(courseId))
          .sort((a, b) => a.moduleOrder - b.moduleOrder);

        const [allMaterials, allEvaluations, allForums, allTasks] =
          await Promise.all([
            materialService.getAll(),
            evaluationService.getAll(),
            forumService.getAll(),
            taskService.getAll(),
          ]);

        setModules(courseModules);
        setMaterials(allMaterials);
        setEvaluations(allEvaluations);
        setForums(allForums);
        setTasks(allTasks);
      } catch (error) {
        console.error("Error al cargar datos del curso", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  if (loading) return <p>Cargando módulos...</p>;

  if (modules.length === 0) {
    return <p>No hay módulos disponibles para este curso.</p>;
  }

  return (
    <div className="accordion" id="modulesAccordion">
      {modules.map((mod, index) => {
        const modMaterials = materials.filter((m) => m.module.id === mod.id);
        const modEvaluations = evaluations.filter((e) => e.module.id === mod.id);
        const modForums = forums.filter((f) => f.module.id === mod.id);
        const modTasks = tasks.filter((t) => t.module.id === mod.id);

        return (
          <ModuleAccordionItem
            key={mod.id}
            index={index}
            course={courseId}
            module={mod}
            materials={modMaterials}
            evaluations={modEvaluations}
            forums={modForums}
            tasks={modTasks}
          />
        );
      })}
    </div>
  );
}

export default ModuleAccordionList;
