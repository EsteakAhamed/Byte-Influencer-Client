import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import BaseModal from './BaseModal';

const ConfirmDeleteModal = ({ onClose, onConfirm, influencerName }) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        await onConfirm();
        setLoading(false);
    };

    const footer = (
        <>
            <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="btn px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 font-medium"
            >
                Cancel
            </button>
            <button 
                onClick={handleConfirm} 
                className="btn px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 flex items-center justify-center font-medium min-w-[100px]"
                disabled={loading}
            >
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                {loading ? "Deleting..." : "Delete"}
            </button>
        </>
    );

    return (
        <BaseModal 
            title="Confirm Deletion" 
            onClose={onClose} 
            footer={footer}
        >
            <p className="text-gray-600 text-sm py-2">
                Are you sure you want to delete <span className="font-semibold text-gray-900">{influencerName}</span>? This action cannot be undone.
            </p>
        </BaseModal>
    );
};

export default ConfirmDeleteModal;
