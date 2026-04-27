import React, { useState } from 'react';
import { FiLoader, FiAlertTriangle } from 'react-icons/fi';
import BaseModal from './BaseModal';

const ConfirmDeleteModal = ({ onClose, onConfirm, influencerName }) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        await onConfirm();
        setLoading(false);
    };

    const footer = (
        <div className="grid grid-cols-2 gap-3 w-full">
            <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2.5 border border-base-content/15 rounded-xl font-semibold text-base-content/70 hover:bg-base-300 transition-all disabled:opacity-50">Cancel</button>
            <button onClick={handleConfirm} disabled={loading} className="px-4 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all active:scale-95 flex items-center justify-center disabled:opacity-50">
                {loading ? <FiLoader className="animate-spin w-4 h-4 mr-2" /> : null}
                {loading ? "Deleting..." : "Confirm Delete"}
            </button>
        </div>
    );

    return (
        <BaseModal title="Confirm Action" onClose={onClose} footer={footer}>
            <div className="space-y-6">
                <div className="text-center p-6 rounded-2xl bg-red-500/10 border border-red-500/20">
                    <div className="w-16 h-16 bg-red-500/15 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                        <FiAlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500/80">Final Confirmation</p>
                    <h3 className="text-xl font-bold text-base-content mt-1">Permanently Delete?</h3>
                </div>

                <div className="p-4 rounded-xl bg-base-200 border border-base-content/10">
                    <p className="text-sm font-medium text-base-content/60 text-center leading-relaxed">
                        Are you sure you want to delete <span className="font-bold text-base-content">{influencerName}</span>? This action is permanent and cannot be undone.
                    </p>
                </div>
            </div>
        </BaseModal>
    );
};

export default ConfirmDeleteModal;
