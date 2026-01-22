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
            console.log(response.data.content, 'ingredients list')

            setExistingIngredients(response.data.content)
            setIsLoading(false)
           
            
            
        })
        .catch((error) => {
            console.log("errore nel recupero ingredienti", error)
            setIsLoading(false)
            setIsError(true)
            
        })
    }

    
    /* save new ingredient */
    /* modify existing ingredient */
    /* delete existing ingredient */


    /* handling click on ingredient */

    // click -> swal text
    // input + tasto modifica
    // sotto input tasto delete

    const handleIngredient = () => {
        Swal.fire({
            title: 'Modifica',
            icon: 'info',
            input: "text", // aggiungere l'ingrediente come value
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: 'Indietro' ,
            confirmButtonText: 'Modifica',
            denyButtonText: 'Elimina',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then((result) => {
                    if (result.isConfirmed) {
                        // putfetch here
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
                                        deleteIngredient() //deletefetcg here
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

            {/* add save ingredient fetch here */}
            <p className="bg-red-300 px-3 py-1 rounded-2xl cursor-pointer" >+</p>
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
                            Errore nella fetch
                        </p>
                    )
                }
                {
                    !isLoading && !isError && existingIngredients.map((ingredient) => (
                        <p onClick={handleIngredient} className="bg-red-300 px-3 py-1 rounded-2xl cursor-pointer" key={ingredient.id}>{ingredient.name}</p>
                    ))
                }
            </div>
        </section>

    )
}

export default IngredientsPage