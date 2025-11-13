import React from 'react';
// === CORRIGÉ : Imports séparés ===
import { Modal, ModalHeader, ModalBody, Button } from 'flowbite-react';
// --- Imports Heroicons ---
import { HiLocationMarker, HiPlus } from 'react-icons/hi';

interface NoParkingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenCreateModal: () => void;
}

const NoParkingModal: React.FC<NoParkingModalProps> = ({ isOpen, onClose, onOpenCreateModal }) => {

    if (!isOpen) return null;

    const handleCreateClick = () => {
        onClose();
        onOpenCreateModal();
    };

    return (
        // === CORRIGÉ : Syntaxe <ModalHeader>, <ModalBody> ===
        <Modal show={isOpen} size="md" popup onClose={onClose}>
            <ModalHeader /> {/* Header vide pour style popup */}
            <ModalBody>
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                        <HiLocationMarker className="h-10 w-10 text-blue-600 dark:text-blue-300" />
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                        Commencez dès maintenant !
                    </h3>

                    <p className="mb-6 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Vous n'avez pas encore ajouté de parking.
                        Créez votre première annonce pour la rendre visible.
                    </p>

                    <div className="flex justify-center gap-4">
                        <Button color="gray" onClick={onClose}>
                            Fermer
                        </Button>
                        <Button color="blue" onClick={handleCreateClick} icon={HiPlus}>
                            Ajouter un parking
                        </Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default NoParkingModal;
