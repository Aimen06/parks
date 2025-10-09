import React from 'react';
import { Link } from '@inertiajs/react';
import rentImage from '../../../assets/images/rent-park.png';

const RentSection: React.FC = () => {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden flex flex-col items-center justify-between py-8 lg:py-10 px-5">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-indigo-400 to-cyan-400 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>
            <h1 className="text-2xl lg:text-4xl font-black text-gray-900 leading-tight">
                <span className="text-gray-900">Augmentez vos revenus avec votre </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">parking</span>
            </h1>
            {/* Main Content */}
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-2 py-12 md:py-20">
                <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                    {/* Left Column - Image (ordre inversé sur mobile) */}
                    <div className="w-full lg:w-3/5 order-2 lg:order-1">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform rotate-2 md:rotate-3 group-hover:rotate-3 md:group-hover:rotate-6 transition-transform duration-500"></div>
                            <div className="relative aspect-[4/3] sm:aspect-[3/2] md:aspect-[3/4] lg:aspect-[4/5] bg-white overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 border border-gray-200">
                                <img
                                    src={rentImage}
                                    alt="Parking moderne avec personne"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2 flex flex-col justify-center">
                        <div className="space-y-6 sm:space-y-8 md:space-y-10 text-center lg:text-left">
                            {/* Header */}
                            <div className="space-y-4 md:space-y-6">

                                <div className="flex items-start space-x-4 group justify-center lg:justify-start">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Louez en 3 étapes</h3>
                                        <p className="text-sm sm:text-base md:text-lg text-gray-600">Commencez à générer des revenus avec votre parking facilement</p>
                                    </div>
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-6 md:space-y-8">
                                <div className="flex items-start space-x-4 group justify-center lg:justify-start">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Vous fixez vos prix</h3>
                                        <p className="text-sm sm:text-base md:text-lg text-gray-600">Liberté totale pour définir vos tarifs selon votre localisation</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group justify-center lg:justify-start">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Dashboard propriétaire</h3>
                                        <p className="text-sm sm:text-base md:text-lg text-gray-600">Suivez vos revenus et paramétrez vos disponibilités facilement</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 group justify-center lg:justify-start">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Pas d'abonnement</h3>
                                        <p className="text-sm sm:text-base md:text-lg text-gray-600">Seulement une commission fixe de 15% sur vos revenus</p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className="pt-4">
                                <Link href="/register">
                                    <button className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 text-white font-bold text-base sm:text-lg md:text-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-2xl active:scale-95">
                                        <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                        <span className="relative flex items-center justify-center space-x-2">
                                            <span>Commencer à gagner de l'argent</span>
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </button>
                                </Link>
                                <p className="text-sm sm:text-base text-gray-500 mt-4 text-center">
                                    <span className="font-medium">Inscription gratuite</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RentSection;
