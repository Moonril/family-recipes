import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import CreatableSelect from 'react-select/creatable';
import Swal from "sweetalert2";

const EditRecipePage = function () {



    const { id } = useParams()
    //const APIUrlGetRecipeToEdit = `http://localhost:8080/recipes/${id}`
    const APIUrlGetRecipeToEdit = `http://localhost:8080/recipes/106`
    const APIUrlGetIngredients = 'http://localhost:8080/ingredients'


    
    const token = localStorage.getItem("token")

    const [inputValues, setInputValues] = useState({
        recipeType: "",
        title: "",
        description: "",
        image: "",
    })
    // state for ingredients
    const [existingIngredients, setExistingIngredients] = useState([]) 
    const [selectedIngredients, setSelectedIngredients] = useState([]) 
    

    /* get ingredients from database */

    const getExistingIngredients = () => {
        axios
        .get(APIUrlGetIngredients, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then((response) =>{
            //console.log(response.data.content, 'ingredients list')
            const formattedIngredients = response.data.content.map(ing => ({
                value: ing.name,
                label: ing.name
            }))
            setExistingIngredients(formattedIngredients)
           
            
            
        })
        .catch((error) => {
            console.log("errore nel recupero ingredienti", error)
            
        })
    }

    // get recipe from url
    const getRecipeToModify = () => {
        axios
        .get(APIUrlGetRecipeToEdit)
        .then((response) => {
            //console.log(response.data, 'recipe')
            setInputValues(response.data)
        })
        .catch((error) => {
            console.log("errore nel recupero ricetta", error)
            
        })
    }
    

    
    

    
    /* save modified recipe */
    
    const saveEditedRecipe = () => {

        const payload = {
            ...inputValues,
            ingredients: selectedIngredients.map(ing => ing.value)
        }


        axios
        .put(APIUrlGetRecipeToEdit, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            console.log("Recipe saved: ", response.data)
            Swal.fire({
                title: 'Ricetta modificata!',
                icon: 'success',
                confirmButtonText: 'OK',
            })
            
        })
        .catch((err) => {
            console.log("Error during saving: ", err)
            Swal.fire({
                title: 'Errore nella richiesta',
                text: 'Qualcosa è andato storto.',
                icon: 'error',
                confirmButtonText: 'Riprova',
            })
            
        })
    }

    /* delete recipe */


    const deleteRecipe = () => {

        axios
        .delete(APIUrlGetRecipeToEdit, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log("Recipe deleted: ", response.data)
            Swal.fire({
                title: 'Ricetta eliminata con successo!',
                icon: 'success',
                confirmButtonText: 'OK',
            })
            
        })
        .catch((err) => {
            console.log("Error during deletion: ", err)
            Swal.fire({
                title: 'Errore nella richiesta',
                text: 'Qualcosa è andato storto.',
                icon: 'error',
                confirmButtonText: 'Riprova',
            })
            
        })
    }

    const handleDeleteRecipe = () => {
        Swal.fire({
            title: 'Vuoi veramente eliminare questa ricetta permanentemente?',
            icon: 'warning',
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: 'Indietro' ,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRecipe()
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    
    useEffect(()=>{
        getExistingIngredients()
        getRecipeToModify()
    }, [id])


    
    return (
        <section className="bg-orange-50 min-h-screen flex flex-col p-5 items-center justify-center">
            <h1 className="text-3xl mb-20 font-bold">Modifica</h1>



            <form className="w-full max-w-lg" onSubmit={(e)=>{
                e.preventDefault()
                saveEditedRecipe()
            }}>
                {/* title */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
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

                {/* ingredients */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-ingredients">
                            Ingredienti
                        </label>
                        <CreatableSelect isMulti id="grid-ingredients" options={existingIngredients} value={selectedIngredients} onChange={(selected) => {
                            setSelectedIngredients(selected || [])
                        }} />

                    </div>
                </div>

                {/* description */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-description">
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

                {/* type + foto */}
                <div className="flex flex-row justify-center -mx-3 mb-2">
                    
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-type">
                            Tipo
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-type" required value={inputValues.recipeType} onChange={(e)=>{
                                setInputValues({
                                    ...inputValues,
                                    recipeType: e.target.value,
                                })                           
                            }}>
                                <option value="" disabled>
                                    Tipo
                                </option>
                                <option value={'PRIMO'}>Primo</option>
                                <option value={'SECONDO'}>Secondo</option>
                                <option value={'CONTORNO'}>Contorno</option>
                                <option value={'DOLCE'}>Dolce</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-imgUrl">
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

                {/* submit */}
                <div className="flex flex-row justify-center -mx-3 mb-2 pt-3">
                        <button type="submit" className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 me-2">Salva ricetta</button>
                        {/* delete */}
                </div>
                
            </form>
                        <button onClick={handleDeleteRecipe} className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800">Elimina Ricetta</button>


        </section>
    )
}

export default EditRecipePage