import { Link } from "react-router-dom"

const NavBar = function () {
    return (
        <section className="bg-[#EDEEE9] flex flex-row justify-end items-center gap-2 p-4">

            <p>Ciao, ciccio</p> {/* todo if login or logout */}

            <Link to={"/login"} className="bg-[#ECD0C2] rounded-2xl py-1 px-4 hover:bg-[#e0ac92] cursor-pointer">prova</Link> {/* todo if login or logout */}


        </section>
    )
}

export default NavBar