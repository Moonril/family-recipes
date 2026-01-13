import { Link, useLocation } from "react-router-dom"

const NavBar = function () {

    const location = useLocation()


    return (
        <section className="bg-[#EDEEE9] flex flex-row justify-between items-center p-4">

            <Link to={'/'} className={location.pathname === '/' ? ' font-bold text-xl underline' : ' font-bold text-xl'}>Home</Link>
            <div className="flex flex-row justify-end items-center gap-2">
                <p>Ciao, ciccio</p> {/* todo if login or logout */}

                <Link to={"/login"} className="bg-[#ECD0C2] rounded-2xl py-1 px-4 hover:bg-[#e0ac92] cursor-pointer">Login</Link> {/* todo if login or logout */}

            </div>



        </section>
    )
}

export default NavBar