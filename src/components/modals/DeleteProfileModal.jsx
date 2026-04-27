import React, { useState } from 'react';
import { X, Loader2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DeleteProfileModal = ({ isOpen, onClose }) => {
    const { deleteUserProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteUserProfile();
            toast.success("Your profile has been deleted");
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-base-300/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="card w-full max-w-md bg-base-100 shadow-2xl z-10 animate-in zoom-in-95 duration-300 overflow-hidden border border-error/20">
                <div className="bg-error/5 p-6 border-b border-error/10 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-error">
                        <AlertTriangle size={24} />
                        <h3 className="text-xl font-bold">Delete Profile</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="btn btn-ghost btn-sm btn-circle"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="card-body p-8 text-center">
                    <p className="text-lg font-semibold text-error mb-2">Are you sure you want to delete your profile?</p>
                    <p className="text-base-content/60 text-sm leading-relaxed mb-6">
                        This action cannot be undone. All your data will be permanently removed from our servers.
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            type="button"
                            className="btn btn-error text-white border-none h-12"
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Delete Profile Permanently"}
                        </button>
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel, keep my profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteProfileModal;
