const RecipeCard = function ({ recipe }) {

    return (
        <section className="bg-red-200 flex flex-col relative">
            <img src="stock-recipe.jpg" alt="stock-recipe" className="w-sm" />
            <h1 className="text-3xl font-bold absolute bottom-[-10px] left-1/3 bg-amber-900 py-1 px-5 text-white">{recipe.title}</h1>
        </section>
    )
}

export default RecipeCard