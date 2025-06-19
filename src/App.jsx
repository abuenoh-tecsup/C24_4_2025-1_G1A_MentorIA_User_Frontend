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
      </Route>
    </Routes>
  )
}

export default App
