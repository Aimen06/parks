import React, { useState, useRef, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Search, Plus, Edit, Trash2, Eye, MapPin, MoreVertical, Filter, X, ChevronLeft, ChevronRight, Square, Sun, Zap } from 'lucide-react';
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

interface PaginatedParkings {
    data: Parking[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface Props {
    parkings: PaginatedParkings;
    filters: {
        search?: string;
        available?: boolean;
        type?: string;
        sort_by?: string;
        sort_direction?: 'asc' | 'desc';
    };
}

const Index: React.FC<Props> = ({ parkings, filters }) => {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedTypes, setSelectedTypes] = useState<string[]>(
        filters.type ? filters.type.split(',') : []
    );
    const [selectedAvailable, setSelectedAvailable] = useState<string>(
        filters.available !== undefined ? String(filters.available) : ''
    );
    const [sortBy, setSortBy] = useState(filters.sort_by || '');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(filters.sort_direction || 'desc');
    const [deleteModal, setDeleteModal] = useState(false);
    const [parkingToDelete, setParkingToDelete] = useState<number | null>(null);
    const [showNoParkingModal, setShowNoParkingModal] = useState(
        parkings.total === 0 && !filters.search && !filters.type && filters.available === undefined
    );
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const filterDropdownRef = useRef<HTMLDivElement>(null);
    const actionDropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/parkings', {
            search,
            type: selectedTypes.length > 0 ? selectedTypes.join(',') : undefined,
            available: selectedAvailable,
            sort_by: sortBy,
            sort_direction: sortDirection,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSort = (column: string) => {
        let newDirection: 'asc' | 'desc' = 'asc';
        if (sortBy === column && sortDirection === 'asc') {
            newDirection = 'desc';
        }
        setSortBy(column);
        setSortDirection(newDirection);

        router.get('/parkings', {
            search,
            type: selectedTypes.length > 0 ? selectedTypes.join(',') : undefined,
            available: selectedAvailable,
            sort_by: column,
            sort_direction: newDirection,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleType = (type: string) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter(t => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const handleDelete = (id: number) => {
        setParkingToDelete(id);
        setDeleteModal(true);
    };

    const confirmDelete = () => {
        if (parkingToDelete) {
            router.delete(`/parkings/${parkingToDelete}`, {
                onSuccess: () => {
                    setDeleteModal(false);
                    setParkingToDelete(null);
                },
            });
        }
    };

    const getParkingTypes = (parking: Parking) => {
        const types = [];
        if (parking.box) types.push({ label: 'Box', color: 'blue', icon: Square });
        if (parking.exterior) types.push({ label: 'Extérieur', color: 'green', icon: Sun });
        if (parking.charge) types.push({ label: 'Recharge', color: 'yellow', icon: Zap });
        return types;
    };

    const resetFilters = () => {
        setSearch('');
        setSelectedTypes([]);
        setSelectedAvailable('');
        setSortBy('');
        setSortDirection('desc');
        router.get('/parkings', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };


    // Stats basées sur tous les parkings (pas seulement la page actuelle)
    const [stats, setStats] = useState({
        total: parkings.total,
        available: 0,
        unavailable: 0,
        revenue: 0
    });

    // Charger les stats une seule fois au montage du composant
    useEffect(() => {
        // Si on n'a pas de filtres, on calcule les stats depuis les données
        if (!filters.search && !filters.type && filters.available === undefined) {
            const available = parkings.data.filter(p => p.available).length;
            const unavailable = parkings.data.filter(p => !p.available).length;
            const revenue = parkings.data.reduce((sum, p) => sum + p.price_per_hour, 0) / 100;
            setStats({
                total: parkings.total,
                available,
                unavailable,
                revenue
            });
        }
    }, []);

    const handleGoBack = () => {
        window.history.back();
    };

    const applyFilters = () => {
        handleSearch(new Event('submit') as any);
        setFilterDropdownOpen(false);
    };

    const clearSearch = () => {
        setSearch('');
        const params: any = {};
        if (selectedTypes.length > 0) params.type = selectedTypes.join(',');
        if (selectedAvailable) params.available = selectedAvailable;
        if (sortBy) {
            params.sort_by = sortBy;
            params.sort_direction = sortDirection;
        }

        router.get('/parkings', params, {
            preserveState: false,
            preserveScroll: false,
        });
    };

    const getQueryParams = () => {
        const params: any = {
            search,
            type: selectedTypes.length > 0 ? selectedTypes.join(',') : undefined,
            available: selectedAvailable || undefined,
            sort_by: sortBy || undefined,
            sort_direction: sortDirection || undefined,
        };
        return params;
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target as Node)) {
                setFilterDropdownOpen(false);
            }
            if (openDropdownId !== null) {
                const dropdownRef = actionDropdownRefs.current[openDropdownId];
                if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
                    setOpenDropdownId(null);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openDropdownId]);

    const getBadgeClasses = (color: string) => {
        const baseClasses = "text-xs font-medium px-2.5 py-0.5 rounded";
        switch (color) {
            case 'blue':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`;
            case 'green':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
            case 'yellow':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`;
            case 'red':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
        }
    };

    return (
        <AuthLayout>
            <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
                {/* Header Section */}
                <div className="mb-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                                Mes parkings
                            </h1>
                            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
                                Gérez vos places de parking
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0">
                            <button
                                onClick={() => router.visit('/parkings/create')}
                                type="button"
                                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Ajouter un parking
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow dark:bg-gray-800 sm:px-6 sm:py-6">
                        <dt>
                            <div className="absolute rounded-md bg-blue-500 p-3">
                                <MapPin className="h-6 w-6 text-white" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                Total parkings
                            </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline">
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {stats.total}
                            </p>
                        </dd>
                    </div>

                    <div className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow dark:bg-gray-800 sm:px-6 sm:py-6">
                        <dt>
                            <div className="absolute rounded-md bg-green-500 p-3">
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                Disponibles
                            </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline">
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {stats.available}
                            </p>
                        </dd>
                    </div>

                    <div className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow dark:bg-gray-800 sm:px-6 sm:py-6">
                        <dt>
                            <div className="absolute rounded-md bg-red-500 p-3">
                                <X className="h-6 w-6 text-white" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                Indisponibles
                            </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline">
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {stats.unavailable}
                            </p>
                        </dd>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-1/2">
                            <form onSubmit={handleSearch} className="flex items-center">
                                <label htmlFor="simple-search" className="sr-only">Rechercher</label>
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        id="simple-search"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Rechercher un parking..."
                                    />
                                    {search && (
                                        <button
                                            type="button"
                                            onClick={clearSearch}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <div className="relative" ref={filterDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filtres
                                    {(selectedTypes.length > 0 || selectedAvailable) && (
                                        <span className="ml-2 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                                            {selectedTypes.length + (selectedAvailable ? 1 : 0)}
                                        </span>
                                    )}
                                </button>

                                {filterDropdownOpen && (
                                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700">
                                        <div className="p-4">
                                            <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Options de parking</h3>
                                            <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">Sélectionnez une ou plusieurs options</p>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-center">
                                                    <input
                                                        id="type-box"
                                                        type="checkbox"
                                                        checked={selectedTypes.includes('box')}
                                                        onChange={() => toggleType('box')}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                    />
                                                    <label htmlFor="type-box" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-1">
                                                        <Square className="w-3 h-3" />
                                                        Box
                                                    </label>
                                                </li>
                                                <li className="flex items-center">
                                                    <input
                                                        id="type-exterior"
                                                        type="checkbox"
                                                        checked={selectedTypes.includes('exterior')}
                                                        onChange={() => toggleType('exterior')}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                    />
                                                    <label htmlFor="type-exterior" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-1">
                                                        <Sun className="w-3 h-3" />
                                                        Extérieur
                                                    </label>
                                                </li>
                                                <li className="flex items-center">
                                                    <input
                                                        id="type-charge"
                                                        type="checkbox"
                                                        checked={selectedTypes.includes('charge')}
                                                        onChange={() => toggleType('charge')}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                    />
                                                    <label htmlFor="type-charge" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-1">
                                                        <Zap className="w-3 h-3" />
                                                        Recharge
                                                    </label>
                                                </li>
                                            </ul>

                                            <h3 className="mb-3 mt-4 text-sm font-medium text-gray-900 dark:text-white">Disponibilité</h3>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-center">
                                                    <input
                                                        id="avail-all"
                                                        type="radio"
                                                        name="availability"
                                                        checked={selectedAvailable === ''}
                                                        onChange={() => setSelectedAvailable('')}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                    />
                                                    <label htmlFor="avail-all" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tous</label>
                                                </li>
                                                <li className="flex items-center">
                                                    <input
                                                        id="avail-yes"
                                                        type="radio"
                                                        name="availability"
                                                        checked={selectedAvailable === 'true'}
                                                        onChange={() => setSelectedAvailable('true')}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                    />
                                                    <label htmlFor="avail-yes" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Disponible</label>
                                                </li>
                                                <li className="flex items-center">
                                                    <input
                                                        id="avail-no"
                                                        type="radio"
                                                        name="availability"
                                                        checked={selectedAvailable === 'false'}
                                                        onChange={() => setSelectedAvailable('false')}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                    />
                                                    <label htmlFor="avail-no" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Indisponible</label>
                                                </li>
                                            </ul>

                                            <div className="flex items-center space-x-2 mt-4">
                                                <button
                                                    onClick={applyFilters}
                                                    className="flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                >
                                                    Appliquer
                                                </button>
                                                <button
                                                    onClick={resetFilters}
                                                    className="flex-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-3 py-2 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                                >
                                                    Réinitialiser
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile/Tablet Cards View */}
                <div className="mt-6 lg:hidden">
                    {parkings.data.length > 0 ? (
                        <div className="space-y-4">
                            {parkings.data.map((parking, index) => {
                                const parkingTypes = getParkingTypes(parking);
                                const rowNumber = (parkings.current_page - 1) * parkings.per_page + index + 1;
                                return (
                                    <div key={parking.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                                        {/* Header */}
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {parking.name || `Parking ${parking.id}`}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    #{parking.number || rowNumber}
                                                </p>
                                            </div>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                parking.available
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                            }`}>
                                                {parking.available ? 'Disponible' : 'Indisponible'}
                                            </span>
                                        </div>

                                        {/* Location */}
                                        <div className="mb-3">
                                            <div className="flex items-start gap-2">
                                                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                                <div className="text-sm">
                                                    <p className="text-gray-900 dark:text-white">{parking.address}</p>
                                                    <p className="text-gray-500 dark:text-gray-400">{parking.zip} {parking.city}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Options */}
                                        {parkingTypes.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {parkingTypes.map((type, idx) => {
                                                    const Icon = type.icon;
                                                    return (
                                                        <span key={idx} className={`inline-flex items-center gap-1 ${getBadgeClasses(type.color)}`}>
                                                            <Icon className="w-3 h-3" />
                                                            {type.label}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Price and Actions */}
                                        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                                                {(parking.price_per_hour / 100).toFixed(2)}€<span className="text-sm font-normal text-gray-500">/h</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => router.visit(`/parkings/${parking.id}`)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700 rounded"
                                                    title="Voir"
                                                >
                                                    <Eye className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => router.visit(`/parkings/${parking.id}/edit`)}
                                                    className="p-2 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-gray-700 rounded"
                                                    title="Modifier"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(parking.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-700 rounded"
                                                    title="Supprimer"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
                            <MapPin className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4 mx-auto" />
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Aucun parking trouvé</h3>
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                {filters.search || filters.type || filters.available !== undefined
                                    ? 'Essayez de modifier vos critères de recherche'
                                    : 'Commencez par ajouter votre premier parking'}
                            </p>
                            {!filters.search && !filters.type && filters.available === undefined && (
                                <button
                                    onClick={() => router.visit('/parkings/create')}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Ajouter un parking
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Desktop Table View */}
                <div className="mt-6 bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden hidden lg:block">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-center">#</th>
                                    <th scope="col" className="px-6 py-3">
                                        <button
                                            onClick={() => handleSort('name')}
                                            className="flex items-center hover:text-blue-600 dark:hover:text-blue-500"
                                        >
                                            Nom
                                            <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                            </svg>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <button
                                            onClick={() => handleSort('number')}
                                            className="flex items-center hover:text-blue-600 dark:hover:text-blue-500"
                                        >
                                            Numéro
                                            <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                            </svg>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <button
                                            onClick={() => handleSort('city')}
                                            className="flex items-center hover:text-blue-600 dark:hover:text-blue-500"
                                        >
                                            Localisation
                                            <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                            </svg>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-6 py-3">Options</th>
                                    <th scope="col" className="px-6 py-3">
                                        <button
                                            onClick={() => handleSort('price_per_hour')}
                                            className="flex items-center hover:text-blue-600 dark:hover:text-blue-500"
                                        >
                                            Prix/h
                                            <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                            </svg>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <button
                                            onClick={() => handleSort('available')}
                                            className="flex items-center hover:text-blue-600 dark:hover:text-blue-500"
                                        >
                                            Statut
                                            <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                            </svg>
                                        </button>
                                    </th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parkings.data.length > 0 ? (
                                    parkings.data.map((parking, index) => {
                                        const parkingTypes = getParkingTypes(parking);
                                        const rowNumber = (parkings.current_page - 1) * parkings.per_page + index + 1;
                                        return (
                                            <tr key={parking.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-4 py-4 text-center font-medium text-gray-900 dark:text-white">
                                                    {rowNumber}
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <span className="font-semibold">{parking.name || `Parking ${parking.id}`}</span>
                                                </th>
                                                <td className="px-6 py-4 text-gray-900 dark:text-white">
                                                    {parking.number || '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm">{parking.address}</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">{parking.zip} {parking.city}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {parkingTypes.length > 0 ? (
                                                            parkingTypes.map((type, idx) => {
                                                                const Icon = type.icon;
                                                                return (
                                                                    <span key={idx} className={`inline-flex items-center gap-1 ${getBadgeClasses(type.color)}`}>
                                                                        <Icon className="w-3 h-3" />
                                                                        {type.label}
                                                                    </span>
                                                                );
                                                            })
                                                        ) : (
                                                            <span className="text-xs text-gray-400 dark:text-gray-500 italic">
                                                                Aucune
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                    {(parking.price_per_hour / 100).toFixed(2)}€
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center">
                                                        <span className={`mr-1 h-2 w-2 rounded-full ${parking.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                        {parking.available ? 'Disponible' : 'Indisponible'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="relative" ref={el => actionDropdownRefs.current[parking.id] = el}>
                                                        <button
                                                            onClick={() => setOpenDropdownId(openDropdownId === parking.id ? null : parking.id)}
                                                            className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                        >
                                                            <MoreVertical className="w-5 h-5" />
                                                        </button>

                                                        {openDropdownId === parking.id && (
                                                            <div className="absolute right-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                                                    <li>
                                                                        <button
                                                                            onClick={() => router.visit(`/parkings/${parking.id}`)}
                                                                            className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                        >
                                                                            <Eye className="mr-2 h-4 w-4" />
                                                                            Voir les détails
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button
                                                                            onClick={() => router.visit(`/parkings/${parking.id}/edit`)}
                                                                            className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                        >
                                                                            <Edit className="mr-2 h-4 w-4" />
                                                                            Modifier
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                                <div className="py-1">
                                                                    <button
                                                                        onClick={() => handleDelete(parking.id)}
                                                                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-500 dark:hover:text-red-400"
                                                                    >
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Supprimer
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center">
                                                <MapPin className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
                                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Aucun parking trouvé</h3>
                                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                                    {filters.search || filters.type || filters.available !== undefined
                                                        ? 'Essayez de modifier vos critères de recherche'
                                                        : 'Commencez par ajouter votre premier parking'}
                                                </p>
                                                {!filters.search && !filters.type && filters.available === undefined && (
                                                    <button
                                                        onClick={() => router.visit('/parkings/create')}
                                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Ajouter un parking
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {parkings.last_page > 1 && (
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Affichage de <span className="font-semibold text-gray-900 dark:text-white">{parkings.from}</span> à <span className="font-semibold text-gray-900 dark:text-white">{parkings.to}</span> sur <span className="font-semibold text-gray-900 dark:text-white">{parkings.total}</span>
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <button
                                        onClick={() => router.get(`/parkings?page=${parkings.current_page - 1}`, getQueryParams())}
                                        disabled={parkings.current_page === 1}
                                        className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                </li>
                                {(() => {
                                    const pages = [];
                                    const maxVisible = 5;
                                    let startPage = Math.max(1, parkings.current_page - Math.floor(maxVisible / 2));
                                    let endPage = Math.min(parkings.last_page, startPage + maxVisible - 1);

                                    if (endPage - startPage < maxVisible - 1) {
                                        startPage = Math.max(1, endPage - maxVisible + 1);
                                    }

                                    // Première page
                                    if (startPage > 1) {
                                        pages.push(
                                            <li key={1}>
                                                <button
                                                    onClick={() => router.get(`/parkings?page=1`, getQueryParams())}
                                                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    1
                                                </button>
                                            </li>
                                        );
                                        if (startPage > 2) {
                                            pages.push(
                                                <li key="dots-start">
                                                    <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                                        ...
                                                    </span>
                                                </li>
                                            );
                                        }
                                    }

                                    // Pages visibles
                                    for (let i = startPage; i <= endPage; i++) {
                                        pages.push(
                                            <li key={i}>
                                                <button
                                                    onClick={() => router.get(`/parkings?page=${i}`, getQueryParams())}
                                                    className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                                                        i === parkings.current_page
                                                            ? 'text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                                    }`}
                                                >
                                                    {i}
                                                </button>
                                            </li>
                                        );
                                    }

                                    // Dernière page
                                    if (endPage < parkings.last_page) {
                                        if (endPage < parkings.last_page - 1) {
                                            pages.push(
                                                <li key="dots-end">
                                                    <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                                        ...
                                                    </span>
                                                </li>
                                            );
                                        }
                                        pages.push(
                                            <li key={parkings.last_page}>
                                                <button
                                                    onClick={() => router.get(`/parkings?page=${parkings.last_page}`, getQueryParams())}
                                                    className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    {parkings.last_page}
                                                </button>
                                            </li>
                                        );
                                    }

                                    return pages;
                                })()}
                                <li>
                                    <button
                                        onClick={() => router.get(`/parkings?page=${parkings.current_page + 1}`, getQueryParams())}
                                        disabled={parkings.current_page === parkings.last_page}
                                        className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>

            {/* Delete Modal */}
            {deleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md h-auto">
                        <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            <button
                                onClick={() => setDeleteModal(false)}
                                type="button"
                                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <svg className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="mb-4 text-gray-500 dark:text-gray-300">Êtes-vous sûr de vouloir supprimer ce parking ?</p>
                            <div className="flex justify-center items-center space-x-4">
                                <button
                                    onClick={() => setDeleteModal(false)}
                                    type="button"
                                    className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    type="button"
                                    className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* No Parking Modal */}
            {showNoParkingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                onClick={() => setShowNoParkingModal(false)}
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <div className="p-6 text-center">
                                <MapPin className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Vous n'avez pas encore de parkings. Souhaitez-vous en ajouter un maintenant ?
                                </h3>
                                <button
                                    onClick={() => router.visit('/parkings/create')}
                                    className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Ajouter un parking
                                </button>
                                <button
                                    onClick={handleGoBack}
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
};

export default Index;
