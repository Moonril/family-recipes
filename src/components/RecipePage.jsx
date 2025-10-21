const RecipePage = function () {
    return (
        <section className="bg-red-200 min-h-screen flex flex-row p-20 gap-5">
            <img src="stock-recipe.jpg" alt="stock-recipe" className="w-md" />
            <div className="flex flex-col gap-3">
                <h1 className="text-3xl font-bold">Titolo</h1>
                <h4 className="text-xl">ingredienti</h4>
                <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet tempora quibusdam ullam, incidunt delectus praesentium corporis ea modi, minus tempore perferendis quas aliquid sit. Velit sapiente rerum quaerat harum dolorum?</p>
            </div>
        </section>
    )
}

export default RecipePage