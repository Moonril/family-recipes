import { Route, Routes } from 'react-router-dom'
import './App.css' 
import HomePage from './components/HomePage'
import RecipePage from './components/RecipePage'
import NotFound from './components/NotFound'
import NavBar from './components/NavBar'
import Login from './components/Login'
import NewRecipes from './components/NewRecipes'
import EditRecipePage from './components/EditRecipePage'
import IngredientsPage from './components/IngredientsPage'


function App() {


  return (
    <>

      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />}  />
        <Route path='/recipes/:id' element={<RecipePage />}  />
        <Route path='/recipes/:id/edit' element={<EditRecipePage />}  />
        <Route path='*' element={<NotFound />}  />
        <Route path='/login' element={<Login />}  />
        <Route path='/ingredients' element={<IngredientsPage />}  />
        <Route path='/recipes/new' element={<NewRecipes />}  />

      </Routes>

    </>
  )
}

export default App
