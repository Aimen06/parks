import React from 'react';
// --- Imports Flowbite ---
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    // ButtonGroup a été retiré pour permettre le 'gap'
    Badge,
    ToggleSwitch,
    Tooltip
} from 'flowbite-react';
// --- Imports Heroicons (utilisés par Flowbite) ---
import {
    HiPencil,
    HiTrash,
    HiLocationMarker,
    HiOutlineCurrencyEuro,
    HiOutlineArrowsExpand,
    HiCheckCircle, // Retiré du corps, mais gardé au cas où
    HiXCircle,     // Retiré du corps, mais gardé au cas où
    HiPhotograph
} from 'react-icons/hi';

// Vos icônes personnalisées
import boxIcon from '../../../assets/images/box-icon.svg';
import exteriorIcon from '../../../assets/images/exterior-park-icon.svg';
import chargeIcon from '../../../assets/images/icone-borne.svg';

// Interface Parking (doit correspondre à celle de Index.tsx)
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
    owner?: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
    };
    created_at: string;
    updated_at: string;
}

interface ParkingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: (parking: Parking) => void; // Attend l'objet parking
    onDelete: (e: React.MouseEvent) => void;
    onToggleAvailability: (checked: boolean) => void;
    parking: Parking | null;
}

const ParkingDetailsModal: React.FC<ParkingDetailsModalProps> = ({
                                                                     isOpen,
                                                                     onClose,
                                                                     onEdit,
                                                                     onDelete,
                                                                     onToggleAvailability,
                                                                     parking
                                                                 }) => {

    if (!isOpen || !parking) return null;

    // Déstructuration pour un code plus propre
    const {
        name, id, number, address, zip, city, floor,
        price_per_hour, height, width, length,
        box, exterior, charge, remark, available,
        image_1, image_2, image_3
    } = parking;

    return (
        // === CORRIGÉ : Largeur augmentée ===
        <Modal show={isOpen} size="6xl" onClose={onClose}>
            <ModalHeader>
                {name || `Détails du Parking #${id}`}
            </ModalHeader>
            <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Colonne 1: Informations */}
                    <div className="space-y-4">
                        {/* Adresse */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Localisation</h4>
                            <div className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                <HiLocationMarker className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">{address}</p>
                                    <p>{zip} {city}</p>
                                    {floor && <p className="text-sm italic">Étage : {floor}</p>}
                                    {number && <p className="text-sm italic">Place n° : {number}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Spécifications */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Prix</h5>
                                <p className="flex items-center gap-1 text-lg font-bold text-gray-900 dark:text-white">
                                    <HiOutlineCurrencyEuro className="h-5 w-5" />
                                    {(price_per_hour / 100).toFixed(2)} /h
                                </p>
                            </div>
                            <div>
                                <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Dimensions (cm)</h5>
                                <p className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                                    <HiOutlineArrowsExpand className="h-4 w-4" />
                                    {height} (H) x {width} (L) x {length} (P)
                                </p>
                            </div>
                        </div>

                        {/* Options */}
                        <div>
                            <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Options</h5>
                            <div className="flex items-center gap-4">
                                {box && <Tooltip content="Box fermé"><img src={boxIcon} alt="Box" className="h-7 w-7" /></Tooltip>}
                                {exterior && <Tooltip content="Parking extérieur"><img src={exteriorIcon} alt="Extérieur" className="h-7 w-7" /></Tooltip>}
                                {charge && <Tooltip content="Borne de recharge"><img src={chargeIcon} alt="Recharge" className="h-7 w-7" /></Tooltip>}
                                {!box && !exterior && !charge && (
                                    <p className="text-sm text-gray-400 italic">Aucune option</p>
                                )}
                            </div>
                        </div>

                        {/* Remarques */}
                        {remark && (
                            <div>
                                <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Remarques</h5>
                                <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border dark:border-gray-600">
                                    {remark}
                                </p>
                            </div>
                        )}

                        {/* Statut & Toggle */}
                        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                            <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                                Statut
                            </h5>
                            {/* === CORRIGÉ : Badge redondant supprimé et Switch non désactivé === */}
                            <ToggleSwitch
                                checked={available}
                                label={available ? "Disponible" : "Indisponible"}
                                onChange={onToggleAvailability}
                                color={available ? "green" : "red"}
                                disabled={false}
                            />
                        </div>
                    </div>

                    {/* Colonne 2: Images */}
                    <div className="space-y-3">
                        {image_1 ? (
                            <>
                                <img src={`/storage/${image_1}`} alt="Image principale" className="w-full h-48 object-cover rounded-lg shadow-md" />
                                <div className="grid grid-cols-2 gap-3">
                                    {image_2 && <img src={`/storage/${image_2}`} alt="Image 2" className="w-full h-24 object-cover rounded-lg shadow" />}
                                    {image_3 && <img src={`/storage/${image_3}`} alt="Image 3" className="w-full h-24 object-cover rounded-lg shadow" />}
                                </div>
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                                <div className="text-center text-gray-400">
                                    <HiPhotograph className="h-12 w-12 mx-auto" />
                                    <p>Aucune image</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </ModalBody>
            {/* === CORRIGÉ : Boutons avec icônes, gap, et bonnes couleurs. Bouton Fermer supprimé. === */}
            <ModalFooter className="flex justify-start gap-x-2">
                <Button color="yellow" onClick={(e) => onEdit(parking)}>
                    <HiPencil className="mr-2 h-4 w-4" />
                    Modifier
                </Button>
                <Button color="red" onClick={onDelete}>
                    <HiTrash className="mr-2 h-4 w-4" />
                    Supprimer
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ParkingDetailsModal;
