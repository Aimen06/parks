import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { ArrowLeft, Save, Square, Sun, Zap } from 'lucide-react';
import { Button } from 'flowbite-react';
import { Switch } from '@/components/ui/switch';
import AuthLayout from '@/layouts/AuthLayout';

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

const Create: React.FC = () => {
    const [data, setData] = useState<ParkingData>({
        name: '',
        number: '',
        address: '',
        floor: '',
        zip: '',
        city: '',
        latitude: '',
        longitude: '',
        remark: '',
        height: '',
        width: '',
        length: '',
        charge: false,
        exterior: false,
        box: false,
        price_per_hour: '',
        available: true,
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
        };

        router.post('/parkings', formData, {
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
                    <button
                        onClick={() => router.visit('/parkings')}
                        type="button"
                        className="mb-4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 inline-flex items-center"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour à la liste
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Ajouter un parking
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Renseignez les informations de votre place de parking
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Informations générales */}
                        <div className="lg:col-span-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                Informations générales
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom du parking</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={data.name}
                                        onChange={handleChange}
                                        placeholder="Ex: Mon parking centre-ville"
                                    
                                        className={`bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Numéro</label>
                                    <input
                                        id="number"
                                        name="number"
                                        type="text"
                                        value={data.number}
                                        onChange={handleChange}
                                        placeholder="Ex: A-123"
                                    
                                        className={`bg-gray-50 border ${errors.number ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={data.address}
                                    onChange={handleChange}
                                    placeholder="Ex: 123 rue de la République"
                                    required
                                
                                        className={`bg-gray-50 border ${errors.address ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
                                    <input
                                        id="zip"
                                        name="zip"
                                        type="text"
                                        value={data.zip}
                                        onChange={handleChange}
                                        placeholder="75001"
                                        required
                                        maxLength={5}
                                    
                                        className={`bg-gray-50 border ${errors.zip ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                    {errors.zip && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.zip}
                                        </p>
                                    )}
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ville *</label>
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={data.city}
                                        onChange={handleChange}
                                        placeholder="Paris"
                                        required
                                    
                                        className={`bg-gray-50 border ${errors.city ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
                                    <input
                                        id="floor"
                                        name="floor"
                                        type="text"
                                        value={data.floor}
                                        onChange={handleChange}
                                        placeholder="Ex: -2, RDC, 1"
                                    
                                        className={`bg-gray-50 border ${errors.floor ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
                                <textarea
                                    id="remark"
                                    name="remark"
                                    value={data.remark}
                                    onChange={handleChange}
                                    placeholder="Ex: Code d'accès, instructions particulières..."
                                    rows={3}
                                
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                    <input
                                        id="price_per_hour"
                                        name="price_per_hour"
                                        type="number"
                                        step="0.01"
                                        value={data.price_per_hour}
                                        onChange={handleChange}
                                        placeholder="5.00"
                                        required
                                        className={`bg-gray-50 border ${errors.price_per_hour ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                    {errors.price_per_hour && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.price_per_hour}
                                        </p>
                                    )}
                                </div>
                                <div className="mt-4 flex items-center">
                                    <input
                                        id="available"
                                        name="available"
                                        type="checkbox"
                                        checked={data.available}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label htmlFor="available" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        Disponible à la location
                                    </label>
                                </div>
                            </div>

                            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                                    Options
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    Sélectionnez une ou plusieurs options
                                </p>
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

                        {/* Dimensions */}
                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                                Dimensions de la place
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="length" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Longueur (m) *</label>
                                    <input
                                        id="length"
                                        name="length"
                                        type="number"
                                        step="0.01"
                                        value={data.length}
                                        onChange={handleChange}
                                        placeholder="5.0"
                                        required
                                    
                                        className={`bg-gray-50 border ${errors.length ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                    {errors.length && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.length}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="width" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Largeur (m) *</label>
                                    <input
                                        id="width"
                                        name="width"
                                        type="number"
                                        step="0.01"
                                        value={data.width}
                                        onChange={handleChange}
                                        placeholder="2.5"
                                        required
                                    
                                        className={`bg-gray-50 border ${errors.width ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                    {errors.width && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.width}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hauteur (m) *</label>
                                    <input
                                        id="height"
                                        name="height"
                                        type="number"
                                        step="0.01"
                                        value={data.height}
                                        onChange={handleChange}
                                        placeholder="2.0"
                                        required
                                    
                                        className={`bg-gray-50 border ${errors.height ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                    {errors.height && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.height}
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
                        </Button>
                        <button type="submit" disabled={processing} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed">
                            <Save className="w-4 h-4 mr-2" />
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Create;
