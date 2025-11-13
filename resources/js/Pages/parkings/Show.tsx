import React from 'react';
import { router } from '@inertiajs/react';
import { ArrowLeft, Edit, MapPin, Box, DollarSign, Car, Calendar } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';

interface Owner {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

interface Parking {
    id: number;
    name: string | null;
    number: string | null;
    address: string;
    floor: string | null;
    zip: string;
    city: string;
    latitude: number | null;
    longitude: number | null;
    remark: string | null;
    height: number;
    width: number;
    length: number;
    charge: boolean;
    exterior: boolean;
    box: boolean;
    owner_id: number;
    price_per_hour: number;
    available: boolean;
    owner?: Owner;
    created_at: string;
    updated_at: string;
}

interface Props {
    parking: Parking;
}

const Show: React.FC<Props> = ({ parking }) => {
    const getParkingType = (parking: Parking) => {
        if (parking.box) return { label: 'Box', color: 'info' as const };
        if (parking.exterior) return { label: 'Extérieur', color: 'success' as const };
        return { label: 'Couvert', color: 'warning' as const };
    };

    const parkingType = getParkingType(parking);

    return (
        <AuthLayout>
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => router.visit('/parkings')}
                        className="mb-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex items-center"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour à la liste
                    </button>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                {parking.name || `Parking ${parking.number || parking.id}`}
                            </h1>
                            <div className="flex gap-2 items-center">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    parkingType.color === 'info' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                    parkingType.color === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                }`}>
                                    {parkingType.label}
                                </span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    parking.available
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                }`}>
                                    {parking.available ? 'Disponible' : 'Indisponible'}
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => router.visit(`/parkings/${parking.id}/edit`)}
                            className="text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-700"
                        >
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Informations principales */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                            Informations du parking
                        </h2>

                        {/* Localisation */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                Localisation
                            </h3>
                            <div className="space-y-2 text-gray-600 dark:text-gray-400">
                                <p className="text-base">{parking.address}</p>
                                <p>{parking.zip} {parking.city}</p>
                                {parking.floor && (
                                    <p>
                                        <span className="font-medium">Étage:</span> {parking.floor}
                                    </p>
                                )}
                                {parking.number && (
                                    <p>
                                        <span className="font-medium">Numéro:</span> {parking.number}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Dimensions */}
                        <div className="mb-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                <Box className="w-5 h-5" />
                                Dimensions
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Longueur</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {parking.length}m
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Largeur</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {parking.width}m
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Hauteur</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {parking.height}m
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Caractéristiques */}
                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                Caractéristiques
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {parking.charge && (
                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                                        <Car className="w-4 h-4 mr-1" />
                                        Borne de recharge
                                    </span>
                                )}
                                {!parking.charge && (
                                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                        Pas de borne de recharge
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Remarques */}
                        {parking.remark && (
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                    Remarques / Instructions
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                                    {parking.remark}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Prix */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-green-600" />
                                Tarification
                            </h2>
                            <div className="text-center py-4">
                                <p className="text-4xl font-bold text-gray-900 dark:text-white">
                                    {(parking.price_per_hour / 100).toFixed(2)}€
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 mt-1">par heure</p>
                            </div>
                        </div>

                        {/* Coordonnées GPS */}
                        {(parking.latitude || parking.longitude) && (
                            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                    Coordonnées GPS
                                </h2>
                                <div className="space-y-2 text-sm">
                                    {parking.latitude && (
                                        <div>
                                            <p className="text-gray-500 dark:text-gray-400">Latitude</p>
                                            <p className="font-mono text-gray-900 dark:text-white">
                                                {parking.latitude}
                                            </p>
                                        </div>
                                    )}
                                    {parking.longitude && (
                                        <div className="mt-2">
                                            <p className="text-gray-500 dark:text-gray-400">Longitude</p>
                                            <p className="font-mono text-gray-900 dark:text-white">
                                                {parking.longitude}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Dates */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Informations
                            </h2>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Créé le</p>
                                    <p className="text-gray-900 dark:text-white">
                                        {new Date(parking.created_at).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 dark:text-gray-400">Modifié le</p>
                                    <p className="text-gray-900 dark:text-white">
                                        {new Date(parking.updated_at).toLocaleDateString('fr-FR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Show;
