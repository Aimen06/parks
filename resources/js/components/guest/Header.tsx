import React, { useState } from 'react';
import logo from '../../../assets/images/logo-parks.png';
import burger from '../../../assets/images/burger.svg';
import { Link } from '@inertiajs/react';

const HeaderGuest: React.FC = () => {
    const [sidebarActive, setSidebarActive] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const AnimatedNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
        return (
            <Link
                href={href}
                className="relative hover:text-[#04959D] transition-all duration-300 font-medium text-sm lg:text-base xl:text-lg px-3 py-2 whitespace-nowrap group"
            >
                <span className="relative inline-block">
                    {children}
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[#04959D] transition-all duration-300 group-hover:w-full"></span>
                </span>
            </Link>
        );
    };

    return (
        <>
            <header className="bg-white flex justify-between items-center px-5 border-b-2 border-gray-200 md:h-[90px] h-[50px] relative font-header">
                {/* Logo */}
                <div className="md:h-[90px] h-[50px] z-50">
                    <img className="h-full" src={logo} alt="Logo" />
                </div>

                {/* Navigation Desktop - visible à partir de md (768px) */}
                <nav className="hidden md:flex items-center h-full">
                    <div className="flex items-center space-x-0 lg:space-x-3 xl:space-x-8 text-gray-600">
                        <AnimatedNavLink href="/">
                            Accueil
                        </AnimatedNavLink>
                        <AnimatedNavLink href="/search">
                            Recherche un parking
                        </AnimatedNavLink>
                        <AnimatedNavLink href="/rent-park">
                            Louer son parking
                        </AnimatedNavLink>
                        <AnimatedNavLink href="/services">
                            Services
                        </AnimatedNavLink>
                        <AnimatedNavLink href="/contact">
                            Contact
                        </AnimatedNavLink>
                        <div className="flex lg:hidden items-center">
                            <AnimatedNavLink href="/login">
                                Connexion
                            </AnimatedNavLink>
                            <AnimatedNavLink href="/register">
                                Inscription
                            </AnimatedNavLink>
                        </div>
                    </div>
                </nav>

                {/* Boutons d'action Desktop - visible à partir de md (768px) */}
                <div className="hidden lg:flex items-center space-x-2 lg:space-x-3">
                    <Link href="/login" className="relative inline-block px-4 py-2 font-medium group cursor-pointer">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-blue-500 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative text-black group-hover:text-white">Connexion</span>
                    </Link>
                    <Link href="/register" className="relative inline-block px-4 py-2 font-medium group cursor-pointer">
                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-green-500 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                        <span className="relative text-black group-hover:text-white">Inscription</span>
                    </Link>
                </div>

                {/* Bouton burger Mobile - caché à partir de md (768px) */}
                <button
                    className="md:hidden w-10 h-10 flex items-center justify-center z-50"
                    onClick={toggleSidebar}
                    aria-label={sidebarActive ? "Fermer le menu" : "Ouvrir le menu"}
                >
                    <img
                        src={burger}
                        alt="Menu"
                        className="h-6 w-6"
                    />
                </button>
            </header>

            {/* Sidebar Mobile */}
            <div className={`fixed top-0 right-0 h-full w-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
                sidebarActive ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="flex flex-col h-full font-medium">
                    {/* Header sidebar avec bouton fermer */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                        <div className="md:h-[90px] h-[50px] z-50">
                            <img className="h-full" src={logo} alt="Logo" />
                        </div>
                        <button
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800"
                            onClick={() => setSidebarActive(false)}
                        >
                            <span className="text-4xl font-bold">&times;</span>
                        </button>
                    </div>

                    {/* Navigation Mobile */}
                    <nav className="text-lg font-medium flex flex-col p-6 space-y-6 h-full justify-end">
                        <Link
                            href="/"
                            className="text-4xl font-medium text-gray-800 hover:text-blue-600 py-2 relative group transition-colors duration-200"
                            onClick={() => setSidebarActive(false)}
                        >
                            <span className="relative inline-block">
                                Accueil
                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </Link>
                        <Link
                            href="/search"
                            className="text-4xl font-medium text-gray-800 hover:text-blue-600 py-2 relative group transition-colors duration-200"
                            onClick={() => setSidebarActive(false)}
                        >
                            <span className="relative inline-block">
                                Réserver
                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </Link>
                        <Link
                            href="/rent"
                            className="text-4xl font-medium text-gray-800 hover:text-blue-600 py-2 relative group transition-colors duration-200"
                            onClick={() => setSidebarActive(false)}
                        >
                            <span className="relative inline-block">
                                Gagner de l'argent
                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </Link>
                        <Link
                            href="/services"
                            className="text-4xl font-medium text-gray-800 hover:text-blue-600 py-2 relative group transition-colors duration-200"
                            onClick={() => setSidebarActive(false)}
                        >
                            <span className="relative inline-block">
                                Services
                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </Link>
                        <Link
                            href="/contact"
                            className="text-4xl font-medium text-gray-800 hover:text-blue-600 py-2 relative group transition-colors duration-200"
                            onClick={() => setSidebarActive(false)}
                        >
                            <span className="relative inline-block">
                                Contact
                                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </Link>
                    </nav>

                    {/* Boutons d'action Mobile */}
                    <div className="mt-auto p-6 flex flex-col space-y-4 text-3xl">
                        <Link
                            href="/login"
                            className="relative inline-block px-4 py-2 font-medium group cursor-pointer text-center"
                            onClick={() => setSidebarActive(false)}
                        >
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-blue-500 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                            <span className="relative text-black group-hover:text-white">Connexion</span>
                        </Link>
                        <Link
                            href="/register"
                            className="relative inline-block px-4 py-2 font-medium group cursor-pointer text-center"
                            onClick={() => setSidebarActive(false)}
                        >
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-green-500 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                            <span className="relative text-black group-hover:text-white">Inscription</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderGuest;
