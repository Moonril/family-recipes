import { Route, Routes } from 'react-router-dom'
import './App.css' 
import HomePage from './components/HomePage'
import RecipePage from './components/RecipePage'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />}  />
        <Route path='/recipes/:id' element={<RecipePage />}  />

      </Routes>
    </>
  )
}

export default App
