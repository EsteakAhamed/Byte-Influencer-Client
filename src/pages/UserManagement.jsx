import React, { useState, useEffect } from 'react';
import { getAllUsers, updateUser, deleteUser, promoteToAdmin } from '../services/adminService';
import { useAuth } from '../context/AuthContext';
import { Search, Shield, ShieldCheck, Trash2, Edit2, UserCheck, SearchX } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import EditUserModal from '../components/modals/EditUserModal';
import DeleteUserModal from '../components/modals/DeleteUserModal';
import PromoteAdminModal from '../components/modals/PromoteAdminModal';

const UserManagement = () => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    // Modal states
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            if (data) setUsers(data);
        } catch (error) {
            toast.error(error.message || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleEditSuccess = (updatedUser) => {
        setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
    };

    const handleDeleteSuccess = (userId) => {
        setUsers(users.filter(u => u._id !== userId));
    };

    const handlePromoteSuccess = (updatedUser) => {
        setUsers(users.map(u => u._id === updatedUser._id ? updatedUser : u));
    };

    const filteredUsers = users.filter(u => {
        const matchesSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              u.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;

    return (
        <div className="min-h-screen bg-base-200/50 pt-24 pb-20 px-4">
            <div className="max-w-6xl mx-auto space-y-6">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">User Management</h1>
                        <p className="text-base-content/60 mt-1">Manage platform users, roles, and access</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                        <input
                            type="text"
                            placeholder="Search by username or email..."
                            className="input input-bordered w-full pl-10 focus:outline-none focus:ring-2 focus:ring-primary/20"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select 
                        className="select select-bordered w-full md:w-48 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="all">All Roles</option>
                        <option value="user">Users Only</option>
                        <option value="admin">Admins Only</option>
                    </select>
                </div>

                <div className="card bg-base-100 shadow-xl border border-base-content/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="bg-base-200/50">
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Joined</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-base-200/30 transition-colors">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                        <span className="uppercase">{user.username.charAt(0)}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user.username}</div>
                                                    <div className="text-sm opacity-60">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user.role === 'admin' ? (
                                                <div className="badge badge-warning gap-1">
                                                    <Shield size={12} />
                                                    Admin
                                                </div>
                                            ) : (
                                                <div className="badge badge-ghost gap-1">
                                                    <ShieldCheck size={12} />
                                                    User
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <span className="text-sm opacity-80">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-end gap-2">
                                                {user.role === 'user' && (
                                                    <button 
                                                        onClick={() => { setSelectedUser(user); setIsPromoteModalOpen(true); }}
                                                        className="btn btn-ghost btn-sm text-warning hover:bg-warning/10"
                                                        title="Make Admin"
                                                    >
                                                        <UserCheck size={16} />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => { setSelectedUser(user); setIsEditModalOpen(true); }}
                                                    className="btn btn-ghost btn-sm text-info hover:bg-info/10"
                                                    title="Edit User"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                {currentUser?.id !== user._id && (
                                                    <button 
                                                        onClick={() => { setSelectedUser(user); setIsDeleteModalOpen(true); }}
                                                        className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center py-12">
                                            <SearchX className="w-12 h-12 mx-auto text-base-content/20 mb-3" />
                                            <p className="text-base-content/60">No users found matching your criteria</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {selectedUser && (
                <>
                    <EditUserModal 
                        isOpen={isEditModalOpen} 
                        onClose={() => setIsEditModalOpen(false)} 
                        user={selectedUser}
                        onSuccess={handleEditSuccess}
                    />
                    <DeleteUserModal 
                        isOpen={isDeleteModalOpen} 
                        onClose={() => setIsDeleteModalOpen(false)} 
                        user={selectedUser}
                        onSuccess={handleDeleteSuccess}
                    />
                    <PromoteAdminModal 
                        isOpen={isPromoteModalOpen} 
                        onClose={() => setIsPromoteModalOpen(false)} 
                        user={selectedUser}
                        onSuccess={handlePromoteSuccess}
                    />
                </>
            )}
        </div>
    );
};

export default UserManagement;
