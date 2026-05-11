import { FiLock, FiUnlock, FiUser, FiUserCheck } from 'react-icons/fi';

// Visual indicator of edit rights - prevents confusion about why some items can be edited
// Color coding: owner (emerald), assigned (blue), admin (purple), view-only (gray)
const PermissionBadge = ({ type, showLabel = false }) => {
    const config = {
        owner: {
            icon: FiUser,
            label: 'Owner',
            className: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/20',
            tooltip: 'You created this - full edit access'
        },
        assigned: {
            icon: FiUserCheck,
            label: 'Assigned',
            className: 'bg-blue-500/15 text-blue-600 border-blue-500/20',
            tooltip: 'Assigned to you by admin - edit access'
        },
        admin: {
            icon: FiUnlock,
            label: 'Admin',
            className: 'bg-purple-500/15 text-purple-600 border-purple-500/20',
            tooltip: 'Admin access - full control'
        },
        none: {
            icon: FiLock,
            label: 'View Only',
            className: 'bg-base-content/10 text-base-content/40 border-base-content/10',
            tooltip: 'View only - contact admin for access'
        }
    };

    const { icon: Icon, label, className, tooltip } = config[type] || config.none;

    return (
        <div 
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${className} group relative cursor-help transition-all duration-200 hover:scale-105`}
            title={tooltip}
        >
            <Icon size={showLabel ? 14 : 12} />
            {showLabel && <span>{label}</span>}
            
            {/* Tooltip - shows on hover if not showing label */}
            {!showLabel && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-neutral text-neutral-content text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-lg">
                    {tooltip}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral" />
                </div>
            )}
        </div>
    );
};

export default PermissionBadge;
