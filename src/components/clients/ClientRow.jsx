import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { UserPlus } from 'lucide-react';
import StatusBadge from './StatusBadge';
import StatsBox from './StatsBox';
import PermissionBadge from '../PermissionBadge';
import { usePermissions } from '../../hooks/usePermissions';

const ClientRow = ({ client, onEdit, onDelete, onAssign }) => {
    const { canEdit, canDelete, getPermissionType, isAdmin } = usePermissions();
    const permissionType = getPermissionType(client);
    const editable = canEdit(client);

    return (
        <tr className="hover:bg-base-200/60 transition-colors">
            <td className="py-4 px-5">
                <div className="flex items-center gap-2">
                    <p className="font-bold text-base-content">{client.name}</p>
                    <PermissionBadge type={permissionType} />
                </div>
            </td>
            <td className="py-4 px-5 text-base-content/70 font-medium">{client.campaign}</td>
            <td className="py-4 px-5">
                <StatusBadge status={client.status} />
            </td>
            <td className="py-4 px-5">
                <StatsBox stats={client.stats} />
            </td>
            <td className="py-4 px-5">
                <div className="flex gap-1.5">
                    {/* Assign button — admin only */}
                    {isAdmin && (
                        <button
                            onClick={() => onAssign && onAssign(client)}
                            className="p-2 text-base-content/40 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-colors"
                        >
                            <UserPlus className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={() => onEdit(client)}
                        disabled={!editable}
                        className={`p-2 rounded-lg transition-colors ${
                            editable 
                                ? 'text-base-content/40 hover:text-blue-500 hover:bg-blue-500/10' 
                                : 'text-base-content/20 cursor-not-allowed'
                        }`}
                        title={editable ? 'Edit' : 'You don\'t have permission to edit'}
                    >
                        <FiEdit2 className="w-4 h-4" />
                    </button>
                    {/* Delete button — admin only */}
                    {isAdmin && (
                        <button
                            onClick={() => onDelete(client)}
                            className="p-2 text-base-content/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            <FiTrash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

export default ClientRow;
