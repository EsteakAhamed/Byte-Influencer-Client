import React, { useState, useEffect } from 'react';
import BaseModal from './BaseModal';
import { assignClientToUser, unassignClient } from '../../services/adminService';
import toast from 'react-hot-toast';
import useUserSearch from '../../hooks/useUserSearch';

const AssignClientModal = ({ client, onClose, onSuccess }) => {
    const [selectedUserId, setSelectedUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const { users, searchTerm, setSearchTerm, loading: usersLoading } = useUserSearch(client.assignedTo?.toString());

    // Pre-select currently assigned user
    useEffect(() => {
        if (client.assignedTo) {
            setSelectedUserId(client.assignedTo.toString());
        }
    }, [client.assignedTo]);

    const handleAssign = async () => {
        if (!selectedUserId) {
            toast.error('Please select a user');
            return;
        }
        setLoading(true);
        try {
            await assignClientToUser(client._id, selectedUserId);
            toast.success('Client assigned successfully');
            onSuccess();
            onClose();
        } catch (err) {
            toast.error(err.message || 'Assignment failed');
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async () => {
        setLoading(true);
        try {
            await unassignClient(client._id);
            toast.success('Assignment removed');
            onSuccess();
            onClose();
        } catch (err) {
            toast.error(err.message || 'Failed to remove assignment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseModal
            isOpen
            onClose={onClose}
            title={`Assign "${client.name}"`}
            footer={
                <>
                    {client.assignedTo && (
                        <button
                            onClick={handleRemove}
                            disabled={loading}
                            className="btn btn-outline btn-error btn-sm"
                        >
                            Remove Assignment
                        </button>
                    )}
                    <button
                        onClick={handleAssign}
                        disabled={loading || !selectedUserId}
                        className="btn btn-primary btn-sm"
                    >
                        {loading ? 'Saving...' : 'Assign'}
                    </button>
                </>
            }
        >
            {usersLoading ? (
                <div className="flex justify-center py-6">
                    <span className="loading loading-spinner loading-md text-emerald-500" />
                </div>
            ) : users.length === 0 ? (
                <p className="text-sm text-base-content/60 py-4">No regular users available for assignment.</p>
            ) : (
                <div className="space-y-4">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">Search Users</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="input input-bordered w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">Select User</span>
                        </div>
                        <select
                            className="select select-bordered w-full"
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                        >
                            <option value="">Choose a user...</option>
                            {users.map(u => (
                                <option key={u._id} value={u._id}>
                                    {u.username} ({u.email})
                                </option>
                            ))}
                        </select>
                    </label>

                    {client.assignedTo && (
                        <div className="text-xs text-base-content/50">
                            Currently assigned. Selecting a different user will reassign.
                        </div>
                    )}
                </div>
            )}
        </BaseModal>
    );
};

export default AssignClientModal;
