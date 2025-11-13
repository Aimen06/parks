import React, { useState } from 'react';
import { router } from '@inertiajs/react';

// --- Imports Flowbite (Complets et Corrigés) ---
import {
    Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Pagination,
    Dropdown,
    TextInput,
    Badge,
    Checkbox,
    Tooltip
} from 'flowbite-react';
// --- Imports Heroicons (Corrigés) ---
import {
    HiSearch,
    HiPlus,
    HiPencil,
    HiTrash,
    HiFilter,
    HiCheckCircle,
    HiXCircle,
    HiChevronDown,
    HiLocationMarker, // Corrigé (n'est pas HiMapPin)
    HiPhotograph
} from 'react-icons/hi';

// Layouts et Modales
import AuthLayout from '@/layouts/AuthLayout';
import DeleteModal from '@/components/auth/DeleteModal';
import NoParkingModal from '@/components/auth/NoParkingModal';
import ParkingDetailsModal from '@/components/auth/ParkingDetailsModal';
import CreateParkingModal from '@/components/auth/CreateParkingModal';
import EditParkingModal from '@/components/auth/EditParkingModal'; // La nouvelle modale

// Vos icônes personnalisées
import boxIcon from '../../../assets/images/box-icon.svg';
import exteriorIcon from '../../../assets/images/exterior-park-icon.svg';
import chargeIcon from '../../../assets/images/icone-borne.svg';

// --- INTERFACES ---

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
    image_1: string | null;
    image_2: string | null;
    image_3: string | null;
    owner?: Owner;
    created_at: string;
    updated_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedParkings {
    data: Parking[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginationLink[];
    path: string;
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
    stats: {
        available: number;
        unavailable: number;
    };
}

// Interface pour les paramètres de requête (corrigée pour TS)
interface QueryParams {
    [key: string]: string | number | undefined;
    page?: number;
    search?: string;
    type?: string;
    available?: string;
    sort_by?: string;
    sort_direction?: 'asc' | 'desc';
}

// --- COMPOSANTS INTERNES ---

// Composant pour l'icône de tri
const SortIcon: React.FC<{ active: boolean; direction: 'asc' | 'desc' }> = ({ active, direction }) => {
    return (
        <HiChevronDown
            className={`
                h-4 w-4 text-gray-500 transition-all duration-200
                ${active ? 'opacity-100' : 'opacity-0'}
                ${direction === 'asc' ? 'rotate-180' : 'rotate-0'}
            `}
        />
    );
};

// Composant pour le message "Aucun parking trouvé" (évite la duplication)
const NoParkingsFound: React.FC<{ filtersActive: boolean; onCreate: () => void; }> = ({ filtersActive, onCreate }) => (
    <div className="flex flex-col items-center justify-center">
        <HiLocationMarker className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Aucun parking trouvé</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">
            {filtersActive ? 'Essayez de modifier vos critères de recherche.' : 'Commencez par ajouter votre premier parking.'}
        </p>
        {!filtersActive && (
            <Button onClick={onCreate} color="blue">
                <HiPlus className="w-4 h-4 mr-2" />
                Ajouter un parking
            </Button>
        )}
    </div>
);

// --- COMPOSANT PRINCIPAL DE LA PAGE ---

const Index: React.FC<Props> = ({ parkings, filters, stats }) => {

    // States pour les filtres
    const [search, setSearch] = useState(filters.search || '');
    const [selectedTypes, setSelectedTypes] = useState<string[]>(
        filters.type ? filters.type.split(',') : []
    );
    const [selectedAvailable, setSelectedAvailable] = useState<string>(
        filters.available !== undefined ? String(filters.available) : ''
    );

    // States pour le tri
    const [sortBy, setSortBy] = useState(filters.sort_by || '');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(filters.sort_direction || 'desc');

    // States pour les modales
    const [deleteModal, setDeleteModal] = useState(false);
    const [parkingToDelete, setParkingToDelete] = useState<number | null>(null);
    const [showNoParkingModal, setShowNoParkingModal] = useState(
        parkings.total === 0 && !filters.search && !filters.type && filters.available === undefined
    );
    const [selectedParking, setSelectedParking] = useState<Parking | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [parkingToEdit, setParkingToEdit] = useState<Parking | null>(null);

    // Fonction pour appliquer les filtres et la recherche
    const applySearchAndFilters = (preserveState = true) => {
        const queryParams: QueryParams = {};

        if (search) queryParams.search = search;
        if (selectedTypes.length > 0) queryParams.type = selectedTypes.join(',');
        if (selectedAvailable) queryParams.available = selectedAvailable;
        if (sortBy) queryParams.sort_by = sortBy;
        if (sortDirection) queryParams.sort_direction = sortDirection;

        router.get('/parkings', queryParams, {
            preserveState: preserveState,
            preserveScroll: true,
        });
    };

    // Handler pour la soumission du formulaire de recherche
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applySearchAndFilters();
    };

    // Handler pour le bouton "Appliquer" des filtres
    const applyFilters = () => {
        applySearchAndFilters();
    };

    // Handler pour le tri des colonnes
    const handleSort = (column: string) => {
        let newDirection: 'asc' | 'desc' = 'asc';
        if (sortBy === column && sortDirection === 'asc') {
            newDirection = 'desc';
        }
        setSortBy(column);
        setSortDirection(newDirection);

        const queryParams: QueryParams = {
            sort_by: column,
            sort_direction: newDirection,
        };

        if (search) queryParams.search = search;
        if (selectedTypes.length > 0) queryParams.type = selectedTypes.join(',');
        if (selectedAvailable) queryParams.available = selectedAvailable;

        router.get('/parkings', queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Handler pour les checkboxes de type
    const toggleType = (type: string) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter(t => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    // Handler pour ouvrir la modale de suppression
    const handleDelete = (id: number) => {
        setParkingToDelete(id);
        setDeleteModal(true);
    };

    // Handler pour ouvrir la modale de détails
    const handleRowClick = (parking: Parking) => {
        setSelectedParking(parking);
        setShowDetailsModal(true);
    };

    // Handler pour fermer la modale de détails
    const closeDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedParking(null);
    };

    // Handler pour ouvrir la modale d'édition (depuis la modale détails)
    const handleEditFromModal = (parking: Parking) => {
        closeDetailsModal();
        openEditModal(parking);
    };

    // Handler pour ouvrir la modale d'édition (directement)
    const openEditModal = (parking: Parking) => {
        setParkingToEdit(parking);
        setShowEditModal(true);
    };

    // Handler pour la suppression (depuis la modale détails)
    const handleDeleteFromModal = () => {
        if (selectedParking) {
            closeDetailsModal();
            handleDelete(selectedParking.id);
        }
    };

    // Handler pour le toggle de disponibilité (dans la modale détails)
    const handleToggleAvailability = (checked: boolean) => {
        if (selectedParking) {
            // Exclure les objets imbriqués pour la requête PUT
            const {
                owner: _owner,
                created_at: _createdAt,
                updated_at: _updatedAt,
                ...payload
            } = selectedParking;

            router.put(route('parkings.update', selectedParking.id), {
                ...payload,
                available: checked,
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    // Met à jour le state de la modale en local
                    setSelectedParking({ ...selectedParking, available: checked });
                    // Inertia rafraîchira la prop 'parkings' pour la liste
                },
            });
        }
    };

    // Handler pour confirmer la suppression
    const confirmDelete = () => {
        if (parkingToDelete) {
            router.delete(route('parkings.destroy', parkingToDelete), {
                onSuccess: () => {
                    setDeleteModal(false);
                    setParkingToDelete(null);
                },
            });
        }
    };

    // Handler pour réinitialiser les filtres
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

    // Handler pour la pagination Flowbite
    const onPageChange = (page: number) => {
        const queryParams: QueryParams = { page };

        if (search) queryParams.search = search;
        if (selectedTypes.length > 0) queryParams.type = selectedTypes.join(',');
        if (selectedAvailable) queryParams.available = selectedAvailable;
        if (sortBy) queryParams.sort_by = sortBy;
        if (sortDirection) queryParams.sort_direction = sortDirection;

        router.get(parkings.path, queryParams, { preserveState: true });
    };

    const filtersActive = !!filters.search || !!filters.type || filters.available !== undefined;

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
                            <Button onClick={() => setShowCreateModal(true)} color="blue">
                                <HiPlus className="w-4 h-4 mr-2" />
                                Ajouter un parking
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <div className="flex justify-between">
                            <div>
                                <p className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                    {filtersActive ? 'Résultats' : 'Total parkings'}
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {parkings.total}
                                </p>
                            </div>
                            <div className="flex-shrink-0 rounded-md bg-blue-500 p-3 h-12 w-12 items-center justify-center">
                                <HiLocationMarker className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex justify-between">
                            <div>
                                <p className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Disponibles (Total)
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats.available}
                                </p>
                            </div>
                            <div className="flex-shrink-0 rounded-md bg-green-500 p-3 h-12 w-12 items-center justify-center">
                                <HiCheckCircle className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex justify-between">
                            <div>
                                <p className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Indisponibles (Total)
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats.unavailable}
                                </p>
                            </div>
                            <div className="flex-shrink-0 rounded-md bg-red-500 p-3 h-12 w-12 items-center justify-center">
                                <HiXCircle className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Search and Filter Section */}
                <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-1/2">
                            <form onSubmit={handleSearch}>
                                <TextInput
                                    id="simple-search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    icon={HiSearch}
                                    placeholder="Rechercher (nom, adresse, ville...)"
                                    type="text"
                                    sizing="md"
                                />
                            </form>
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <Dropdown
                                label={
                                    <span className="flex items-center">
                                        <HiFilter className="h-4 w-4 mr-2" />
                                        Filtres
                                        {(selectedTypes.length > 0 || selectedAvailable) && (
                                            <span className="ml-2 inline-flex items-center justify-center w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                                                {selectedTypes.length + (selectedAvailable ? 1 : 0)}
                                            </span>
                                        )}
                                    </span>
                                }
                                color="light"
                                dismissOnClick={false}
                            >
                                <div className="p-4 w-56">
                                    <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Options</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <Checkbox id="type-box" checked={selectedTypes.includes('box')} onChange={() => toggleType('box')} />
                                            <label htmlFor="type-box" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-1">
                                                <img src={boxIcon} alt="Box" className="h-5 w-5" /> Box
                                            </label>
                                        </li>
                                        <li className="flex items-center">
                                            <Checkbox id="type-exterior" checked={selectedTypes.includes('exterior')} onChange={() => toggleType('exterior')} />
                                            <label htmlFor="type-exterior" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-1">
                                                <img src={exteriorIcon} alt="Extérieur" className="h-5 w-5" /> Extérieur
                                            </label>
                                        </li>
                                        <li className="flex items-center">
                                            <Checkbox id="type-charge" checked={selectedTypes.includes('charge')} onChange={() => toggleType('charge')} />
                                            <label htmlFor="type-charge" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 flex items-center gap-1">
                                                <img src={chargeIcon} alt="Recharge" className="h-5 w-5" /> Recharge
                                            </label>
                                        </li>
                                    </ul>

                                    <h3 className="mb-3 mt-4 text-sm font-medium text-gray-900 dark:text-white">Disponibilité</h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center">
                                            <input id="avail-all" type="radio" name="availability" checked={selectedAvailable === ''} onChange={() => setSelectedAvailable('')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="avail-all" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tous</label>
                                        </li>
                                        <li className="flex items-center">
                                            <input id="avail-yes" type="radio" name="availability" checked={selectedAvailable === 'true'} onChange={() => setSelectedAvailable('true')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="avail-yes" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Disponible</label>
                                        </li>
                                        <li className="flex items-center">
                                            <input id="avail-no" type="radio" name="availability" checked={selectedAvailable === 'false'} onChange={() => setSelectedAvailable('false')} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="avail-no" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Indisponible</label>
                                        </li>
                                    </ul>
                                    <div className="flex items-center space-x-2 mt-4">
                                        <Button size="sm" color="blue" onClick={applyFilters}>Appliquer</Button>
                                        <Button size="sm" color="light" onClick={resetFilters}>Réinitialiser</Button>
                                    </div>
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                {/* Vue Mobile/Tablet <Card> */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                    {parkings.data.length > 0 ? (
                        parkings.data.map((parking) => {
                            return (
                                <Card key={parking.id} onClick={() => handleRowClick(parking)} className="cursor-pointer">
                                    <div className="flex justify-between items-start mb-3">
                                        {parking.image_1 ? (
                                            <img src={`/storage/${parking.image_1}`} alt={parking.name || 'Parking'} className="h-10 w-16 object-cover rounded-md border border-gray-200 dark:border-gray-700" />
                                        ) : (
                                            <div className="h-10 w-16 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 flex-shrink-0">
                                                <HiPhotograph className="w-5 h-5" />
                                            </div>
                                        )}
                                        <Badge color={parking.available ? 'success' : 'failure'} icon={parking.available ? HiCheckCircle : HiXCircle}>
                                            {parking.available ? 'Disponible' : 'Indisponible'}
                                        </Badge>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{parking.name || `Parking ${parking.id}`}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{parking.address}, {parking.zip} {parking.city}</p>
                                    </div>

                                    <div className="flex items-center gap-2 my-3">
                                        {parking.box && <Tooltip content="Box fermé"><img src={boxIcon} alt="Box" className="h-6 w-6" /></Tooltip>}
                                        {parking.exterior && <Tooltip content="Extérieur"><img src={exteriorIcon} alt="Extérieur" className="h-6 w-6" /></Tooltip>}
                                        {parking.charge && <Tooltip content="Borne"><img src={chargeIcon} alt="Recharge" className="h-6 w-6" /></Tooltip>}
                                    </div>

                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                                            {(parking.price_per_hour / 100).toFixed(2)} €/h
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <Button color="yellow" size="sm" onClick={(e) => { e.stopPropagation(); openEditModal(parking); }}>
                                                <HiPencil className="h-4 w-4" />
                                            </Button>
                                            <Button color="red" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(parking.id); }}>
                                                <HiTrash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })
                    ) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center md:col-span-2">
                            <NoParkingsFound filtersActive={filtersActive} onCreate={() => setShowCreateModal(true)} />
                        </div>
                    )}
                </div>

                {/* Vue Desktop <Table> */}
                <div className="mt-6 bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden hidden lg:block">
                    <div className="overflow-x-auto">
                        <Table hoverable={true}>
                            <TableHead>
                                <TableRow>
                                    <TableHeadCell>Image</TableHeadCell>
                                    <TableHeadCell className="text-center">#</TableHeadCell>
                                    <TableHeadCell onClick={() => handleSort('name')} className="cursor-pointer">
                                        <div className="flex items-center gap-1">Nom <SortIcon active={sortBy === 'name'} direction={sortDirection} /></div>
                                    </TableHeadCell>
                                    <TableHeadCell onClick={() => handleSort('number')} className="cursor-pointer">
                                        <div className="flex items-center gap-1">Numéro <SortIcon active={sortBy === 'number'} direction={sortDirection} /></div>
                                    </TableHeadCell>
                                    <TableHeadCell onClick={() => handleSort('city')} className="cursor-pointer">
                                        <div className="flex items-center gap-1">Localisation <SortIcon active={sortBy === 'city'} direction={sortDirection} /></div>
                                    </TableHeadCell>
                                    <TableHeadCell>Options</TableHeadCell>
                                    <TableHeadCell onClick={() => handleSort('price_per_hour')} className="cursor-pointer">
                                        <div className="flex items-center gap-1">Prix/h <SortIcon active={sortBy === 'price_per_hour'} direction={sortDirection} /></div>
                                    </TableHeadCell>
                                    <TableHeadCell>Statut</TableHeadCell>
                                    <TableHeadCell>Actions</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {parkings.data.length > 0 ? (
                                    parkings.data.map((parking, index) => {
                                        const rowNumber = (parkings.current_page - 1) * parkings.per_page + index + 1;
                                        return (
                                            <TableRow key={parking.id} onClick={() => handleRowClick(parking)} className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                                                <TableCell>
                                                    {parking.image_1 ? (
                                                        <img src={`/storage/${parking.image_1}`} alt={parking.name || 'Parking'} className="h-10 w-16 object-cover rounded-md border border-gray-200 dark:border-gray-700" />
                                                    ) : (
                                                        <div className="h-10 w-16 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                                            <HiPhotograph className="w-5 h-5" />
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-center font-medium text-gray-900 dark:text-white">{rowNumber}</TableCell>
                                                <TableCell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {parking.name || `Parking ${parking.id}`}
                                                </TableCell>
                                                <TableCell>{parking.number || '-'}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm">{parking.address}</span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">{parking.zip} {parking.city}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        {parking.box && <Tooltip content="Box fermé"><img src={boxIcon} alt="Box" className="h-6 w-6" /></Tooltip>}
                                                        {parking.exterior && <Tooltip content="Extérieur"><img src={exteriorIcon} alt="Extérieur" className="h-6 w-6" /></Tooltip>}
                                                        {parking.charge && <Tooltip content="Borne"><img src={chargeIcon} alt="Recharge" className="h-6 w-6" /></Tooltip>}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium text-gray-900 dark:text-white">{(parking.price_per_hour / 100).toFixed(2)} €</TableCell>
                                                <TableCell>
                                                    <Badge color={parking.available ? 'success' : 'failure'} icon={parking.available ? HiCheckCircle : HiXCircle}>
                                                        {parking.available ? 'Disponible' : 'Indisponible'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-x-2">
                                                        <Button color="yellow" size="sm" onClick={(e) => { e.stopPropagation(); openEditModal(parking); }}>
                                                            <HiPencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button color="red" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(parking.id); }}>
                                                            <HiTrash className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={9} className="py-12 text-center">
                                            <NoParkingsFound filtersActive={filtersActive} onCreate={() => setShowCreateModal(true)} />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Pagination */}
                {parkings.last_page > 1 && (
                    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Affichage de <span className="font-semibold text-gray-900 dark:text-white">{parkings.from}</span>
                            {' '}à <span className="font-semibold text-gray-900 dark:text-white">{parkings.to}</span>
                            {' '}sur <span className="font-semibold text-gray-900 dark:text-white">{parkings.total}</span>
                        </span>

                        <Pagination
                            currentPage={parkings.current_page}
                            totalPages={parkings.last_page}
                            onPageChange={onPageChange}
                            showIcons
                        />
                    </nav>
                )}
            </div>

            {/* --- SECTION DES MODALES --- */}

            {/* Modale de Détails */}
            <ParkingDetailsModal
                isOpen={showDetailsModal}
                parking={selectedParking}
                onClose={closeDetailsModal}
                onEdit={() => handleEditFromModal(selectedParking!)}
                onDelete={handleDeleteFromModal}
                onToggleAvailability={handleToggleAvailability}
            />

            {/* Modale de Création */}
            <CreateParkingModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
            />

            {/* Modale d'Édition (la nouvelle) */}
            <EditParkingModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                parking={parkingToEdit}
            />

            {/* Modale de Suppression */}
            <DeleteModal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                onConfirm={confirmDelete}
                parking={parkings.data.find(p => p.id === parkingToDelete)}
            />

            {/* Modale pour "Aucun Parking" */}
            <NoParkingModal
                isOpen={showNoParkingModal}
                onClose={() => setShowNoParkingModal(false)}
                onOpenCreateModal={() => setShowCreateModal(true)}
            />
        </AuthLayout>
    );
};

export default Index;
