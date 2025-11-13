import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { X, Save, Square, Sun, Zap, Upload, Image as ImageIcon, ArrowLeft, Car, CheckCircle } from 'lucide-react';
import { Button } from 'flowbite-react';
import { Switch } from '@/components/ui/switch';
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
    image_1: string | null;
    image_2: string | null;
    image_3: string | null;
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
            {/* Modal overlay */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden bg-gray-900/50 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="relative w-full max-w-6xl">
                    <div className="relative bg-white rounded-lg shadow-xl dark:bg-gray-800">
                        {/* Modal header */}
                        <div className="p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Modifier le parking - {parking.name || `#${parking.number || parking.id}`}
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => router.visit('/parkings')}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Save className="w-4 h-4 mr-1.5" />
                                    {processing ? 'Enregistrement...' : 'Enregistrer'}
                                </button>
                                <Button
                                    type="button"
                                    color="gray"
                                    onClick={() => router.visit('/parkings')}
                                >
                                    Annuler
                                </Button>
                            </div>

                            {/* Switch de disponibilité */}
                            <Switch
                                id="availability-edit"
                                checked={data.available}
                                onChange={(checked) => setData({ ...data, available: checked })}
                                label={`Statut : ${data.available ? 'Disponible' : 'Indisponible'}`}
                                icon={<CheckCircle className="w-5 h-5" />}
                                color={data.available ? 'green' : 'red'}
                            />
                        </div>
                        {/* Modal body */}
                        <div className="p-4 md:p-5">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Colonne gauche */}
                                <div className="space-y-6">
                                    {/* Section: Informations générales */}
                                    <div>
                                        <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                            Informations générales
                                        </h4>
                                        <div className="space-y-4">
                                            {/* Nom et Numéro sur la même ligne */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        Nom
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={data.name}
                                                        onChange={handleChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Ex: Mon parking"
                                                    />
                                                    {errors.name && (
                                                        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                                                            {errors.name}
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        Numéro
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="number"
                                                        name="number"
                                                        value={data.number}
                                                        onChange={handleChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Ex: A-123"
                                                    />
                                                    {errors.number && (
                                                        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                                                            {errors.number}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Adresse */}
                                            <div>
                                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Adresse *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    value={data.address}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="123 rue de la République"
                                                />
                                                {errors.address && (
                                                    <p className="mt-1 text-sm text-red-600 dark:text-red-500">
                                                        {errors.address}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Étage, Code postal, Ville - Optimisé */}
                                            <div className="grid grid-cols-12 gap-4">
                                                <div className="col-span-2">
                                                    <label htmlFor="floor" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        Étage
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="floor"
                                                        name="floor"
                                                        value={data.floor}
                                                        onChange={handleChange}
                                                        maxLength={3}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="-2"
                                                    />
                                                </div>
                                                <div className="col-span-3">
                                                    <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        CP *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="zip"
                                                        name="zip"
                                                        value={data.zip}
                                                        onChange={handleChange}
                                                        required
                                                        maxLength={5}
                                                        pattern="[0-9]{5}"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="75001"
                                                    />
                                                </div>
                                                <div className="col-span-7">
                                                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                        Ville *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="city"
                                                        name="city"
                                                        value={data.city}
                                                        onChange={handleChange}
                                                        required
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Paris"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section: Dimensions - Optimisé */}
                                    <div>
                                        <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                            Dimensions
                                        </h4>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label htmlFor="length" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Longueur (m) *
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="99.9"
                                                    id="length"
                                                    name="length"
                                                    value={data.length}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="5.0"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="width" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Largeur (m) *
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="99.9"
                                                    id="width"
                                                    name="width"
                                                    value={data.width}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="2.5"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Hauteur (m) *
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="99.9"
                                                    id="height"
                                                    name="height"
                                                    value={data.height}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="2.0"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section: Tarif */}
                                    <div>
                                        <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                            Tarif
                                        </h4>
                                        <div>
                                            <label htmlFor="price_per_hour" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Prix/h (€) *
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    step="0.50"
                                                    min="0.50"
                                                    max="999.99"
                                                    id="price_per_hour"
                                                    name="price_per_hour"
                                                    value={data.price_per_hour}
                                                    onChange={handleChange}
                                                    required
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-semibold"
                                                    placeholder="5.00"
                                                />
                                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">€</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section: Options */}
                                    <div>
                                        <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                            Options
                                        </h4>
                                        <div className="space-y-3">
                                            <Switch
                                                id="box"
                                                checked={data.box}
                                                onChange={(checked) => setData({ ...data, box: checked })}
                                                label="Box"
                                                icon={<Square className="w-5 h-5" />}
                                            />
                                            <Switch
                                                id="exterior"
                                                checked={data.exterior}
                                                onChange={(checked) => setData({ ...data, exterior: checked })}
                                                label="Extérieur"
                                                icon={<Sun className="w-5 h-5" />}
                                            />
                                            <Switch
                                                id="charge"
                                                checked={data.charge}
                                                onChange={(checked) => setData({ ...data, charge: checked })}
                                                label="Borne de recharge"
                                                icon={<Zap className="w-5 h-5" />}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Colonne droite */}
                                <div className="space-y-6">
                                    {/* Section: Images */}
                                    <div>
                                        <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                            Images
                                        </h4>
                                        <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 dark:bg-gray-700 dark:border-gray-600">
                                            {(parking.image_1 || parking.image_2 || parking.image_3) ? (
                                                <div className="grid grid-cols-3 gap-2">
                                                    {parking.image_1 && (
                                                        <img
                                                            src={`/storage/${parking.image_1}`}
                                                            alt="Image 1"
                                                            className="w-full h-24 object-cover rounded-lg"
                                                        />
                                                    )}
                                                    {parking.image_2 && (
                                                        <img
                                                            src={`/storage/${parking.image_2}`}
                                                            alt="Image 2"
                                                            className="w-full h-24 object-cover rounded-lg"
                                                        />
                                                    )}
                                                    {parking.image_3 && (
                                                        <img
                                                            src={`/storage/${parking.image_3}`}
                                                            alt="Image 3"
                                                            className="w-full h-24 object-cover rounded-lg"
                                                        />
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                                                    <ImageIcon className="w-12 h-12 mb-2" />
                                                    <p className="text-sm">Aucune image</p>
                                                </div>
                                            )}
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                            La gestion des images sera disponible prochainement
                                        </p>
                                    </div>

                                    {/* Section: Remarques */}
                                    <div>
                                        <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                                            Remarques / Instructions
                                        </h4>
                                        <textarea
                                            id="remark"
                                            name="remark"
                                            value={data.remark}
                                            onChange={handleChange}
                                            rows={6}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Ex: Code d'accès, instructions particulières..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal footer / Actions */}
                        <div className="flex items-center justify-start gap-4 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <Button
                                type="button"
                                color="light"
                                onClick={() => router.visit('/parkings')}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Retour à la liste
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Edit;
