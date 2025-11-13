import React, { useState, useEffect, FormEvent } from 'react';
import { useForm } from '@inertiajs/react';
// --- Imports Flowbite ---
import {
    Modal,
    ModalHeader,
    ModalBody,
    // ModalFooter, // Supprimé
    Button,
    TextInput,
    Textarea,
    Label,
    ToggleSwitch,
    Spinner,
    Card,
    Checkbox
} from 'flowbite-react';
// --- Imports Heroicons (pour Flowbite) ---
import {
    HiPencil,
    HiX,
    HiLocationMarker,
    HiOutlineArrowsExpand,
    HiCurrencyEuro,
    HiCog,
    HiOutlineCheckCircle
} from 'react-icons/hi';
import InputError from '@/components/input-error';

// Vos icônes personnalisées
import boxIcon from '../../../assets/images/box-icon.svg';
import exteriorIcon from '../../../assets/images/exterior-park-icon.svg';
import chargeIcon from '../../../assets/images/icone-borne.svg';

// Interface Parking (inchangée)
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
    price_per_hour: number; // en centimes
    available: boolean;
}

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    parking: Parking | null; // Le parking à modifier
}

const EditParkingModal: React.FC<EditModalProps> = ({ isOpen, onClose, parking }) => {

    const [priceInEuros, setPriceInEuros] = useState('');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
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
        _method: 'PUT'
    });

    useEffect(() => {
        if (parking) {
            setData({
                name: parking.name || '',
                number: parking.number || '',
                address: parking.address || '',
                floor: parking.floor || '',
                zip: parking.zip || '',
                city: parking.city || '',
                latitude: parking.latitude?.toString() || '',
                longitude: parking.longitude?.toString() || '',
                remark: parking.remark || '',
                height: parking.height.toString(),
                width: parking.width.toString(),
                length: parking.length.toString(),
                charge: parking.charge,
                exterior: parking.exterior,
                box: parking.box,
                price_per_hour: parking.price_per_hour,
                available: parking.available,
                _method: 'PUT'
            });
            setPriceInEuros((parking.price_per_hour / 100).toFixed(2));
        }
    }, [parking]);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const euroValue = e.target.value;
        setPriceInEuros(euroValue);

        const cents = Math.round(parseFloat(euroValue.replace(',', '.')) * 100);
        setData('price_per_hour', isNaN(cents) ? 0 : cents);
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (!parking) return;

        post(route('parkings.update', parking.id), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
            },
        });
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            reset();
            clearErrors();
            setPriceInEuros('');
        }, 300);
    };

    return (
        <Modal show={isOpen} size="6xl" popup onClose={handleClose}>
            <ModalHeader>Modifier le parking</ModalHeader>
            {/* === CORRIGÉ : <form> est déplacé à l'intérieur de <ModalBody> === */}
            <ModalBody>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Colonne 1 & 2 : Champs principaux */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                                    <HiLocationMarker className="h-6 w-6 text-blue-600" />
                                    Informations générales
                                </h5>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="mb-2 block"><Label htmlFor="name">Nom (optionnel)</Label></div>
                                            <TextInput id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Ex: Parking St-Roch" color={errors.name ? 'failure' : 'gray'} />
                                            <InputError message={errors.name} className="mt-2" />
                                        </div>
                                        <div>
                                            <div className="mb-2 block"><Label htmlFor="number">Numéro (optionnel)</Label></div>
                                            <TextInput id="number" value={data.number} onChange={(e) => setData('number', e.target.value)} placeholder="Ex: Place 42" color={errors.number ? 'failure' : 'gray'} />
                                            <InputError message={errors.number} className="mt-2" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block"><Label htmlFor="address">Adresse *</Label></div>
                                        <TextInput id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} placeholder="10 Rue de la Paix" required color={errors.address ? 'failure' : 'gray'} />
                                        <InputError message={errors.address} className="mt-2" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <div className="mb-2 block"><Label htmlFor="zip">Code Postal *</Label></div>
                                            <TextInput id="zip" value={data.zip} onChange={(e) => setData('zip', e.target.value)} placeholder="75001" required color={errors.zip ? 'failure' : 'gray'} />
                                            <InputError message={errors.zip} className="mt-2" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <div className="mb-2 block"><Label htmlFor="city">Ville *</Label></div>
                                            <TextInput id="city" value={data.city} onChange={(e) => setData('city', e.target.value)} placeholder="Paris" required color={errors.city ? 'failure' : 'gray'} />
                                            <InputError message={errors.city} className="mt-2" />
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                                    <HiOutlineArrowsExpand className="h-6 w-6 text-blue-600" />
                                    Dimensions
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <div className="mb-2 block"><Label htmlFor="length">Longueur (m) *</Label></div>
                                        <TextInput id="length" type="number" step="0.01" value={data.length} onChange={(e) => setData('length', e.target.value)} placeholder="5.0" required color={errors.length ? 'failure' : 'gray'} />
                                        <InputError message={errors.length} className="mt-2" />
                                    </div>
                                    <div>
                                        <div className="mb-2 block"><Label htmlFor="width">Largeur (m) *</Label></div>
                                        <TextInput id="width" type="number" step="0.01" value={data.width} onChange={(e) => setData('width', e.target.value)} placeholder="2.5" required color={errors.width ? 'failure' : 'gray'} />
                                        <InputError message={errors.width} className="mt-2" />
                                    </div>
                                    <div>
                                        <div className="mb-2 block"><Label htmlFor="height">Hauteur (m) *</Label></div>
                                        <TextInput id="height" type="number" step="0.01" value={data.height} onChange={(e) => setData('height', e.target.value)} placeholder="2.0" required color={errors.height ? 'failure' : 'gray'} />
                                        <InputError message={errors.height} className="mt-2" />
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Remarques / Instructions</h5>
                                <div className="mb-2 block"><Label htmlFor="remark">Remarques (optionnel)</Label></div>
                                <Textarea id="remark" value={data.remark} onChange={(e) => setData('remark', e.target.value)} placeholder="Accès par la porte bleue, code 1234..." rows={3} color={errors.remark ? 'failure' : 'gray'} />
                                <InputError message={errors.remark} className="mt-2" />
                            </Card>
                        </div>

                        {/* Colonne 3 : Options et Tarif */}
                        <div className="lg:col-span-1 space-y-6">
                            <Card>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                                    <HiCurrencyEuro className="h-6 w-6 text-green-600" />
                                    Tarif
                                </h5>
                                <div>
                                    <div className="mb-2 block"><Label htmlFor="price_per_hour">Prix par heure (€) *</Label></div>
                                    <TextInput id="price_per_hour" type="number" step="0.01" value={priceInEuros} onChange={handlePriceChange} placeholder="Ex: 1.50" required color={errors.price_per_hour ? 'failure' : 'gray'} />
                                    <InputError message={errors.price_per_hour} className="mt-2" />
                                </div>
                            </Card>

                            <Card>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                                    <HiCog className="h-6 w-6 text-gray-600" />
                                    Options
                                </h5>
                                <fieldset className="flex flex-col gap-4">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="box" checked={data.box} onChange={(e) => setData('box', e.target.checked)} />
                                        <Label htmlFor="box" className="flex items-center gap-2"><img src={boxIcon} alt="Box" className="h-6 w-6" /> Box fermé</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="exterior" checked={data.exterior} onChange={(e) => setData('exterior', e.target.checked)} />
                                        <Label htmlFor="exterior" className="flex items-center gap-2"><img src={exteriorIcon} alt="Extérieur" className="h-6 w-6" /> Extérieur</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="charge" checked={data.charge} onChange={(e) => setData('charge', e.target.checked)} />
                                        <Label htmlFor="charge" className="flex items-center gap-2"><img src={chargeIcon} alt="Borne" className="h-6 w-6" /> Borne de recharge</Label>
                                    </div>
                                </fieldset>
                            </Card>

                            <Card>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                                    <HiOutlineCheckCircle className="h-6 w-6 text-green-600" />
                                    Disponibilité
                                </h5>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="available" className="text-base font-medium">
                                        Disponible à la location
                                    </Label>
                                    <ToggleSwitch
                                        id="available"
                                        checked={data.available}
                                        onChange={(checked) => setData('available', checked)}
                                        color={data.available ? 'green' : 'red'}
                                        disabled={false}
                                    />
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* === CORRIGÉ : Boutons déplacés à la fin du form, dans ModalBody === */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                        <Button color="gray" type="button" onClick={handleClose} disabled={processing} icon={HiX}>
                            Annuler
                        </Button>
                        <Button color="green" type="submit" disabled={processing}>
                            {processing ? (
                                <>
                                    <Spinner aria-label="Sauvegarde..." size="sm" />
                                    <span className="pl-3">Sauvegarde...</span>
                                </>
                            ) : (
                                <>
                                    <HiPencil className="mr-2 h-5 w-5" />
                                    Enregistrer
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default EditParkingModal;
