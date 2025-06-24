import { useEffect, useState } from "react";
import taskService from "../api/taskService";
import submissionService from "../api/submissionService";
import enrollmentService from "../api/enrollmentService";

export function useTaskDetailData(taskId, courseId, userId, userRole) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userSubmission, setUserSubmission] = useState(null);
  const [enrichedSubmissions, setEnrichedSubmissions] = useState([]);

  const isStudent = userRole === "student";

  const fetchData = async () => {
    setLoading(true);
    try {
      const [taskData, taskSubmissions, enrolledStudents] = await Promise.all([
        taskService.show(taskId),
        submissionService.getByTask(taskId),
        enrollmentService.getStudentsByCourseId(courseId),
      ]);

      setTask(taskData);

      const combined = enrolledStudents.map((student) => {
        const foundSubmission = taskSubmissions.find(
          (s) => s.user?.id === student.userId
        );
        return {
          student,
          submission: foundSubmission ?? null,
        };
      });

      setEnrichedSubmissions(combined);

      if (isStudent) {
        const mySubmission = taskSubmissions.find(
          (s) => s.user?.id === userId
        );
        setUserSubmission(mySubmission ?? null);
      }
    } catch (e) {
      console.error("Error cargando datos:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [taskId, courseId, userId, userRole]);

  return {
    loading,
    task,
    userSubmission,
    enrichedSubmissions,
    refreshSubmissions: fetchData,
    setUserSubmission,
    setEnrichedSubmissions,
  };
}
