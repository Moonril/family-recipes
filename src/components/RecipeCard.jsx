import { Link } from "react-router-dom"

const RecipeCard = function ({ recipe }) {

    return (
        <section className=" flex flex-col">
            <Link to={'/recipes/' + recipe.id} className="overflow-hidden" >
                <img src={recipe.image} alt="stock-recipe" className="w-xs md:w-xs lg:w-md h-[400px] object-cover bg-red-200 rounded-md transition-transform duration-300 ease-out hover:scale-105" />

            </Link>
            <div className="flex flex-col text-2xl text-center p-8 pt-5">
                <Link className="hover:text-green-500" to={'/recipes/' + recipe.id}>
                    {recipe.title}
                </Link>

            </div>
        </section>
    )
}

export default RecipeCard