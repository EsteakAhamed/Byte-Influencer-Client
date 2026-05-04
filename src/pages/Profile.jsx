import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Edit, Trash2, ShieldCheck, ChevronLeft, Shield, Key } from 'lucide-react';
import { Link } from 'react-router-dom';
import EditProfileModal from '../components/modals/EditProfileModal';
import DeleteProfileModal from '../components/modals/DeleteProfileModal';
import ChangePasswordModal from '../components/modals/ChangePasswordModal';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
    const { user, loading, isAdmin } = useAuth();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);


    if (loading) {
        return <LoadingSpinner inline message="Loading profile..." />;
    }

    return (
        <div className="min-h-screen bg-base-200/50 pt-24 pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <Link to="/" className="btn btn-ghost btn-sm gap-2 mb-6 opacity-60 hover:opacity-100 transition-opacity">
                    <ChevronLeft size={18} />
                    Back to Dashboard
                </Link>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sidebar / Mini Info */}
                    <div className="w-full md:w-64 space-y-4">
                        <div className="card bg-base-100 shadow-xl border border-base-content/5 overflow-hidden">
                            <div className="h-24 bg-linear-to-r from-primary/20 to-teal-500/20"></div>
                            <div className="card-body -mt-12 items-center text-center p-6">
                                <div className="avatar">
                                    <div className="w-24 h-24 rounded-2xl bg-base-100 p-1 shadow-lg ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <div className="w-full h-full rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <User size={40} />
                                        </div>
                                    </div>
                                </div>
                                <h2 className="mt-4 text-xl font-bold tracking-tight">{user?.username}</h2>
                                <p className="text-xs font-bold uppercase tracking-widest opacity-40">Member since {new Date(user?.createdAt).getFullYear()}</p>
                                
                                {isAdmin ? (
                                    <div className="badge badge-warning mt-4 gap-1 py-3 px-4 font-bold text-[10px]">
                                        <Shield size={12} />
                                        Admin Account
                                    </div>
                                ) : (
                                    <div className="badge badge-primary badge-outline mt-4 gap-1 py-3 px-4 font-bold text-[10px]">
                                        <ShieldCheck size={12} />
                                        VERIFIED USER
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 w-full space-y-6">
                        <div className="card bg-base-100 shadow-xl border border-base-content/5">
                            <div className="card-body p-8">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                                    <div>
                                        <h1 className="text-2xl font-black tracking-tight">Your Profile</h1>
                                        <p className="text-base-content/60 text-sm mt-1">Manage your account settings and preferences</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsEditModalOpen(true)}
                                            className="btn btn-primary btn-sm text-white gap-2 flex-1 sm:flex-none"
                                        >
                                            <Edit size={16} />
                                            <span>Edit</span>
                                        </button>
                                        <button
                                            onClick={() => setIsChangePasswordModalOpen(true)}
                                            className="btn btn-outline btn-primary btn-sm gap-2 flex-1 sm:flex-none"
                                        >
                                            <Key size={16} />
                                            <span className="hidden sm:inline">Password</span>
                                            <span className="sm:hidden">Pass</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid gap-6">
                                    {/* Username Field */}
                                    <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl border border-base-content/5">
                                        <div className="p-3 bg-base-100 rounded-xl text-primary shadow-sm">
                                            <User size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-0.5">Username</p>
                                            <p className="font-bold text-lg">{user?.username}</p>
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-2xl border border-base-content/5">
                                        <div className="p-3 bg-base-100 rounded-xl text-primary shadow-sm">
                                            <Mail size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-0.5">Email Address</p>
                                            <p className="font-bold text-lg">{user?.email}</p>
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-12 pt-8 border-t border-base-content/5">
                                    <div className="bg-error/5 p-6 rounded-2xl border border-error/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-error font-bold text-lg">Danger Zone</h3>
                                            <p className="text-sm opacity-70">Permanently delete your account and all associated data</p>
                                        </div>
                                        <button 
                                            onClick={() => setIsDeleteModalOpen(true)}
                                            className="btn btn-error btn-outline btn-md gap-2"
                                        >
                                            <Trash2 size={18} />
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <EditProfileModal 
                isOpen={isEditModalOpen} 
                onClose={() => setIsEditModalOpen(false)} 
            />
            <DeleteProfileModal 
                isOpen={isDeleteModalOpen} 
                onClose={() => setIsDeleteModalOpen(false)} 
            />
            <ChangePasswordModal 
                isOpen={isChangePasswordModalOpen} 
                onClose={() => setIsChangePasswordModalOpen(false)} 
            />
        </div>
    );
};

export default Profile;
