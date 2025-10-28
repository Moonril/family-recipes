import { useEffect, useState } from "react"
import RecipeCard from "./RecipeCard"

const HomePage = function () {

    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [search, setSearch] = useState('')


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
            setIsLoading(false)
            setRecipes(data)
            console.log(data)
        })
        .catch((error) => {
            console.log('errore', error)
            setIsLoading(false)
            setIsError(true)
        })
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (search.trim() === "") {
            getRecipes()
        } else {
            const filtered = recipes.filter((recipe) =>
            recipe.title.toLowerCase().includes(search.toLowerCase()) || 
            recipe.ingredients.some((ing) =>
                ing.toLowerCase().includes(search.toLowerCase())
            )
        )
        setRecipes(filtered)
        }
    }

    useEffect(()=>{
        getRecipes()
    }, [])

    return (
        <section className="bg-red-200 min-h-screen flex flex-col p-5 items-center justify-center">

            {/* search */}
            <form className="my-10 flex gap-4 text-md xs:text-lg md:text-2xl" onSubmit={handleSearch}>
                <input type="text" className="bg-white rounded-md p-2 placeholder-gray-500" placeholder={`cerca..`} value={search} onChange={(e) => {
                    setSearch(e.target.value)
                }} />
                <button className="bg-amber-100 rounded-2xl py-1 px-4 hover:bg-amber-300" type="submit">Cerca</button>
            </form>
            {/* cards */}
            
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