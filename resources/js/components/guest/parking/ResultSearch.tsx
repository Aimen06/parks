import React from 'react';
import { usePage, Link } from '@inertiajs/react';

// Type pour un parking
interface Parking {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity?: number;
    price_per_hour?: number;
    rating?: number;
    image?: string;
    created_at?: string;
    updated_at?: string;
}

// Type pour la pagination Laravel
interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedParkings {
    current_page: number;
    data: Parking[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

// Type pour les props de la page
interface PageProps {
    parkings: PaginatedParkings;
}

const ResultSearch: React.FC = () => {
    const { parkings } = usePage<PageProps>().props;
    const cityName = parkings && parkings.data.length > 0 ? parkings.data[0].city : 'Ville inconnue';

    // Fonction pour générer des étoiles
    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center">
                <span className="text-gray-700 text-sm mr-1">Note : {rating}</span>
                <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            </div>
        );
    };

    // Composant de pagination
    const PaginationComponent = () => {
        if (!parkings || parkings.last_page <= 1) return null;

        return (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-8">
                {/* Informations de pagination */}
                <div className="flex-1 flex justify-between sm:hidden">
                    {parkings.prev_page_url && (
                        <Link
                            href={parkings.prev_page_url}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Précédent
                        </Link>
                    )}
                    {parkings.next_page_url && (
                        <Link
                            href={parkings.next_page_url}
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Suivant
                        </Link>
                    )}
                </div>

                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Affichage de{' '}
                            <span className="font-medium">{parkings.from}</span>
                            {' '}à{' '}
                            <span className="font-medium">{parkings.to}</span>
                            {' '}sur{' '}
                            <span className="font-medium">{parkings.total}</span>
                            {' '}résultats
                        </p>
                    </div>

                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            {parkings.links.map((link, index) => {
                                // Bouton précédent
                                if (link.label === '&laquo; Previous') {
                                    return link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    ) : (
                                        <span key={index} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-gray-50 text-sm font-medium text-gray-300">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                                    );
                                }

                                // Bouton suivant
                                if (link.label === 'Next &raquo;') {
                                    return link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                        >
                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    ) : (
                                        <span key={index} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-gray-50 text-sm font-medium text-gray-300">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                                    );
                                }

                                // Numéros de page
                                if (link.active) {
                                    return (
                                        <span
                                            key={index}
                                            className="relative inline-flex items-center px-4 py-2 border border-blue-500 bg-blue-50 text-sm font-medium text-blue-600"
                                        >
                      {link.label}
                    </span>
                                    );
                                }

                                return link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <span
                                        key={index}
                                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-gray-50 text-sm font-medium text-gray-300"
                                    >
                    {link.label}
                  </span>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header de la section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Parkings à {cityName}
                    </h1>
                    {parkings && parkings.data.length > 0 && (
                        <p className="text-gray-600 mt-2">
                            {parkings.total} parking{parkings.total > 1 ? 's' : ''} trouvé{parkings.total > 1 ? 's' : ''}
                        </p>
                    )}
                </div>
            </div>

            {/* Liste des parkings */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                {!parkings || parkings.data.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            Aucun parking trouvé dans cette ville.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-6">
                            {parkings.data.map((parking) => (
                                <div
                                    key={parking.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="flex">
                                        {/* Image du parking */}
                                        <div className="w-80 h-48 flex-shrink-0">
                                            <img
                                                src={parking.image || '/images/default-parking.jpg'}
                                                alt={parking.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Contenu de la carte */}
                                        <div className="flex-1 p-6">
                                            <div className="flex flex-col h-full">
                                                {/* Titre */}
                                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                                    {parking.name}
                                                </h3>

                                                {/* Adresse */}
                                                <p className="text-gray-600 text-base mb-4">
                                                    {parking.address}
                                                </p>

                                                {/* Prix */}
                                                <div className="mb-4">
                          <span className="text-lg font-semibold text-gray-900">
                            Prix: {parking.price_per_hour ? `${parking.price_per_hour}€ / h` : 'Prix non disponible'}
                          </span>
                                                </div>

                                                {/* Note */}
                                                <div className="mt-auto">
                                                    {parking.rating && renderStars(parking.rating)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Composant de pagination */}
                        <PaginationComponent />
                    </>
                )}
            </div>
        </div>
    );
};

export default ResultSearch;
