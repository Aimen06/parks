import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

interface ParkingSearchData {
    city: string;
    start_date: string;
    start_time: string;
    end_date: string;
    end_time: string;
    has_box: boolean;
    is_exterior: boolean;
    is_large_space: boolean;
    has_charging: boolean;
}

export default function SearchSection() {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const { data, setData, post, processing, errors } = useForm<ParkingSearchData>({
        city: '',
        start_date: '',
        start_time: '09:00',
        end_date: '',
        end_time: '16:00',
        has_box: false,
        is_exterior: false,
        is_large_space: false,
        has_charging: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!data.city.trim()) {
            alert('Veuillez saisir une ville');
            return;
        }

        if (!startDate || !endDate) {
            alert('Veuillez sélectionner les dates d\'arrivée et de départ');
            return;
        }

        console.log('Données de recherche:', data);
        post(route('parking.search'), {
            ...data,
            onSuccess: () => {
                console.log('Recherche effectuée avec succès');
            },
            onError: (errors) => {
                console.log('Erreurs de validation:', errors);
            }
        });

    };

    const toggleOption = (field: keyof ParkingSearchData) => {
        setData(field, !data[field]);
    };

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        if (date) {
            setData('start_date', date.toISOString().split('T')[0]);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
        if (date) {
            setData('end_date', date.toISOString().split('T')[0]);
        }
    };

    const handleStartTimeChange = (time: string) => {
        setData('start_time', time);
    };

    const handleEndTimeChange = (time: string) => {
        setData('end_time', time);
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <ThemeConfig dark={false} />
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                        Réserver un parking en quelques clics
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Trouvez et réservez votre place de parking idéale
                    </p>
                </div>

                <div className="bg-white shadow-xl p-6 lg:p-8 max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    Ville
                                </span>
                            </label>
                            <input
                                id="city"
                                type="text"
                                value={data.city}
                            className={`bg-gray-50 border ${errors.city ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                onChange={(e) => setData('city', e.target.value)}
                                placeholder="Cannes"
                                className="w-full px-4 py-3 border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                                required
                            />
                            {errors.city && (
                                <p className="text-sm text-red-600">{errors.city}</p>
                            )}
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Arrivée
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-xs font-medium text-gray-600">
                                        Date d'arrivée
                                    </label>
                                    <Datepicker
                                        onChange={handleStartDateChange}
                                        weekStart={1}
                                        language="fr-FR"
                                        labelTodayButton="Aujourd'hui"
                                        labelClearButton="Annuler"
                                        minDate={new Date()}
                                    />
                                    {errors.start_date && (
                                        <p className="text-sm text-red-600">{errors.start_date}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="start_time" className="block text-xs font-medium text-gray-600">
                                        Heure d'arrivée
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="time"
                                            id="start_time"
                                            value={data.start_time}
                                        className={`bg-gray-50 border ${errors.start_time ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                            onChange={(e) => handleStartTimeChange(e.target.value)}
                                            className="rounded-none bg-gray-50 border text-gray-900 leading-none focus:ring-teal-500 focus:border-teal-500 block flex-1 w-full text-sm border-gray-300 p-2.5"
                                            min="06:00"
                                            max="23:59"
                                            required
                                        />
                                    </div>
                                    {errors.start_time && (
                                        <p className="text-sm text-red-600">{errors.start_time}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Départ
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-xs font-medium text-gray-600">
                                        Date de départ
                                    </label>
                                    <Datepicker
                                        onChange={handleEndDateChange}
                                        weekStart={1}
                                        language="fr-FR"
                                        labelTodayButton="Aujourd'hui"
                                        labelClearButton="Annuler"
                                        minDate={startDate || new Date()}
                                    />
                                    {errors.end_date && (
                                        <p className="text-sm text-red-600">{errors.end_date}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="end_time" className="block text-xs font-medium text-gray-600">
                                        Heure de départ
                                    </label>
                                    <div className="flex">
                                        <input
                                            type="time"
                                            id="end_time"
                                            value={data.end_time}
                                        className={`bg-gray-50 border ${errors.end_time ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                            onChange={(e) => handleEndTimeChange(e.target.value)}
                                            className="rounded-none bg-gray-50 border text-gray-900 leading-none focus:ring-teal-500 focus:border-teal-500 block flex-1 w-full text-sm border-gray-300 p-2.5"
                                            min="06:00"
                                            max="23:59"
                                            required
                                        />
                                    </div>
                                    {errors.end_time && (
                                        <p className="text-sm text-red-600">{errors.end_time}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-4">Options</h3>

                            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-none">
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Box fermé</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => toggleOption('has_box')}
                                    className={`inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E72162] focus:ring-offset-2 ${
                                        data.has_box ? 'bg-[#E72162]' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            data.has_box ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-none">
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Parking extérieur</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => toggleOption('is_exterior')}
                                    className={`inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E72162] focus:ring-offset-2 ${
                                        data.is_exterior ? 'bg-[#E72162]' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            data.is_exterior ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-none">
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4a1 1 0 011-1h4m5 0h4a1 1 0 011 1v4m0 5v4a1 1 0 01-1 1h-4m-5 0H5a1 1 0 01-1-1v-4m2-4h8v8H6V8z" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Place large</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => toggleOption('is_large_space')}
                                    className={`inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E72162] focus:ring-offset-2 ${
                                        data.is_large_space ? 'bg-[#E72162]' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            data.is_large_space ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-none">
                                <div className="flex items-center space-x-3">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="text-gray-700 font-medium">Borne de recharge</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => toggleOption('has_charging')}
                                    className={`inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E72162] focus:ring-offset-2 ${
                                        data.has_charging ? 'bg-[#E72162]' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            data.has_charging ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="group relative w-full font-semibold py-4 px-6 text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-teal-500 group-hover:translate-x-0 group-hover:translate-y-0 group-disabled:translate-x-1 group-disabled:translate-y-1"></span>
                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-teal-600 group-disabled:bg-gray-100"></span>
                            <span className="relative text-black group-hover:text-white group-disabled:text-gray-400">
                                {processing ? 'RECHERCHE EN COURS...' : 'RECHERCHER'}
                            </span>
                        </button>
                    </form>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white rounded-none p-6 shadow-md text-center">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Réservation instantanée</h3>
                        <p className="text-gray-600 text-sm">Confirmez votre place en quelques secondes</p>
                    </div>

                    <div className="bg-white rounded-none p-6 shadow-md text-center">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Sécurisé</h3>
                        <p className="text-gray-600 text-sm">Paiement sécurisé et places garanties</p>
                    </div>

                    <div className="bg-white rounded-none p-6 shadow-md text-center">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Partout en France</h3>
                        <p className="text-gray-600 text-sm">Des milliers de places disponibles</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
