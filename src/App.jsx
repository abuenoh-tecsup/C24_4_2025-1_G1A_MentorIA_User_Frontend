import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import ModulePage from "./pages/ModulePage";
import ModuleFormPage from "./pages/ModuleFormPage";
import MaterialPage from "./pages/MaterialPage";
import TaskPage from "./pages/TaskPage";
import EvaluationPage from "./pages/EvaluationPage";
import ForumPage from "./pages/ForumPage";
import MaterialFormPage from "./pages/MaterialFormPage";
import EvaluationFormPage from "./pages/EvaluationFormPage";
import ForumFormPage from "./pages/ForumFormPage";
import TaskFormPage from "./pages/TaskFormPage";
import MaterialDetailPage from "./pages/MaterialDetailPage";
import EvaluationDetailPage from "./pages/EvaluationDetailPage";
import ForumDetailPage from "./pages/ForumDetailPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import SubmissionDetailPage from "./pages/SubmissionDetailPage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./utils/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RequireAuth/>}>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="submissions/:submissionId" element={<SubmissionDetailPage />} />
          <Route path="courses/:courseId" element={<CoursePage />} />
          <Route path="courses/:courseId/modules">
            <Route index element={<ModulePage />} />
            <Route path="form" element={<ModuleFormPage />} />
          </Route>
          <Route path="courses/:courseId/materials">
            <Route index element={<MaterialPage />} />
            <Route path="form" element={<MaterialFormPage />} />
            <Route path=":materialId" element={<MaterialDetailPage />} />
          </Route>
          <Route path="courses/:courseId/tasks">
            <Route index element={<TaskPage />} />
            <Route path="form" element={<TaskFormPage />} />
            <Route path=":taskId" element={<TaskDetailPage />} />
          </Route>
          <Route path="courses/:courseId/evaluations">
            <Route index element={<EvaluationPage />} />
            <Route path="form" element={<EvaluationFormPage />} />
            <Route path=":evaluationId" element={<EvaluationDetailPage />} />
          </Route>
          <Route path="courses/:courseId/forums">
            <Route index element={<ForumPage />} />
            <Route path="form" element={<ForumFormPage />} />
            <Route path=":forumId" element={<ForumDetailPage />} />
          </Route>
      </Route>
      </Route>
    </Routes>
  );
}

export default App;
