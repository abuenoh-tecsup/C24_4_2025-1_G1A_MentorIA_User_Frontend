import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import CoursePage from './pages/CoursePage'
import ModulePage from './pages/ModulePage'
import ModuleFormPage from './pages/ModuleFormPage'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path="home" element={<HomePage/>}/>
        <Route path="courses/:courseId" element={<CoursePage/>}/>
        <Route path="courses/:courseId/modules" element={<ModulePage/>}/>
        <Route path="/courses/:courseId/modules/form" element={<ModuleFormPage />} />
      </Route>
    </Routes>
  )
}

export default App
