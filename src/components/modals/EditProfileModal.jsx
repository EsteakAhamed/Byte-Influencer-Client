import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Loader2, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const editProfileSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
});

const EditProfileModal = ({ isOpen, onClose }) => {
    const { user, updateUsername } = useAuth();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            username: user?.username || ''
        }
    });

    useEffect(() => {
        if (user) {
            reset({ username: user.username });
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await updateUsername(data.username);
            toast.success("Profile updated successfully");
            onClose();
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
            <div className="card w-full max-w-md bg-base-100 shadow-2xl z-10 animate-in zoom-in-95 duration-300 overflow-hidden border border-base-content/10">
                <div className="bg-primary/5 p-6 border-b border-base-content/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <User size={20} />
                        </div>
                        <h3 className="text-xl font-bold">Edit Profile</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="btn btn-ghost btn-sm btn-circle"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="card-body p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Username</span>
                            </label>
                            <input
                                type="text"
                                className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 ${errors.username ? 'input-error' : ''}`}
                                {...register('username')}
                            />
                            {errors.username && (
                                <p className="text-error text-xs mt-1 font-medium">{errors.username.message}</p>
                            )}
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                type="button"
                                className="btn btn-ghost flex-1"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary flex-1 text-white border-none"
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
