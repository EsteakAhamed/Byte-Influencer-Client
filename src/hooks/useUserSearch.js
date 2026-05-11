import { useState, useEffect, useMemo } from 'react';
import { getAllUsers } from '../services/adminService';
import toast from 'react-hot-toast';

// Custom hook for searching users by name or email
// DRY principle - reusable across assignment modals
const useUserSearch = (preSelectedUserId = null) => {
    const [allUsers, setAllUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch users on mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getAllUsers();
                // Filter out admins - they cannot be assigned
                const regularUsers = users.filter(u => u.role !== 'admin');
                setAllUsers(regularUsers);
            } catch (err) {
                toast.error('Failed to load users');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    // Filter users by name or email (case-insensitive)
    // Always include pre-selected user in results
    const filteredUsers = useMemo(() => {
        if (!searchTerm || searchTerm.trim() === '') return allUsers;
        
        const term = searchTerm.toLowerCase().trim();
        const filtered = allUsers.filter(user => 
            user.username.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term)
        );
        
        // Ensure pre-selected user is always visible
        if (preSelectedUserId) {
            const preSelected = allUsers.find(u => u._id.toString() === preSelectedUserId.toString());
            if (preSelected && !filtered.find(u => u._id.toString() === preSelectedUserId.toString())) {
                filtered.push(preSelected);
            }
        }
        
        return filtered;
    }, [allUsers, searchTerm, preSelectedUserId]);

    return {
        users: filteredUsers,
        searchTerm,
        setSearchTerm,
        loading,
        preSelectedUserId
    };
};

export default useUserSearch;
