import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import CoursePage from './pages/CoursePage'
import ModulePage from './pages/ModulePage'
import ModuleFormPage from './pages/ModuleFormPage'
import MaterialPage from './pages/MaterialPage'
import TaskPage from './pages/TaskPage'
import EvaluationPage from './pages/EvaluationPage'
import ForumPage from './pages/ForumPage'
import MaterialFormPage from './pages/MaterialFormPage'
import EvaluationFormPage from './pages/EvaluationFormPage'
import ForumFormPage from './pages/ForumFormPage'
import TaskFormPage from './pages/TaskFormPage'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path="home" element={<HomePage/>}/>

        <Route path="courses/:courseId" element={<CoursePage/>}/>
        <Route path="courses/:courseId/modules" element={<ModulePage/>}/>
        <Route path="courses/:courseId/materials" element={<MaterialPage/>}/>
        <Route path="courses/:courseId/tasks" element={<TaskPage/>}/>
        <Route path="courses/:courseId/evaluations" element={<EvaluationPage/>}/>
        <Route path="courses/:courseId/forums" element={<ForumPage/>}/>

        <Route path="/courses/:courseId/modules/form" element={<ModuleFormPage />} />
        <Route path="/courses/:courseId/materials/form" element={<MaterialFormPage/>} />
        <Route path="/courses/:courseId/evaluations/form" element={<EvaluationFormPage/>} />
        <Route path="/courses/:courseId/forums/form" element={<ForumFormPage/>} />
        <Route path="/courses/:courseId/tasks/form" element={<TaskFormPage/>} />
      </Route>
    </Routes>
  )
}

export default App
