import { Link } from "react-router-dom"

const RecipeCard = function ({ recipe }) {

    return (
        <section className="bg-red-200 flex flex-col relative">
            <Link to={'/recipe/' + recipe.id}>
                <img src={recipe.image} alt="stock-recipe" className="w-sm object.cover" />
                <h1 className="text-3xl font-bold absolute bottom-[-10px] left-1/3 bg-amber-900 py-1 px-5 text-white">{recipe.title}</h1>
            </Link>
        </section>
    )
}

export default RecipeCard