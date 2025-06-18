import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'
import CoursePage from './pages/CoursePage'
import ModulePage from './pages/ModulePage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path="home" element={<HomePage/>}/>
        <Route path="courses/:id" element={<CoursePage/>}/>
        <Route path="courses/:id/modules" element={<ModulePage/>}/>
      </Route>
    </Routes>
  )
}

export default App
