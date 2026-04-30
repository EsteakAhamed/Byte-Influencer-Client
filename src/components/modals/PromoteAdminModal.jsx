import React, { useState } from 'react';
import BaseModal from './BaseModal';
import { promoteToAdmin } from '../../services/adminService';
import toast from 'react-hot-toast';
import { ShieldAlert } from 'lucide-react';

const PromoteAdminModal = ({ isOpen, onClose, user, onSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handlePromote = async () => {
        setLoading(true);
        try {
            const updated = await promoteToAdmin(user._id);
            toast.success(`${user.username} is now an Admin`);
            onSuccess(updated);
            onClose();
        } catch (error) {
            toast.error(error.message || 'Failed to promote user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Promote to Admin" icon={ShieldAlert}>
            <div className="mt-4">
                <div className="bg-warning/10 text-warning-content p-4 rounded-xl border border-warning/20 mb-6">
                    <p className="font-semibold mb-2 text-warning">Warning: Granting Admin Access</p>
                    <p className="text-sm">
                        Are you sure you want to promote <strong>{user?.username}</strong> to Admin? They will have full access to view, edit, and delete all data and manage users.
                    </p>
                </div>

                <div className="modal-action">
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handlePromote}
                        className="btn btn-warning"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Yes, Promote to Admin'}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default PromoteAdminModal;
