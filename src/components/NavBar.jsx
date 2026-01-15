import { useContext } from "react";
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../auth/AuthContext";

const NavBar = function () {

    const location = useLocation()
    const { isAuthenticated, username, logout } = useContext(AuthContext)



    return (
        <section className="bg-[#EDEEE9] bg-orange-50 flex flex-row justify-between items-center p-4">

            {/* <div> */}
                <Link to={'/'} className={location.pathname === '/' ? ' font-bold text-xl underline' : ' font-bold text-xl'}>Home</Link>
                {
                    isAuthenticated && (
                        <Link to={'/recipes/new'} className="bg-[#ecc2c2] rounded-2xl py-1 px-4 hover:bg-[#e0ac92] cursor-pointer">Nuova ricetta?</Link>
                    )
                }
            {/* </div> */}
            <div className="flex flex-row justify-end items-center gap-2">
                <p>Ciao, {isAuthenticated ? username : 'ciccio'}</p>


                {
                    isAuthenticated ? (
                        <button onClick={logout} className="bg-[#ECD0C2] rounded-2xl py-1 px-4 hover:bg-[#e0ac92] cursor-pointer">Logout</button>
                        
                    ) : ( 
                        <Link to={"/login"} className="bg-[#ECD0C2] rounded-2xl py-1 px-4 hover:bg-[#e0ac92] cursor-pointer">Login</Link> 
                    )
                }

            </div>



        </section>
    )
}

export default NavBar