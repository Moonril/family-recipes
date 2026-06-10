import { useEffect, useState } from "react"
import RecipeCard from "./RecipeCard"
import axios from "axios"

const HomePage = function () {

    
    const APIUrlGetRecipes = 'http://localhost:8080/recipes'

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
            const sorted = [...data].sort((a,b) => a.title.localeCompare(b.title))
            setRecipes(sorted)
            setIsLoading(false)
            //console.log(data)
        })
        .catch((error) => {
            console.log('errore', error)
            setIsLoading(false)
            setIsError(true)
        })
    }

    /* get real recipes */

    const getRealRecipes = () => {
        axios
        .get(APIUrlGetRecipes)
        .then((response) =>{
            console.log(response.data.content, 'recipe list')

            
            setRecipes(response.data.content)

     
            setIsLoading(false)
                 
        })
        .catch((error) => {
            console.log("errore nel recupero ricette", error)
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

    const filterByType = (type) => {
        
        const filteredByType = recipes.filter(recipe=>recipe.type === type)
        setRecipes(filteredByType)
        
    }

    useEffect(()=>{
        getRecipes()
        //getRealRecipes()
    }, [])

    return (
        <section className="min-h-screen flex flex-col p-5 items-center justify-center">
            
            
            {/* search */}
            <form className="my-10 flex flex-wrap gap-1 sm:gap-4 text-md xs:text-lg" onSubmit={handleSearch}>
                <input type="text" className="bg-white rounded-md p-2 placeholder-gray-500" placeholder={`cerca..`} value={search} onChange={(e) => {
                    setSearch(e.target.value)
                }} />
                <button className="bg-[#ffe1d1] rounded-md py-1 px-4 hover:bg-[#fcd9c6] cursor-pointer" type="submit">Cerca</button>
                <button className="bg-[#ffe1d1] rounded-4xl py-1 px-4 hover:bg-[#fc5d57] cursor-pointer" onClick={()=>getRecipes()}>X</button>
            </form>
            {/* tags */}
            <div className="flex flex-wrap items-center gap-5 mb-10">
                <button className=" bg-[#ffbbd6] rounded-sm py-1 px-3 hover:bg-[#ffa8cb] cursor-pointer" onClick={()=>filterByType('primo')}>Primi</button>
                <button className=" bg-[#ffbbd6] rounded-sm py-1 px-3 hover:bg-[#ffa8cb] cursor-pointer" onClick={()=>filterByType('secondo')}>Secondi</button>
                <button className=" bg-[#ffbbd6] rounded-sm py-1 px-3 hover:bg-[#ffa8cb] cursor-pointer" onClick={()=>filterByType('contorno')}>Contorni</button>
                <button className=" bg-[#ffbbd6] rounded-sm py-1 px-3 hover:bg-[#ffa8cb] cursor-pointer" onClick={()=>filterByType('dolce')}>Dolci</button>
            </div>
            {/* cards */}
            
            <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-5">
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