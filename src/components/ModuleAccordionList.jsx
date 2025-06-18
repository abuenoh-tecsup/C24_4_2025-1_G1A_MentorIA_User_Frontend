import { useEffect, useState } from "react";
import moduleService from "../api/moduleService";
import materialService from "../api/materialService";
import ModuleAccordionItem from "./ModuleAccordionItem";

function ModuleAccordionList({ courseId }) {
  const [modules, setModules] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModulesAndMaterials = async () => {
      try {
        const allModules = await moduleService.getAll();
        const courseModules = allModules.filter(
          (mod) => mod.course.id === parseInt(courseId)
        );

        const allMaterials = await materialService.getAll();

        setModules(courseModules);
        setMaterials(allMaterials);
      } catch (error) {
        console.error("Error al cargar módulos o materiales", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModulesAndMaterials();
  }, [courseId]);

  if (loading) return <p>Cargando módulos...</p>;

  if (modules.length === 0) {
    return <p>No hay módulos disponibles para este curso.</p>;
  }

  return (
    <div className="accordion" id="modulesAccordion">
      {modules.map((mod, index) => (
        <ModuleAccordionItem
          key={mod.id}
          module={mod}
          materials={materials.filter((mat) => mat.module.id === mod.id)}
          index={index}
        />
      ))}
    </div>
  );
}

export default ModuleAccordionList;
