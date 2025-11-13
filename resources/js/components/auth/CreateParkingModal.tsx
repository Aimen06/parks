import React, { useState, useEffect, FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
// === CORRIGÉ : Spinner ajouté ===
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    TextInput,
    Textarea,
    Checkbox,
    Label,
    ToggleSwitch,
    FileInput,
    Spinner // Ajout de l'import
} from 'flowbite-react';
import { HiPlus } from 'react-icons/hi';
import InputError from '@/components/input-error';

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateParkingModal: React.FC<CreateModalProps> = ({ isOpen, onClose }) => {

    const [priceInEuros, setPriceInEuros] = useState('');

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
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
        price_per_hour: 0,
        available: true,
        image_1: null as File | null,
        image_2: null as File | null,
        image_3: null as File | null,
    });

    const closeModal = () => {
        onClose();
        setTimeout(() => {
            reset();
            setPriceInEuros('');
        }, 300);
    };

    useEffect(() => {
        if (wasSuccessful) {
            closeModal();
        }
    }, [wasSuccessful]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const euroValue = e.target.value;
        setPriceInEuros(euroValue);

        const cents = Math.round(parseFloat(euroValue.replace(',', '.')) * 100);
        setData('price_per_hour', isNaN(cents) ? 0 : cents);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setData(name as 'image_1' | 'image_2' | 'image_3', files[0]);
        } else {
            setData(name as 'image_1' | 'image_2' | 'image_3', null);
        }
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('parkings.store'), {
            preserveScroll: true,
        });
    };

    return (
        <Modal show={isOpen} size="4xl" popup onClose={closeModal}>
            <ModalHeader>Ajouter un nouveau parking</ModalHeader>
            <ModalBody>
                <form onSubmit={submit} className="space-y-6">

                    {/* Infos Générales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name">Nom du parking (optionnel)</Label>
                            </div>
                            <TextInput
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ex: Parking St-Roch"
                                color={errors.name ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="number">Numéro de place (optionnel)</Label>
                            </div>
                            <TextInput
                                id="number"
                                value={data.number}
                                onChange={(e) => setData('number', e.target.value)}
                                placeholder="Ex: Place 42"
                                color={errors.number ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.number} className="mt-2" />
                        </div>
                    </div>

                    {/* Adresse */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="address">Adresse</Label>
                        </div>
                        <TextInput
                            id="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="10 Rue de la Paix"
                            required
                            color={errors.address ? 'failure' : 'gray'}
                        />
                        <InputError message={errors.address} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="zip">Code Postal</Label>
                            </div>
                            <TextInput
                                id="zip"
                                value={data.zip}
                                onChange={(e) => setData('zip', e.target.value)}
                                placeholder="75001"
                                required
                                color={errors.zip ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.zip} className="mt-2" />
                        </div>
                        <div className="md:col-span-2">
                            <div className="mb-2 block">
                                <Label htmlFor="city">Ville</Label>
                            </div>
                            <TextInput
                                id="city"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                                placeholder="Paris"
                                required
                                color={errors.city ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.city} className="mt-2" />
                        </div>
                    </div>

                    {/* Coordonnées (optionnel) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="floor">Étage (optionnel)</Label>
                            </div>
                            <TextInput
                                id="floor"
                                value={data.floor}
                                onChange={(e) => setData('floor', e.target.value)}
                                placeholder="Ex: -2"
                                color={errors.floor ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.floor} className="mt-2" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="latitude">Latitude (optionnel)</Label>
                            </div>
                            <TextInput
                                id="latitude"
                                value={data.latitude}
                                onChange={(e) => setData('latitude', e.target.value)}
                                placeholder="48.8566"
                                color={errors.latitude ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.latitude} className="mt-2" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="longitude">Longitude (optionnel)</Label>
                            </div>
                            <TextInput
                                id="longitude"
                                value={data.longitude}
                                onChange={(e) => setData('longitude', e.target.value)}
                                placeholder="2.3522"
                                color={errors.longitude ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.longitude} className="mt-2" />
                        </div>
                    </div>

                    {/* Dimensions & Prix */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="height">Hauteur (cm)</Label>
                            </div>
                            <TextInput
                                id="height"
                                type="number"
                                value={data.height}
                                onChange={(e) => setData('height', e.target.value)}
                                placeholder="Ex: 210"
                                required
                                color={errors.height ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.height} className="mt-2" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="width">Largeur (cm)</Label>
                            </div>
                            <TextInput
                                id="width"
                                type="number"
                                value={data.width}
                                onChange={(e) => setData('width', e.target.value)}
                                placeholder="Ex: 250"
                                required
                                color={errors.width ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.width} className="mt-2" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="length">Longueur (cm)</Label>
                            </div>
                            <TextInput
                                id="length"
                                type="number"
                                value={data.length}
                                onChange={(e) => setData('length', e.target.value)}
                                placeholder="Ex: 500"
                                required
                                color={errors.length ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.length} className="mt-2" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="price_per_hour">Prix par heure (€)</Label>
                            </div>
                            <TextInput
                                id="price_per_hour"
                                type="number"
                                step="0.01"
                                value={priceInEuros}
                                onChange={handlePriceChange}
                                placeholder="Ex: 1.50"
                                required
                                color={errors.price_per_hour ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.price_per_hour} className="mt-2" />
                        </div>
                    </div>

                    {/* Remarques */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="remark">Remarques (optionnel)</Label>
                        </div>
                        <Textarea
                            id="remark"
                            value={data.remark}
                            onChange={(e) => setData('remark', e.target.value)}
                            placeholder="Accès par la porte bleue, code 1234..."
                            rows={3}
                            color={errors.remark ? 'failure' : 'gray'}
                        />
                        <InputError message={errors.remark} className="mt-2" />
                    </div>

                    {/* Options & Disponibilité */}
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <fieldset className="flex max-w-md flex-row gap-4">
                            <legend className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Options</legend>
                            <div className="flex items-center gap-2">
                                <Checkbox id="box" checked={data.box} onChange={(e) => setData('box', e.target.checked)} />
                                <Label htmlFor="box">Box fermé</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="exterior" checked={data.exterior} onChange={(e) => setData('exterior', e.target.checked)} />
                                <Label htmlFor="exterior">Extérieur</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="charge" checked={data.charge} onChange={(e) => setData('charge', e.target.checked)} />
                                <Label htmlFor="charge">Borne de recharge</Label>
                            </div>
                        </fieldset>

                        <ToggleSwitch
                            checked={data.available}
                            label="Disponible dès maintenant"
                            onChange={(checked) => setData('available', checked)}
                        />
                    </div>

                    {/* Images */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="image_1">Image 1 (Principale)</Label>
                            </div>
                            <FileInput
                                id="image_1"
                                name="image_1"
                                onChange={handleFileChange}
                                color={errors.image_1 ? 'failure' : 'gray'}
                            />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                                PNG, JPG ou WEBP (Max 2Mo).
                            </p>
                            <InputError message={errors.image_1} className="mt-2" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="image_2">Image 2 (Optionnel)</Label>
                            </div>
                            <FileInput
                                id="image_2"
                                name="image_2"
                                onChange={handleFileChange}
                                color={errors.image_2 ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.image_2} className="mt-2" />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="image_3">Image 3 (Optionnel)</Label>
                            </div>
                            <FileInput
                                id="image_3"
                                name="image_3"
                                onChange={handleFileChange}
                                color={errors.image_3 ? 'failure' : 'gray'}
                            />
                            <InputError message={errors.image_3} className="mt-2" />
                        </div>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                {/* === ERREUR CORRIGÉE ICI === */}
                {/* Utilisation de 'disabled' et d'un Spinner manuel */}
                <Button color="blue" onClick={submit} disabled={processing}>
                    {processing ? (
                        <>
                            <Spinner aria-label="Création..." size="sm" />
                            <span className="pl-3">Création...</span>
                        </>
                    ) : (
                        <>
                            <HiPlus className="mr-2 h-5 w-5" />
                            Créer le parking
                        </>
                    )}
                </Button>
                <Button color="gray" onClick={closeModal} disabled={processing}>
                    Annuler
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateParkingModal;
