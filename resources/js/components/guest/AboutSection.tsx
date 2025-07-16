import React from 'react';
import { Link } from '@inertiajs/react';
import about from '../../../assets/images/about-park.png';


const AboutSection: React.FC = () => {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-32 left-16 w-40 h-40 md:w-72 md:h-72 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-32 right-16 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-full blur-3xl animate-pulse delay-700"></div>
                <div className="absolute top-1/3 left-1/3 w-36 h-36 md:w-64 md:h-64 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl animate-pulse delay-1500"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 md:mb-20">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
                            <span className="text-gray-900">Voici la nouvelle manière de </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">trouver</span>
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            Choisissez parmi des milliers de voitures disponibles auprès de particuliers et professionnels près de chez vous.
                        </p>
                    </div>

                    {/* Image and Features Layout */}
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                        {/* Image Section */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 transform rotate-1 md:rotate-2 group-hover:rotate-2 md:group-hover:rotate-3 transition-transform duration-500 rounded-lg"></div>
                                <div className="relative aspect-[4/3] bg-white overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 border-4 border-blue-500 rounded-lg">
                                    <img
                                        src={about}
                                        alt="Homme utilisant l'application dans un parking moderne"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="w-full lg:w-1/2">
                            <div className="space-y-6 md:space-y-8">
                                {/* Feature 1 */}
                                <div className="flex items-start space-x-4 group">
                                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900">Ne perdez plus du temps à chercher une place de parking</h3>
                                        <p className="text-base md:text-lg text-gray-600">avec notre application réserver en quelques clics une place de parking.</p>
                                    </div>
                                </div>

                                {/* Feature 2 */}
                                <div className="flex items-start space-x-4 group">
                                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900">Profitez de tarifs économiques et flexibles</h3>
                                        <p className="text-base md:text-lg text-gray-600">adaptés à vos besoins, pour un stationnement malin et abordable</p>
                                    </div>
                                </div>

                                {/* Feature 3 */}
                                <div className="flex items-start space-x-4 group">
                                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900">Bénéficiez de l'annulation gratuite</h3>
                                        <p className="text-base md:text-lg text-gray-600">jusqu'à 2 heures avant votre réservation pour une flexibilité totale.</p>
                                    </div>
                                </div>

                                {/* Feature 4 */}
                                <div className="flex items-start space-x-4 group">
                                    <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                        <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900">Un service client localisé en France</h3>
                                        <p className="text-base md:text-lg text-gray-600">disponible 7j/7j.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center mt-16 md:mt-20">
                        <Link href="/register">
                            <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 md:px-12 md:py-5 text-white font-bold text-lg md:text-xl rounded-lg transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 hover:shadow-2xl active:scale-95">
                                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                <span className="relative flex items-center justify-center space-x-2">
                                    <span>Réserver maintenant</span>
                                    <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </button>
                        </Link>
                        <p className="text-sm md:text-base text-gray-500 mt-4">
                            <span className="font-medium">Inscription gratuite • Sans engagement</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
