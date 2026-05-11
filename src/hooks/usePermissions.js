import { useAuth } from '../context/AuthContext';

// Mirrors backend permission logic to prevent UI from showing actions the user can't perform
// Backend is the source of truth; this hook is for UX optimization only
export const usePermissions = () => {
    const { user, isAdmin } = useAuth();

    const canEdit = (resource) => {
        if (isAdmin) return true;
        if (!user || !resource) return false;
        
        // IDs can be ObjectId (from API) or string (from JWT), normalize for comparison
        const userId = user.id || user._id;
        const createdBy = resource.createdBy?._id || resource.createdBy;
        const assignedTo = resource.assignedTo?._id || resource.assignedTo;
        
        const isCreator = createdBy?.toString() === userId?.toString();
        const isAssigned = assignedTo?.toString() === userId?.toString();
        
        return isCreator || isAssigned;
    };

    const canDelete = () => isAdmin;

    // Returns visual badge type - drives PermissionBadge component
    const getPermissionType = (resource) => {
        if (isAdmin) return 'admin';
        if (!user || !resource) return 'none';
        
        const userId = user.id || user._id;
        const createdBy = resource.createdBy?._id || resource.createdBy;
        const assignedTo = resource.assignedTo?._id || resource.assignedTo;
        
        if (createdBy?.toString() === userId?.toString()) return 'owner';
        if (assignedTo?.toString() === userId?.toString()) return 'assigned';
        return 'none';
    };

    return { canEdit, canDelete, getPermissionType, isAdmin };
};

export default usePermissions;
