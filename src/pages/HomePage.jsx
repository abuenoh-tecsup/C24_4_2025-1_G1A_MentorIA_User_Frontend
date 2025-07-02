import courseService from "../api/courseService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.getAll();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="main-container animate-fade-in">
      {/* Hero Section */}
      <div className="home-hero animate-slide-down">
        <h1>🎓 Plataforma Educativa MentorIA</h1>
        <p className="text-white">Descubre cursos increíbles y expande tu conocimiento con los mejores profesores</p>
      </div>

      {/* Courses Section */}
      <div className="courses-container animate-slide-up">
        <h2 className="courses-title">
          Cursos Disponibles
        </h2>

        {loading ? (
          // Loading State
          <div>
            {[1, 2, 3].map((item) => (
              <div key={item} className="loading-skeleton"></div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          // Empty State
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h3>No hay cursos disponibles</h3>
            <p>Parece que aún no hay cursos en la plataforma. ¡Vuelve pronto para ver las novedades!</p>
          </div>
        ) : (
          // Courses List
          <div className="row">
            {courses.map((course, index) => (
              <div key={course.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div 
                  className="course-card animate-bounce-in hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link to={`/courses/${course.id}`} className="text-decoration-none">
                    <div className="course-id">
                      ID: {course.id}
                    </div>
                    <div className="course-subject">
                      📖 {course.subject?.name || "Sin nombre"}
                    </div>
                    <div className="course-professor">
                      👨‍🏫 {course.professor?.username || "Sin profesor asignado"}
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;