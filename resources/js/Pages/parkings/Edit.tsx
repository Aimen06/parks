import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { ArrowLeft, Save, Square, Sun, Zap } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';

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
    price_per_hour: number;
    available: boolean;
}

interface Props {
    parking: Parking;
}

interface ParkingData {
    name: string;
    number: string;
    address: string;
    floor: string;
    zip: string;
    city: string;
    latitude: string;
    longitude: string;
    remark: string;
    height: string;
    width: string;
    length: string;
    charge: boolean;
    exterior: boolean;
    box: boolean;
    price_per_hour: string;
    available: boolean;
}

const Edit: React.FC<Props> = ({ parking }) => {
    const [data, setData] = useState<ParkingData>({
        name: parking.name || '',
        number: parking.number || '',
        address: parking.address,
        floor: parking.floor || '',
        zip: parking.zip,
        city: parking.city,
        latitude: parking.latitude?.toString() || '',
        longitude: parking.longitude?.toString() || '',
        remark: parking.remark || '',
        height: parking.height.toString(),
        width: parking.width.toString(),
        length: parking.length.toString(),
        charge: parking.charge,
        exterior: parking.exterior,
        box: parking.box,
        price_per_hour: (parking.price_per_hour / 100).toFixed(2),
        available: parking.available,
    });

    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState<any>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        let val: any = value;

        if (type === 'checkbox') {
            val = (e.target as HTMLInputElement).checked;
        }

        setData((prev) => ({
            ...prev,
            [name]: val,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        // Convertir le prix en centimes
        const priceInCents = Math.round(parseFloat(data.price_per_hour || '0') * 100);

        const formData = {
            name: data.name || null,
            number: data.number || null,
            address: data.address,
            floor: data.floor || null,
            zip: data.zip,
            city: data.city,
            latitude: data.latitude ? parseFloat(data.latitude) : null,
            longitude: data.longitude ? parseFloat(data.longitude) : null,
            remark: data.remark || null,
            height: parseFloat(data.height),
            width: parseFloat(data.width),
            length: parseFloat(data.length),
            charge: data.charge,
            exterior: data.exterior,
            box: data.box,
            price_per_hour: priceInCents,
            available: data.available,
            _method: 'PUT',
        };

        router.post(`/parkings/${parking.id}`, formData, {
            onSuccess: () => {
                setProcessing(false);
            },
            onError: (errors) => {
                setProcessing(false);
                setErrors(errors);
            },
        });
    };

    return (
        <AuthLayout>
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-6">
                    <Button
                        color="gray"
                        size="sm"
                        onClick={() => router.visit('/parkings')}
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour à la liste
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Modifier le parking
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {parking.name || `Parking ${parking.number || parking.id}`}
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Informations générales */}
                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                Informations générales
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom du parking</label>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={handleChange}
                                        placeholder="Ex: Mon parking centre-ville"
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numéro</label>
                                    <TextInput
                                        id="number"
                                        name="number"
                                        type="text"
                                        value={data.number}
                                        onChange={handleChange}
                                        placeholder="Ex: A-123"
                                    />
                                    {errors.number && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.number}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adresse *</label>
                                <TextInput
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={data.address}
                                    onChange={handleChange}
                                    placeholder="Ex: 123 rue de la République"
                                    required
                                />
                                {errors.address && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div>
                                    <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code postal *</label>
                                    <TextInput
                                        id="zip"
                                        name="zip"
                                        type="text"
                                        value={data.zip}
                                        onChange={handleChange}
                                        placeholder="75001"
                                        required
                                        maxLength={5}
                                    />
                                    {errors.zip && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.zip}
                                        </p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ville *</label>
                                    <TextInput
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={data.city}
                                        onChange={handleChange}
                                        placeholder="Paris"
                                        required
                                    />
                                    {errors.city && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.city}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="floor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Étage</label>
                                    <TextInput
                                        id="floor"
                                        name="floor"
                                        type="text"
                                        value={data.floor}
                                        onChange={handleChange}
                                        placeholder="Ex: -2, RDC, 1"
                                    />
                                    {errors.floor && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.floor}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="remark" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Remarques / Instructions</label>
                                <Textarea
                                    id="remark"
                                    name="remark"
                                    value={data.remark}
                                    onChange={handleChange}
                                    placeholder="Ex: Code d'accès, instructions particulières..."
                                    rows={3}
                                />
                            </div>
                        </div>

                        {/* Prix et disponibilité */}
                        <div className="space-y-6">
                            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                    Prix et disponibilité
                                </h2>
                                <div>
                                    <label htmlFor="price_per_hour" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prix par heure (€) *</label>
                                    <TextInput
                                        id="price_per_hour"
                                        name="price_per_hour"
                                        type="number"
                                        step="0.01"
                                        value={data.price_per_hour}
                                        onChange={handleChange}
                                        placeholder="5.00"
                                        required
                                    />
                                    {errors.price_per_hour && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.price_per_hour}
                                        </p>
                                    )}
                                </div>
                                <div className="mt-4 flex items-center">
                                    <Checkbox
                                        id="available"
                                        name="available"
                                        checked={data.available}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="available" className="ml-2">
                                        Disponible à la location
                                    </label>
                                </div>
                            </div>

                            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                    Type de parking
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    Sélectionnez une ou plusieurs options
                                </p>
                                <div className="grid grid-cols-1 gap-3">
                                    <label htmlFor="box" className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                        data.box
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
                                    }`}>
                                        <input
                                            id="box"
                                            name="box"
                                            type="checkbox"
                                            checked={data.box}
                                            onChange={handleChange}
                                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <div className="ml-3 flex items-center">
                                            <Square className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                                            <div>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white block">
                                                    Box fermé
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    Espace sécurisé et fermé
                                                </span>
                                            </div>
                                        </div>
                                    </label>

                                    <label htmlFor="exterior" className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                        data.exterior
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 dark:border-green-400'
                                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
                                    }`}>
                                        <input
                                            id="exterior"
                                            name="exterior"
                                            type="checkbox"
                                            checked={data.exterior}
                                            onChange={handleChange}
                                            className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <div className="ml-3 flex items-center">
                                            <Sun className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                                            <div>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white block">
                                                    Parking extérieur
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    En plein air, à l'extérieur
                                                </span>
                                            </div>
                                        </div>
                                    </label>

                                    <label htmlFor="charge" className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                        data.charge
                                            ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-400'
                                            : 'border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500'
                                    }`}>
                                        <input
                                            id="charge"
                                            name="charge"
                                            type="checkbox"
                                            checked={data.charge}
                                            onChange={handleChange}
                                            className="w-5 h-5 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <div className="ml-3 flex items-center">
                                            <Zap className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                                            <div>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white block">
                                                    Borne de recharge électrique
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    Pour véhicules électriques
                                                </span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Dimensions */}
                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                Dimensions de la place
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="length" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Longueur (m) *</label>
                                    <TextInput
                                        id="length"
                                        name="length"
                                        type="number"
                                        step="0.01"
                                        value={data.length}
                                        onChange={handleChange}
                                        placeholder="5.0"
                                        required
                                    />
                                    {errors.length && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.length}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="width" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Largeur (m) *</label>
                                    <TextInput
                                        id="width"
                                        name="width"
                                        type="number"
                                        step="0.01"
                                        value={data.width}
                                        onChange={handleChange}
                                        placeholder="2.5"
                                        required
                                    />
                                    {errors.width && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.width}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hauteur (m) *</label>
                                    <TextInput
                                        id="height"
                                        name="height"
                                        type="number"
                                        step="0.01"
                                        value={data.height}
                                        onChange={handleChange}
                                        placeholder="2.0"
                                        required
                                    />
                                    {errors.height && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.height}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Coordonnées GPS */}
                        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                Coordonnées GPS
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Optionnel - Pour localiser précisément le parking
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="latitude" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Latitude</label>
                                    <TextInput
                                        id="latitude"
                                        name="latitude"
                                        type="number"
                                        step="any"
                                        value={data.latitude}
                                        onChange={handleChange}
                                        placeholder="48.8566"
                                    />
                                    {errors.latitude && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.latitude}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="longitude" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Longitude</label>
                                    <TextInput
                                        id="longitude"
                                        name="longitude"
                                        type="number"
                                        step="any"
                                        value={data.longitude}
                                        onChange={handleChange}
                                        placeholder="2.3522"
                                    />
                                    {errors.longitude && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.longitude}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex justify-end gap-4">
                        <Button
                            type="button"
                            color="gray"
                            onClick={() => router.visit('/parkings')}
                        >
                            Annuler
                        </button>
                        <button type="submit" disabled={processing} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed">
                            <Save className="w-4 h-4 mr-2" />
                            {processing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Edit;
