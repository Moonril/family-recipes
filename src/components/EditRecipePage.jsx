import axios from "axios"
import { useEffect, useState } from "react"
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import Swal from "sweetalert2";

const EditRecipePage = function () {

    const APIUrlNewRecipe = 'http://localhost:8080/recipes/new'
    const APIUrlGetIngredients = 'http://localhost:8080/ingredients'
    
    const token = localStorage.getItem("token")

    


    const [inputValues, setInputValues] = useState({
        recipeType: "",
    })


    /* handling ingredients */

    // state for ingredients
    const [existingIngredients, setExistingIngredients] = useState([]) 
    const [selectedIngredients, setSelectedIngredients] = useState([])  // to send with the new recipe
    // import already existing ingredients con fetch al load    

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
            console.log(response.data.content, 'ingredients list')
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

    
    /* save recipe */
    
    const saveNewRecipe = () => {

        const payload = {
            ...inputValues,
            ingredients: selectedIngredients.map(ing => ing.value)
        }


        axios
        .post(APIUrlNewRecipe, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            console.log("Recipe saved: ", response.data)
            Swal.fire({
                title: 'Ricetta salvata!',
                icon: 'success',
                confirmButtonText: 'OK',
            })
            
        })
        .catch((err) => {
            console.log("Error during saving: ", err)
            Swal.fire({
                title: 'Errore nella richiesta',
                text: 'Controlla che la ricetta non esista già.',
                icon: 'error',
                confirmButtonText: 'Riprova',
            })
            
        })
    }
    

    useEffect(()=>{
            fetch("/ricette.json")
        .then((response)=>{
            if(response.ok){
                return response.json()
            } else {
                throw new Error('errrore nella fetch')
            }
        })
        .then(data => {

            setIsLoading(false)
            const found = data.find(r => r.id === Number(id))
            setRecipe(found)

            // console.log('porcocaneee', data)
            // console.log('porcocaneee2', found)
            // console.log('porcocaneee3', id)
        })
        .catch((error) => {
            console.log('errore', error)
            setIsLoading(false)
            setIsError(true)
        })
        }, [])
    
    return (
        <section className="bg-orange-50 min-h-screen flex flex-col p-5 items-center justify-center">
            <h1 className="text-3xl mb-20 font-bold">Aggiungi una nuova ricetta</h1>



            <form className="w-full max-w-lg" onSubmit={(e)=>{
                e.preventDefault()
                saveNewRecipe()
            }}>
                {/* title */}
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

                {/* ingredients */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-ingredients">
                            Ingredienti
                        </label>
                        


                        {/* <Select  closeMenuOnSelect={false} components={animatedComponents} isMulti options={options}></Select> */}
                        <CreatableSelect isMulti options={existingIngredients} value={selectedIngredients} onChange={(selected) => {
                            setSelectedIngredients(selected || [])
                        }} />


                    </div>
                </div>

                {/* description */}
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

                {/* type + foto */}
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

                {/* submit */}
                <div className="flex flex-row justify-center -mx-3 mb-2 pt-3">
                        <button type="submit" className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Salva ricetta</button>
                </div>
                
            </form>


        </section>
    )
}

export default EditRecipePage