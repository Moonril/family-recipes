import axios from "axios"
import { useState } from "react"

const NewRecipes = function () {

    const APIUrl = 'http://localhost:8080/recipes/new'

    const [inputValues, setInputValues] = useState({}) // what

    /* handling ingredients */

    // state for ingredients
    const [existingIngredients, setExistingIngredients] = useState() // what should i put in here
    // import already existing ingredients con fetch al load
    const fetchExistingIngredients = ()=>{}
    // save in state
    // select reads ingredients and saves new ones

    const newRecipe = () => {
        axios
        .post(APIUrl, inputValues)
        .then((response) => {
            setInputValues({}) //??
            console.log("Recipe saved: ", response.data)
            
        })
        .catch((err) => {
            console.log("Error during saving: ", err)
            
        })
    }

    return (
        <section className="bg-orange-50 min-h-screen flex flex-col p-5 items-center justify-center">
            <h1 className="text-3xl mb-20 font-bold">Aggiungi una nuova ricetta</h1>

            {/* image, title, description, recipeType, ingredients */}

            <form className="w-full max-w-lg" onSubmit={(e)=>{
                e.preventDefault()
                newRecipe()
            }}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-title">
                            Titolo
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-title" type="text" placeholder="Risotto" required value={inputValues.title} onChange={(e)=>{
                            setInputValues({
                                ...inputValues,
                                title: e.target.value,
                            })
                        }} />

                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-ingredients">
                            Ingredienti
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-ingredients" type="text" placeholder="Risotto" required value={inputValues.ingredients} onChange={(e)=>{
                            setInputValues({
                                ...inputValues,
                                ingredients: e.target.value,
                            })
                        }} />

                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-description">
                            Descrizione
                        </label>
                        <textarea name="" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description" placeholder="Tagliare.." required value={inputValues.description} onChange={(e)=>{
                            setInputValues({
                                ...inputValues,
                                description: e.target.value,
                            })
                        }}></textarea>
                    </div>
                </div>
                <div className="flex flex-row justify-center -mx-3 mb-2">
                    
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-type">
                            Tipo
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-type" required value={inputValues.recipeType} onChange={(e)=>{
                            setInputValues({
                                ...inputValues,
                                recipeType: e.target.value,
                            })
                        }}>
                                <option>Primo</option>
                                <option>Secondo</option>
                                <option>Contorno</option>
                                <option>Dolce</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-imgUrl">
                            Foto url
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-imgUrl" type="text" placeholder="risotto.jpg" required value={inputValues.image} onChange={(e)=>{
                            setInputValues({
                                ...inputValues,
                                image: e.target.value,
                            })
                        }} />
                    </div>
                </div>
            </form>


        </section>
    )
}

export default NewRecipes