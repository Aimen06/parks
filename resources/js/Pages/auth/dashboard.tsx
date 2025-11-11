import AuthLayout from '@/layouts/AuthLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { Calendar, MapPin, TrendingUp, DollarSign, Clock, Car, Star, Percent, Heart } from 'lucide-react';

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    role_id: number;
}

interface OwnerStats {
    occupationRate: number;
    dailyRevenue: number;
    weeklyRevenue: number;
    monthlyRevenue: number;
    yearlyRevenue: number;
    totalBookings: number;
    avgDuration: number;
    avgRating: number;
    totalReviews: number;
    revenueByPeriod: { period: string; amount: number }[];
    occupationData: { hour: string; rate: number }[];
    reviews: { id: number; user: string; rating: number; comment: string; date: string }[];
}

interface ClientStats {
    activeBookings: number;
    totalBookings: number;
    totalSpent: number;
    avgRating: number;
    upcomingBookings: {
        id: number;
        parkingName: string;
        address: string;
        date: string;
        time: string;
        duration: string;
        price: number;
        type: string;
    }[];
    recentBookings: {
        id: number;
        parkingName: string;
        date: string;
        duration: string;
        price: number;
        status: string;
    }[];
    spendingData: { month: string; amount: number }[];
    myReviews: {
        id: number;
        parkingName: string;
        rating: number;
        comment: string;
        date: string;
    }[];
    favoriteParkings: {
        id: number;
        name: string;
        address: string;
        price: number;
        rating: number;
        type: string;
    }[];
}

interface DashboardProps {
    auth: {
        user: User;
    };
    hasOwnedParkings: boolean;
    ownerStats: OwnerStats | null;
    clientStats: ClientStats;
}

const OwnerDashboard = ({ stats }: { stats: OwnerStats }) => {
    const StatCard = ({ icon: Icon, label, value, sublabel, trend, bgColor, iconColor }: {
        icon: any;
        label: string;
        value: string | number;
        sublabel?: string;
        trend?: string;
        bgColor: string;
        iconColor: string;
    }) => (
        <div className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{label}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
                    {sublabel && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{sublabel}</p>}
                    {trend && (
                        <div className="flex items-center mt-3 text-sm">
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-green-600 dark:text-green-400 font-medium">{trend}</span>
                        </div>
                    )}
                </div>
                <div className={`${bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={Percent}
                    label="Taux d'occupation"
                    value={`${stats.occupationRate}%`}
                    sublabel="Ce mois-ci"
                    bgColor="bg-blue-100 dark:bg-blue-900"
                    iconColor="text-blue-600 dark:text-blue-400"
                />
                <StatCard
                    icon={DollarSign}
                    label="Revenus mensuels"
                    value={`${stats.monthlyRevenue}€`}
                    sublabel={`Aujourd'hui: ${stats.dailyRevenue}€`}
                    bgColor="bg-green-100 dark:bg-green-900"
                    iconColor="text-green-600 dark:text-green-400"
                />
                <StatCard
                    icon={Calendar}
                    label="Réservations"
                    value={stats.totalBookings}
                    sublabel="Ce mois-ci"
                    bgColor="bg-purple-100 dark:bg-purple-900"
                    iconColor="text-purple-600 dark:text-purple-400"
                />
                <StatCard
                    icon={Clock}
                    label="Durée moyenne"
                    value={`${stats.avgDuration}h`}
                    sublabel="Par réservation"
                    bgColor="bg-orange-100 dark:bg-orange-900"
                    iconColor="text-orange-600 dark:text-orange-400"
                />
            </div>

            {/* Graphiques Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Graphique des revenus par jour */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Revenus des 7 derniers jours</h3>
                    <div className="flex items-end justify-between h-64 gap-2">
                        {stats.revenueByPeriod.map((data, idx) => {
                            const maxAmount = Math.max(...stats.revenueByPeriod.map(d => d.amount));
                            const height = maxAmount > 0 ? (data.amount / maxAmount) * 100 : 0;
                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="relative w-full group">
                                        <div
                                            className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-md hover:from-green-700 hover:to-green-500 transition-all cursor-pointer dark:from-green-500 dark:to-green-300"
                                            style={{ height: `${height}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                {data.amount}€
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{data.period}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Graphique d'occupation par heure */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Taux d'occupation par tranche horaire</h3>
                    <div className="space-y-4">
                        {stats.occupationData.map((data, idx) => {
                            return (
                                <div key={idx} className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-12">{data.hour}</span>
                                    <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-8 relative overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-blue-500 to-blue-400 dark:from-blue-600 dark:to-blue-500 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                                            style={{ width: `${Math.min(data.rate, 100)}%` }}
                                        >
                                            <span className="text-white text-sm font-semibold">{data.rate}%</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            {stats.reviews.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                            Avis récents
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                ({stats.avgRating}/5 - {stats.totalReviews} avis)
                            </span>
                        </h3>
                    </div>
                    <div className="space-y-4">
                        {stats.reviews.map((review) => (
                            <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{review.user}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${
                                                        i < review.rating
                                                            ? 'text-yellow-400 fill-yellow-400'
                                                            : 'text-gray-300 dark:text-gray-600'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

const ClientDashboard = ({ stats }: { stats: ClientStats }) => {
    return (
        <>
            {/* Section Stats - En Cards Flowbite */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Statistiques</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-blue-200 dark:border-blue-700">
                        <div className="flex items-center justify-between mb-3">
                            <Car className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-blue-900 dark:text-white">{stats.activeBookings}</h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Réservations actives</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-green-200 dark:border-green-700">
                        <div className="flex items-center justify-between mb-3">
                            <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-green-900 dark:text-white">{stats.totalBookings}</h3>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">Total ce mois-ci</p>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-purple-200 dark:border-purple-700">
                        <div className="flex items-center justify-between mb-3">
                            <DollarSign className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-purple-900 dark:text-white">{stats.totalSpent}€</h3>
                        <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">Dépenses ce mois</p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 border-orange-200 dark:border-orange-700">
                        <div className="flex items-center justify-between mb-3">
                            <Star className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                        </div>
                        <h3 className="text-3xl font-bold text-orange-900 dark:text-white">{stats.avgRating}/5</h3>
                        <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">Note moyenne donnée</p>
                    </div>
                </div>
            </div>

            {/* Réservations à venir */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-blue-600" />
                        Prochaines réservations
                    </h2>
                </div>
                {stats.upcomingBookings.length > 0 ? (
                    <div className="space-y-4">
                        {stats.upcomingBookings.map(booking => (
                        <div key={booking.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all">
                            <div className="flex items-start gap-4">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg shadow-md">
                                    <MapPin className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{booking.parkingName}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{booking.address}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-blue-600">{booking.price}€</p>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{booking.duration}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-md">
                                            <Calendar className="w-4 h-4" />
                                            {booking.date}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-md">
                                            <Clock className="w-4 h-4" />
                                            {booking.time}
                                        </span>
                                        <Badge color="info">{booking.type}</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Aucune réservation à venir</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Vos prochaines réservations apparaîtront ici</p>
                    </div>
                )}
            </div>

            {/* Mes parkings favoris */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        Mes parkings favoris
                    </h2>
                </div>
                {stats.favoriteParkings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stats.favoriteParkings.map(parking => (
                            <div key={parking.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-red-300 hover:shadow-md transition-all">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 dark:text-white">{parking.name}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{parking.address}</p>
                                    </div>
                                    <Heart className="w-5 h-5 text-red-500 fill-red-500 flex-shrink-0" />
                                </div>
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{parking.rating}/5</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-lg font-bold text-blue-600">{parking.price}€</span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">/h</span>
                                    </div>
                                </div>
                                <Badge color="info" size="sm">{parking.type}</Badge>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Aucun parking favori</p>
                        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Ajoutez vos parkings préférés pour y accéder rapidement</p>
                    </div>
                )}
            </div>

            {/* Historique récent et Mes notes en grille */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Historique récent */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Clock className="w-6 h-6 text-blue-600" />
                            Historique récent
                        </h2>
                    </div>
                    {stats.recentBookings.length > 0 ? (
                        <div className="space-y-3">
                            {stats.recentBookings.map(booking => (
                            <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        booking.status === 'Terminé' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                                    }`}>
                                        <Car className={`w-5 h-5 ${
                                            booking.status === 'Terminé' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                        }`} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{booking.parkingName}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{booking.date} • {booking.duration}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 dark:text-white">{booking.price}€</p>
                                    <Badge color={booking.status === 'Terminé' ? 'success' : 'failure'} size="sm">
                                        {booking.status}
                                    </Badge>
                                </div>
                            </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Clock className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-lg">Aucune réservation passée</p>
                            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Votre historique apparaîtra ici</p>
                        </div>
                    )}
                </div>

                {/* Mes dernières notes */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Star className="w-6 h-6 text-yellow-400" />
                            Mes dernières notes
                        </h2>
                    </div>
                    {stats.myReviews.length > 0 ? (
                        <div className="space-y-4">
                            {stats.myReviews.map(review => (
                                <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900 dark:text-white">{review.parkingName}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${
                                                            i < review.rating
                                                                ? 'text-yellow-400 fill-yellow-400'
                                                                : 'text-gray-300 dark:text-gray-600'
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                                    </div>
                                    {review.comment && (
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{review.comment}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <Star className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-lg">Aucune note donnée</p>
                            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Vos avis apparaîtront ici</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default function Dashboard({ auth, hasOwnedParkings, ownerStats, clientStats }: DashboardProps) {
    const [viewMode, setViewMode] = useState<'client' | 'owner'>(
        hasOwnedParkings ? 'owner' : 'client'
    );

    // Si l'utilisateur n'a pas de parkings, afficher uniquement le mode client sans toggle
    if (!hasOwnedParkings) {
        return (
            <AuthLayout title="Dashboard">
                <Head title="Dashboard" />
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Bonjour {auth.user.firstname} 👋
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Voici un aperçu de vos réservations et activités
                    </p>
                </div>
                <ClientDashboard stats={clientStats} />
            </AuthLayout>
        );
    }

    // Si l'utilisateur a des parkings, envelopper dans AuthLayout avec toggle
    return (
        <AuthLayout title={viewMode === 'owner' ? 'Dashboard Propriétaire' : 'Dashboard Client'}>
            <Head title={viewMode === 'owner' ? 'Dashboard Propriétaire' : 'Dashboard Client'} />

            {/* Welcome Section avec Toggle à droite */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Bonjour {auth.user.firstname} 👋
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        {viewMode === 'owner' ? 'Voici un aperçu de vos performances' : 'Voici un aperçu de vos réservations et activités'}
                    </p>
                </div>

                {/* Toggle Client/Propriétaire */}
                <div className="inline-flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
                    <button
                        onClick={() => setViewMode('client')}
                        className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                            viewMode === 'client'
                                ? 'bg-white text-primary-600 shadow-md dark:bg-gray-700 dark:text-primary-400'
                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <Car className="w-4 h-4" />
                            <span>Mode Client</span>
                        </div>
                    </button>
                    <button
                        onClick={() => setViewMode('owner')}
                        className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                            viewMode === 'owner'
                                ? 'bg-white text-primary-600 shadow-md dark:bg-gray-700 dark:text-primary-400'
                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                    >
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>Mode Propriétaire</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Contenu du dashboard selon le mode */}
            {viewMode === 'owner' && ownerStats ? (
                <OwnerDashboard stats={ownerStats} />
            ) : (
                <ClientDashboard stats={clientStats} />
            )}
        </AuthLayout>
    );
}
