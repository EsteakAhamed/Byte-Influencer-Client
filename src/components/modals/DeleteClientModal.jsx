import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiLoader, FiAlertTriangle } from 'react-icons/fi';
import { deleteClient } from '../../services/clientService';
import BaseModal from './BaseModal';

const DeleteClientModal = ({ client, onClose, refresh }) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        try {
            setLoading(true);
            await deleteClient(client._id);
            toast.success('Client deleted');
            refresh();
            onClose();
        } catch (err) {
            toast.error(err.message || 'Failed to delete client');
            setLoading(false);
        }
    };

    const footer = (
        <>
            <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
            >
                Cancel
            </button>
            <button
                onClick={handleConfirm}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
            >
                {loading && <FiLoader className="animate-spin" />}
                Delete
            </button>
        </>
    );

    return (
        <BaseModal title="Delete Client" onClose={onClose} footer={footer}>
            <div className="flex items-start gap-4">
                <div className="p-2 bg-red-100 rounded-full">
                    <FiAlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                    <p className="text-gray-700 mb-2">
                        Are you sure you want to delete <strong>{client.name}</strong>?
                    </p>
                    <p className="text-sm text-gray-500">
                        This will permanently remove the client and all associated campaign data. This action cannot be undone.
                    </p>
                </div>
            </div>
        </BaseModal>
    );
};

export default DeleteClientModal;
