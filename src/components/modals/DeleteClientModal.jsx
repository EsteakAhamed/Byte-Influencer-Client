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
        <div className="grid grid-cols-2 gap-3 w-full">
            <button onClick={onClose} disabled={loading} className="px-4 py-2.5 border border-base-content/15 rounded-xl font-semibold text-base-content/70 hover:bg-base-300 transition-all disabled:opacity-50">Cancel</button>
            <button onClick={handleConfirm} disabled={loading} className="px-4 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                {loading && <FiLoader className="animate-spin" />}
                {loading ? 'Deleting...' : 'Delete Client'}
            </button>
        </div>
    );

    return (
        <BaseModal title="Confirm Removal" onClose={onClose} footer={footer}>
            <div className="space-y-6">
                <div className="text-center p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                    <div className="w-16 h-16 bg-red-500/15 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                        <FiAlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/80">Danger Zone</p>
                    <h3 className="text-xl font-bold text-base-content mt-1">Delete {client.name}?</h3>
                </div>

                <div className="p-4 rounded-xl bg-base-200 border border-base-content/10">
                    <p className="text-sm font-medium text-base-content/60 text-center leading-relaxed">
                        You are about to permanently remove <strong className="text-base-content">{client.name}</strong> and all associated campaign metrics. This action cannot be reversed.
                    </p>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <FiAlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <p className="text-[11px] text-amber-500 font-bold">
                        Ensure all pending campaigns for this client are archived before deletion.
                    </p>
                </div>
            </div>
        </BaseModal>
    );
};

export default DeleteClientModal;
