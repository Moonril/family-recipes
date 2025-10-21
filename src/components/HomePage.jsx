import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import RecipeCard from "./RecipeCard"

const HomePage = function () {

    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    const getRecipes = () => {
        fetch('ricette.json')
        .then((response)=>{
            if(response.ok){
                return response.json()
            } else {
                throw new Error('errrore nella fetch')
            }
        })
        .then(data => {
            setRecipes(data)
            setIsLoading(false)
            console.log(data)
        })
        .catch((error) => {
            console.log('errore', error)
            setIsLoading(false)
            setIsError(true)
        })
    }

    useEffect(()=>{
        getRecipes()
    }, [])

    return (
        <section className="bg-red-200 min-h-screen flex flex-col px-10 items-center justify-center">
            {/* header */}
            {/* <NavBar /> */}
            {/* search */}
            <form action="submit" className="my-10 flex gap-4 text-xl md:text-2xl">
                <input type="text" className="bg-white rounded-md p-2" />
                <button className="bg-amber-100 rounded-2xl py-1 px-4">Cerca</button>
            </form>
            {/* cards */}
            
            <div className="flex flex-col md:flex-row gap-5">
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
                    !isLoading && !isError && recipes.map((recipe) => (
                        <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        />
                    ))
                }


                

            </div>
        </section>
    )
}

export default HomePage