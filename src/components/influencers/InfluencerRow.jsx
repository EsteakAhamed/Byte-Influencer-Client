import { useNavigate } from 'react-router-dom';
import { Trash2, Edit3 } from 'lucide-react';
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
            className="cursor-pointer hover:bg-base-200 transition-colors"
        >
            <td>
                <div className="font-bold text-base-content">{c.name}</div>
                <div className="text-xs text-base-content/60">{c.handle}</div>
            </td>

            <td className="text-base-content/80">{c.niche}</td>

            <td>
                <PlatformBadge platforms={c.platforms} />
            </td>

            <td className="text-base-content/80">
                {Number(c.followers || 0).toLocaleString()}
            </td>

            <td>
                <span className={`badge badge-sm ${c.status === 'Active' ? 'badge-success' : 'badge-ghost'}`}>
                    {c.status}
                </span>
            </td>

            <td>
                <MetricsBox metrics={c.metrics} />
            </td>

            <td className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button onClick={handleEditClick} className="btn btn-ghost btn-xs text-base-content/70 hover:text-base-content">
                    <Edit3 size={16} />
                </button>

                <button onClick={handleDeleteClick} className="btn btn-ghost btn-xs text-error/70 hover:text-error">
                    <Trash2 size={16} />
                </button>
            </td>
        </tr>
    );
};

export default InfluencerRow;