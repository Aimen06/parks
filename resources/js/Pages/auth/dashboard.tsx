import AuthLayout from '@/layouts/AuthLayout';
import React, { useState } from 'react';
import { Calendar, MapPin, TrendingUp, DollarSign, Clock, Car, Star, ChevronRight } from 'lucide-react';

const ClientDashboard = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('month');

    // Données client enrichies
    const clientStats = {
        activeBookings: 2,
        totalBookings: 15,
        totalSpent: 450.50,
        favoriteSpots: 3,
        savedAmount: 67.50,
        avgRating: 4.6
    };

    // Données pour les graphiques
    const spendingData = [
        { month: 'Jan', amount: 45 },
        { month: 'Fév', amount: 62 },
        { month: 'Mar', amount: 38 },
        { month: 'Avr', amount: 75 },
        { month: 'Mai', amount: 55 },
        { month: 'Juin', amount: 82 },
        { month: 'Juil', amount: 68 },
        { month: 'Août', amount: 95 },
        { month: 'Sep', amount: 72 },
        { month: 'Oct', amount: 88 },
        { month: 'Nov', amount: 105 }
    ];

    const bookingsByDay = [
        { day: 'Lun', count: 3 },
        { day: 'Mar', count: 5 },
        { day: 'Mer', count: 2 },
        { day: 'Jeu', count: 4 },
        { day: 'Ven', count: 7 },
        { day: 'Sam', count: 8 },
        { day: 'Dim', count: 4 }
    ];

    const upcomingBookings = [
        {
            id: 1,
            parkingName: "Parking Central",
            address: "15 Rue de la République, Nice",
            date: "2025-11-08",
            time: "14:00",
            duration: "2h",
            price: 12.00,
            rating: 4.5,
            type: "Couvert",
            distance: "1.2 km"
        },
        {
            id: 2,
            parkingName: "Parking Gare SNCF",
            address: "Place de la Gare, Nice",
            date: "2025-11-10",
            time: "09:00",
            duration: "5h",
            price: 25.00,
            rating: 4.2,
            type: "Extérieur",
            distance: "0.8 km"
        }
    ];

    const recentBookings = [
        { id: 1, parkingName: "Parking Port", date: "2025-11-04", duration: "3h", price: 15.00, status: "Terminé" },
        { id: 2, parkingName: "Parking Massena", date: "2025-11-02", duration: "4h", price: 18.00, status: "Terminé" },
        { id: 3, parkingName: "Parking Promenade", date: "2025-10-28", duration: "2h", price: 10.00, status: "Terminé" },
        { id: 4, parkingName: "Parking Centre", date: "2025-10-25", duration: "6h", price: 30.00, status: "Annulé" }
    ];

    const StatCard = ({ icon: Icon, label, value, sublabel, trend, bgColor, iconColor }) => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                    {sublabel && <p className="text-xs text-gray-500 mt-1">{sublabel}</p>}
                    {trend && (
                        <div className="flex items-center mt-3 text-sm">
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-green-600 font-medium">{trend}</span>
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
        <AuthLayout title="Dashboard">
            {/* Welcome Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Bonjour Jean 👋</h2>
                <p className="text-gray-600">Voici un aperçu de vos réservations et activités</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={Car}
                    label="Réservations actives"
                    value={clientStats.activeBookings}
                    sublabel="En cours"
                    bgColor="bg-blue-100"
                    iconColor="text-blue-600"
                />
                <StatCard
                    icon={Calendar}
                    label="Total réservations"
                    value={clientStats.totalBookings}
                    sublabel="Ce mois-ci"
                    trend="+12%"
                    bgColor="bg-green-100"
                    iconColor="text-green-600"
                />
                <StatCard
                    icon={DollarSign}
                    label="Dépenses totales"
                    value={`${clientStats.totalSpent}€`}
                    sublabel="Ce mois-ci"
                    bgColor="bg-purple-100"
                    iconColor="text-purple-600"
                />
                <StatCard
                    icon={Star}
                    label="Note moyenne"
                    value={clientStats.avgRating}
                    sublabel="Vos avis"
                    bgColor="bg-orange-100"
                    iconColor="text-orange-600"
                />
            </div>

            {/* Graphiques Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Graphique des dépenses */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Évolution des dépenses</h3>
                        <div className="flex gap-2">
                            {['month', 'year'].map(period => (
                                <button
                                    key={period}
                                    onClick={() => setSelectedPeriod(period)}
                                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                                        selectedPeriod === period
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {period === 'month' ? 'Mois' : 'Année'}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-end justify-between h-64 gap-2">
                        {spendingData.map((data, idx) => {
                            const maxAmount = Math.max(...spendingData.map(d => d.amount));
                            const height = (data.amount / maxAmount) * 100;
                            return (
                                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="relative w-full group">
                                        <div
                                            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md hover:from-blue-700 hover:to-blue-500 transition-all cursor-pointer"
                                            style={{ height: `${height}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                {data.amount}€
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs font-medium text-gray-600">{data.month}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Graphique réservations par jour */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Réservations par jour de semaine</h3>
                    <div className="space-y-4">
                        {bookingsByDay.map((data, idx) => {
                            const maxCount = Math.max(...bookingsByDay.map(d => d.count));
                            const width = (data.count / maxCount) * 100;
                            return (
                                <div key={idx} className="flex items-center gap-4">
                                    <span className="text-sm font-medium text-gray-600 w-12">{data.day}</span>
                                    <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                                            style={{ width: `${width}%` }}
                                        >
                                            <span className="text-white text-sm font-semibold">{data.count}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Réservations à venir */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-blue-600" />
                        Prochaines réservations
                    </h3>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                        Voir tout
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="space-y-4">
                    {upcomingBookings.map(booking => (
                        <div key={booking.id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-md transition-all">
                            <div className="flex items-start gap-4">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-lg shadow-md">
                                    <MapPin className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900">{booking.parkingName}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{booking.address}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-blue-600">{booking.price}€</p>
                                            <span className="text-xs text-gray-500">{booking.duration}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-md">
                                            <Calendar className="w-4 h-4" />
                                            {booking.date}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-md">
                                            <Clock className="w-4 h-4" />
                                            {booking.time}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-md">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            {booking.rating}
                                        </span>
                                        <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md font-medium">
                                            {booking.type}
                                        </span>
                                        <span className="text-gray-500">📍 {booking.distance}</span>
                                    </div>
                                    <div className="flex gap-3 mt-4">
                                        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                            Voir les détails
                                        </button>
                                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                            Modifier
                                        </button>
                                        <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">
                                            Annuler
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Historique récent */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Clock className="w-6 h-6 text-blue-600" />
                        Historique récent
                    </h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Voir tout
                    </button>
                </div>
                <div className="space-y-3">
                    {recentBookings.map(booking => (
                        <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    booking.status === 'Terminé' ? 'bg-green-100' : 'bg-red-100'
                                }`}>
                                    <Car className={`w-5 h-5 ${
                                        booking.status === 'Terminé' ? 'text-green-600' : 'text-red-600'
                                    }`} />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{booking.parkingName}</p>
                                    <p className="text-sm text-gray-600">{booking.date} • {booking.duration}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900">{booking.price}€</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    booking.status === 'Terminé'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                }`}>
                                    {booking.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthLayout>
    );
};

export default ClientDashboard;
