import React, { useState, useEffect } from 'react';
import BaseModal from './BaseModal';
import { updateUser } from '../../services/adminService';
import toast from 'react-hot-toast';
import { Edit2 } from 'lucide-react';

const EditUserModal = ({ isOpen, onClose, user, onSuccess }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username || '');
            setEmail(user.email || '');
        }
    }, [user, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updated = await updateUser(user._id, { username, email });
            toast.success('User updated successfully');
            onSuccess(updated);
            onClose();
        } catch (error) {
            toast.error(error.message || 'Failed to update user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Edit User" icon={Edit2}>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Username</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength={3}
                    />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Email</span>
                    </label>
                    <input
                        type="email"
                        className="input input-bordered w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="modal-action mt-6">
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-info text-white"
                        disabled={loading || !username || !email}
                    >
                        {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Save Changes'}
                    </button>
                </div>
            </form>
        </BaseModal>
    );
};

export default EditUserModal;
