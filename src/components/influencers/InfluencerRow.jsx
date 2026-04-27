import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import PlatformBadge from './PlatformBadge';
import MetricsBox from './MetricsBox';

const InfluencerRow = ({ c, onDelete, onEdit }) => {
    const navigate = useNavigate();

    const handleRowClick = () => {
        navigate(`/influencers/${c._id}`);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        onEdit(c);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete(c._id);
    };

    return (
        <tr
            onClick={handleRowClick}
            className="cursor-pointer hover:bg-base-200/60 transition-colors"
        >
            <td>
                <div className="font-bold text-base-content">{c.name}</div>
                <div className="text-xs text-base-content/50 font-medium">{c.handle}</div>
            </td>

            <td className="text-base-content/70 font-medium">{c.niche}</td>

            <td>
                <PlatformBadge platforms={c.platforms} />
            </td>

            <td className="text-base-content font-bold">
                {Number(c.followers || 0).toLocaleString()}
            </td>

            <td>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                    c.status === 'Active' 
                        ? 'bg-emerald-500/15 text-emerald-500' 
                        : 'bg-base-content/10 text-base-content/50'
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${c.status === 'Active' ? 'bg-emerald-500' : 'bg-base-content/30'}`}></span>
                    {c.status}
                </span>
            </td>

            <td>
                <MetricsBox metrics={c.metrics} />
            </td>

            <td onClick={(e) => e.stopPropagation()}>
                <div className="flex gap-1.5">
                    <button onClick={handleEditClick} className="p-2 text-base-content/40 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors">
                        <FiEdit2 size={16} />
                    </button>
                    <button onClick={handleDeleteClick} className="p-2 text-base-content/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                        <FiTrash2 size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default InfluencerRow;