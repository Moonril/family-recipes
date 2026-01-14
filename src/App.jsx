import { Route, Routes } from 'react-router-dom'
import './App.css' 
import HomePage from './components/HomePage'
import RecipePage from './components/RecipePage'
import NotFound from './components/NotFound'
import NavBar from './components/NavBar'
import Login from './components/Login'
import NewRecipes from './components/NewRecipes'


function App() {


  return (
    <>

      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />}  />
        <Route path='/recipe/:id' element={<RecipePage />}  />
        <Route path='*' element={<NotFound />}  />
        <Route path='/login' element={<Login />}  />
        <Route path='/newRecipes' element={<NewRecipes />}  />

      </Routes>

    </>
  )
}

export default App
