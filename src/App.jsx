import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/HomePage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path="home" element={<HomePage/>}/>
      </Route>
    </Routes>
  )
}

export default App
