import React, { useState } from 'react';
import BaseModal from './BaseModal';
import { deleteUser } from '../../services/adminService';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';

const DeleteUserModal = ({ isOpen, onClose, user, onSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteUser(user._id);
            toast.success('User and all associated data deleted successfully');
            onSuccess(user._id);
            onClose();
        } catch (error) {
            toast.error(error.message || 'Failed to delete user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Delete User" icon={Trash2}>
            <div className="mt-4">
                <div className="bg-error/10 text-error p-4 rounded-xl border border-error/20 mb-6">
                    <p className="font-semibold mb-2">Warning: This action cannot be undone!</p>
                    <p className="text-sm">
                        Are you sure you want to delete <strong>{user?.username}</strong>? All their imported influencers and clients will also be permanently deleted.
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
                        onClick={handleDelete} 
                        className="btn btn-error"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Yes, Delete User'}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default DeleteUserModal;
