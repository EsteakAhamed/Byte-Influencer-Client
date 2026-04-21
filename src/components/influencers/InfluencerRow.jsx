import { Trash2, Edit3 } from 'lucide-react';
import PlatformBadge from './PlatformBadge';
import MetricsBox from './MetricsBox';

const InfluencerRow = ({ c, onDelete, onEdit }) => {
    return (
        <tr>
            <td>
                <div className="font-bold">{c.name}</div>
                <div className="text-xs text-gray-500">{c.handle}</div>
            </td>

            <td>{c.niche}</td>

            <td>
                <PlatformBadge platforms={c.platforms} />
            </td>

            <td>
                {Number(c.followers || 0).toLocaleString()}
            </td>

            <td>{c.status}</td>

            <td>
                <MetricsBox metrics={c.metrics} />
            </td>

            <td className="flex gap-2">
                <button onClick={() => onEdit(c)}>
                    <Edit3 size={16} />
                </button>

                <button onClick={() => onDelete(c._id)}>
                    <Trash2 size={16} />
                </button>
            </td>
        </tr>
    );
};

export default InfluencerRow;