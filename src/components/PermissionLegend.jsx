import { FiUser, FiUserCheck, FiUnlock, FiLock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

// Educational component - explains badge meanings to new users
// Appears above tables to provide context without cluttering each row
const PermissionLegend = () => {
    const { isAdmin } = useAuth();

    const items = [
        {
            icon: FiUser,
            label: 'Owner',
            desc: 'You created this',
            color: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/20'
        },
        {
            icon: FiUserCheck,
            label: 'Assigned',
            desc: 'Assigned by admin',
            color: 'bg-blue-500/15 text-blue-600 border-blue-500/20'
        },
        ...(isAdmin ? [{
            icon: FiUnlock,
            label: 'Admin',
            desc: 'Full access',
            color: 'bg-purple-500/15 text-purple-600 border-purple-500/20'
        }] : []),
        {
            icon: FiLock,
            label: 'View Only',
            desc: 'Cannot edit',
            color: 'bg-base-content/10 text-base-content/40 border-base-content/10'
        }
    ];

    return (
        <div className="flex flex-wrap items-center gap-4 mb-4 px-4 py-3 bg-base-100 border border-base-content/10 rounded-xl">
            <span className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Permission Guide:</span>
            {items.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${item.color}`}>
                        <item.icon size={12} />
                        <span>{item.label}</span>
                    </div>
                    <span className="text-xs text-base-content/40 hidden sm:inline">{item.desc}</span>
                </div>
            ))}
        </div>
    );
};

export default PermissionLegend;
