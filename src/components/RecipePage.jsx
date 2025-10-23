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
        <section className="bg-red-200 min-h-screen flex flex-col md:flex-row p-10 lg:p-20 gap-5">
            <Link to={'/'} className="text-2xl text-gray-900 hover:text-red-500 hover:underline">&larr; Indietro</Link>
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
                        <div className="flex flex-col lg:flex-row gap-5">
                            <img src={`/${recipe.image}`} alt="stock-recipe" className="w-full h-[200px] md:h-[300px] lg:w-md lg:h-full object-cover" />

                            <div className="flex flex-col gap-3">
                                <h1 className="text-3xl font-bold">{recipe.title}</h1>
                                <h4 className="text-xl">{recipe.ingredients.join(', ')}</h4>
                                <p className="text-xl">{recipe.description}</p>
                            </div>
                        </div>
                        
                    )
                }
        </section>
    )
}

export default RecipePage