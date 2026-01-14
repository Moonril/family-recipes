import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const RecipePage = function () {
    
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    
    

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

            console.log('porcocaneee', data)
            console.log('porcocaneee2', found)
            console.log('porcocaneee3', id)
        })
        .catch((error) => {
            console.log('errore', error)
            setIsLoading(false)
            setIsError(true)
        })
    }, [id])

    
    

    return (
        <section className="bg-[#EDEEE9] bg-orange-50 min-h-screen flex flex-col md:flex-row p-5 md:p-10 lg:p-20 gap-5">
            <Link to={'/'} className="text-2xl text-gray-900">&larr; <span className="hover:text-red-500 hover:underline">Indietro</span></Link>
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
                    !isLoading && !isError &&  recipe && (
                        <div className="flex flex-col xl:flex-row gap-5">
                            <img src={`/${recipe.image}`} alt="stock-recipe" className="w-full h-[200px] md:h-[300px] xl:w-md xl:h-full object-cover" />

                            <div className="flex flex-col gap-3">
                                <h1 className="text-3xl font-bold bg-[#82bd35ef]">{recipe.title}</h1>
                                <h4 className="text-2xl underline decoration-[#842B2F]">Ingredienti:</h4>
                                <h4 className="text-xl xl:w-xl">{recipe.ingredients.join(', ')}.</h4>
                                <p className="text-justify text-xl xl:w-xl mt-6">{recipe.description}</p>
                            </div>
                        </div>
                        
                    )
                }
        </section>
    )
}

export default RecipePage