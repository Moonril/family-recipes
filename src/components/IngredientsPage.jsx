import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const IngredientsPage = function () {

    const APIUrlGetIngredients = 'http://localhost:8080/ingredients'

    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    // state for ingredients
    const [existingIngredients, setExistingIngredients] = useState([])
    const [newIngredient, setNewIngredient] = useState("")
    const token = localStorage.getItem("token")

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

            const sorted = response.data.content
                .slice() 
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(ing => ({
                id: ing.id,
                name: ing.name,
            }))
            setExistingIngredients(sorted)
     
            setIsLoading(false)
                 
        })
        .catch((error) => {
            console.log("errore nel recupero ingredienti", error)
            setIsLoading(false)
            setIsError(true)
            
        })
    }

    
    /* save new ingredient */

    const saveNewIngredient = (ingredientName) => {

        const payload = {
            name: ingredientName
        }

        axios
        .post(APIUrlGetIngredients, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            console.log("Ingredient saved: ", response.data)
            Swal.fire({
                title: 'Ingrediente salvato!',
                icon: 'success',
                confirmButtonText: 'OK',
            })
            
        })
        .then(() => {
            getExistingIngredients()
        })
        .catch((err) => {
            console.log("Error during saving: ", err)
            Swal.fire({
                title: 'Errore nella richiesta',
                text: `Controlla che l'ingrediente non esista già.`,
                icon: 'error',
                confirmButtonText: 'Riprova',
            })
            
        })
    }

    /* handle new button */

    const handleNewIngredient = () => {
        Swal.fire({
            title: 'Aggiungi un nuovo ingrediente',
            icon: 'info',
            input: "text",
            showCancelButton: true,
            cancelButtonText: 'Indietro' ,
            confirmButtonText: 'Salva',
            inputValidator: (value) => {
                if (!value) {
                    return "Devi inserire un nome"
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                saveNewIngredient(result.value)
            }
        })
    }


    /* modify existing ingredient */

    const saveEditedIngredient = (ingredient) => {

        const payload = {
            id: ingredient.id, //add correct payload
            name: ingredient.name //add correct payload
        }


        axios
        .put(APIUrlGetIngredients, payload, {  // add id ingredient
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then((response) => {
            console.log("Ingredient saved: ", response.data)
            Swal.fire({
                title: 'Ingrediente modificato!',
                icon: 'success',
                confirmButtonText: 'OK',
            })
            
        })
        .then(() => {
            getExistingIngredients()
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

    /* delete existing ingredient */

    const deleteIngredient = (ingredientId) => {

        axios
        .delete(`${APIUrlGetIngredients}/${ingredientId}`, {  // add id ingredient
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log("Ingredient deleted: ", ingredientId)
            Swal.fire({
                title: 'Ingredient eliminato con successo!',
                icon: 'success',
                confirmButtonText: 'OK',
            })
            
        })
        .then(() => {
            getExistingIngredients()
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


    /* handling click on ingredient */


    const handleExistingIngredient = (ingredient) => {
        Swal.fire({
            title: 'Modifica',
            icon: 'info',
            input: "text", // aggiungere l'ingrediente come value
            inputValue: ingredient.name,
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: 'Indietro',
            confirmButtonText: 'Modifica',
            denyButtonText: 'Elimina',          
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
            inputValidator: (value) => {
                if (!value) {
                    return "Devi inserire un nome"
                }
            },
        }).then((result) => {
                    if (result.isConfirmed) {
                        // putfetch modify here
                        //saveEditedIngredient()
                        console.log(result.value, 'updated ingredient');
                        
                    } else if (result.isDenied) {
                        // posso concatenare un altro swal + deletefetch?
                        Swal.fire({
                            title: 'Vuoi veramente eliminare questo ingrediente permanentemente?',
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
                                        console.log(ingredient.id, 'ingredient id');
                                        
                                        deleteIngredient(ingredient.id) 
                                    } else if (result.isDenied) {
                                        Swal.fire('Changes are not saved', '', 'info')
                                    }
                                })
                    }
                })
    }



    useEffect(()=>{
                getExistingIngredients()
            }, [])

    return (
        <section className="bg-orange-50 min-h-screen flex flex-col p-5 items-center justify-center">
            <h1 className="text-3xl mb-20 font-bold">Gestione ingredienti</h1>
            
            <div className="flex flex-col md:flex-row md:flex-wrap items-center gap-5">
                {/* LOADING */}

                {
                    isLoading === true && (
                        <div className="text-center">
                            <p>Loading...</p>
                        </div>
                    )
                }

                {/* ERROR */}
                {
                    isError && (
                        <p>
                            Qualcosa è andato storto, 
                            <button className="cursor-pointer underline hover:text-blue-500 ms-2" onClick={() => window.location.reload(false)}>Ricarica!</button>
                        </p>
                    )
                }
                {
                    !isLoading && !isError && existingIngredients.map((ingredient) => (
                        <p onClick={() => handleExistingIngredient(ingredient)} className="bg-red-300 px-3 py-1 rounded-2xl cursor-pointer" key={ingredient.id}>{ingredient.name}</p>  //todo order alphabetically
                    ))
                }
                 <p onClick={handleNewIngredient} className="bg-blue-300 px-3 py-1 rounded-2xl cursor-pointer" >+</p>
            </div>
        </section>

    )
}

export default IngredientsPage