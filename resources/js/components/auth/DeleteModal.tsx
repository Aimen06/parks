import React from 'react';
// === CORRIGÉ : Imports séparés ===
import { Modal, ModalHeader, ModalBody, Button } from 'flowbite-react';
// --- Imports Heroicons ---
import { HiOutlineExclamation, HiTrash } from 'react-icons/hi';

interface Parking {
    id: number;
    name: string | null;
    number: string | null;
    address: string;
    city: string;
}

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    parking?: Parking | null;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onConfirm, parking }) => {

    if (!isOpen) return null;

    return (
        // === CORRIGÉ : Syntaxe <ModalHeader>, <ModalBody> ===
        <Modal show={isOpen} size="md" popup onClose={onClose}>
            <ModalHeader /> {/* Header vide pour style popup */}
            <ModalBody>
                <div className="text-center">
                    <HiOutlineExclamation className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />

                    <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                        Confirmer la suppression
                    </h3>

                    {parking && (
                        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                            <p className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                                {parking.name || `Parking #${parking.id}`}
                                {parking.number && <span className="text-gray-500 dark:text-gray-400"> • N°{parking.number}</span>}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {parking.address}, {parking.city}
                            </p>
                        </div>
                    )}

                    <p className="mb-6 text-gray-500 dark:text-gray-300">
                        Êtes-vous sûr de vouloir supprimer ce parking définitivement ?
                        <span className="block mt-2 text-sm font-semibold text-red-600 dark:text-red-500">
                            ⚠️ Cette action est irréversible
                        </span>
                    </p>

                    <div className="flex justify-center gap-4">
                        <Button color="gray" onClick={onClose}>
                            Annuler
                        </Button>
                        <Button color="failure" onClick={onConfirm} icon={HiTrash}>
                            Oui, supprimer
                        </Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default DeleteModal;
