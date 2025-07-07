import { NavLink, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    
    return (
        <nav className="bg-gradient-to-r from-emerald-500 to-gray-900 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-white">🎲</span>
                            <span className="ml-2 text-xl font-bold text-white">GamerRater</span>
                        </NavLink>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <NavLink 
                                to="/games" 
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        isActive 
                                            ? 'bg-white bg-opacity-20 text-gray-900' 
                                            : 'text-emerald-100 hover:bg-white hover:bg-opacity-10 hover:text-gray-900'
                                    }`
                                }
                            >
                                Games
                            </NavLink>
                            <NavLink 
                                to="/creategame" 
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        isActive 
                                            ? 'bg-white bg-opacity-20 text-gray-900' 
                                            : 'text-emerald-100 hover:bg-white hover:bg-opacity-10 hover:text-gray-900'
                                    }`
                                }
                            >
                                Add Game
                            </NavLink>
                            <NavLink 
                                to="/mygames" 
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        isActive 
                                            ? 'bg-white bg-opacity-20 text-gray-900' 
                                            : 'text-emerald-100 hover:bg-white hover:bg-opacity-10 hover:text-gray-900'
                                    }`
                                }
                            >
                                My Games
                            </NavLink>
                        </div>
                    </div>

                    {/* Auth Links */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center space-x-4">
                            {(localStorage.getItem("gamer_token") !== null) ? (
                                <button 
                                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    onClick={() => {
                                        localStorage.removeItem("gamer_token")
                                        navigate('/login')
                                    }}
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <NavLink 
                                        to="/login" 
                                        className="text-emerald-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        Login
                                    </NavLink>
                                    <NavLink 
                                        to="/register" 
                                        className="bg-white bg-opacity-20 hover:bg-opacity-30 text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        Register
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button 
                            className="bg-white bg-opacity-20 inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => {
                                const mobileMenu = document.getElementById('mobile-menu');
                                mobileMenu.classList.toggle('hidden');
                            }}
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 bg-opacity-50">
                    <NavLink 
                        to="/games" 
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                                isActive 
                                    ? 'bg-white bg-opacity-20 text-gray-900' 
                                    : 'text-emerald-100 hover:bg-white hover:bg-opacity-10 hover:text-gray-900'
                            }`
                        }
                    >
                        Games
                    </NavLink>
                    <NavLink 
                        to="/creategame" 
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                                isActive 
                                    ? 'bg-white bg-opacity-20 text-gray-900' 
                                    : 'text-emerald-100 hover:bg-white hover:bg-opacity-10 hover:text-gray-900'
                            }`
                        }
                    >
                        Add Game
                    </NavLink>
                    <NavLink 
                        to="/mygames" 
                        className={({ isActive }) =>
                            `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                                isActive 
                                    ? 'bg-white bg-opacity-20 text-gray-900' 
                                    : 'text-emerald-100 hover:bg-white hover:bg-opacity-10 hover:text-gray-900'
                            }`
                        }
                    >
                        My Games
                    </NavLink>
                    
                    <div className="border-t border-white border-opacity-20 pt-4">
                        {(localStorage.getItem("gamer_token") !== null) ? (
                            <button 
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:bg-white hover:bg-opacity-10 hover:text-white transition-colors duration-200"
                                onClick={() => {
                                    localStorage.removeItem("gamer_token")
                                    navigate('/login')
                                }}
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <NavLink 
                                    to="/login" 
                                    className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:bg-white hover:bg-opacity-10 hover:text-white transition-colors duration-200"
                                >
                                    Login
                                </NavLink>
                                <NavLink 
                                    to="/register" 
                                    className="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:bg-white hover:bg-opacity-10 hover:text-white transition-colors duration-200"
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}