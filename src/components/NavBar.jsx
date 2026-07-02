import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../auth/AuthContext";
import Swal from "sweetalert2";

const NavBar = function () {

    const location = useLocation()
    const { isAuthenticated, username, logout } = useContext(AuthContext)

    const navigate = useNavigate()

    
    const logoutAlert = () => {
        Swal.fire({
            title: 'Logout effettuato con successo!',
            icon: 'success',
            confirmButtonText: 'OK',
        }).then(() => {
            navigate('/')
        })
    }
    
    const handleLogout = () => {
        logout()        
        logoutAlert()
    }


    return (
        <section className="bg-[#ffe1d1] border border-b-green-100 flex flex-row justify-between items-center p-3 sm:p-4">

            {/* Link Home */}
            <Link to={'/'} className={location.pathname === '/' ? ' font-bold text-xl underline' : ' font-bold text-xl'}>Home</Link>
                

            {/* authenticated links */}
            <div className="flex flex-row items-center">
                {
                    isAuthenticated && location.pathname != '/recipes/new' && (
                        
                        <Link to={'/recipes/new'} className="bg-[#ffe1d1] text-center rounded-2xl py-1 md:px-4 hover:bg-[#fcd9c6] cursor-pointer me-2">Nuova ricetta</Link>
                            
                        
                    )
                }
                {
                    isAuthenticated && location.pathname != '/ingredients' && (
                        
                            
                        <Link to={'/ingredients'} className="bg-[#ffe1d1] text-center rounded-2xl py-1 md:px-4 hover:bg-[#fcd9c6] cursor-pointer">Ingredienti</Link>
                        
                    )
                }
            </div>

            {/* login/out*/}
            <div className="flex flex-row justify-end items-center gap-2" style={{textTransform: 'capitalize'}}>
                { isAuthenticated ?? <p>Ciao, {isAuthenticated ? username : 'ciccio'}</p>}


                {
                    isAuthenticated ? (
                        <button onClick={handleLogout} className="bg-[#ffe1d1] rounded-2xl py-1 px-4 hover:bg-[#fcd9c6] cursor-pointer">Logout</button>
                        
                    ) : ( 
                        <Link to={"/login"} className="bg-[#ffe1d1] rounded-2xl py-1 px-4 hover:bg-[#fcd9c6] cursor-pointer">Login</Link> 
                    )
                }

            </div>



        </section>
    )
}

export default NavBar