import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import StatusBadge from './StatusBadge';
import StatsBox from './StatsBox';

const ClientRow = ({ client, onEdit, onDelete }) => {
    return (
        <tr className="hover:bg-base-200/60 transition-colors">
            <td className="py-4 px-5">
                <p className="font-bold text-base-content">{client.name}</p>
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
                    <button
                        onClick={() => onEdit(client)}
                        className="p-2 text-base-content/40 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                        <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(client)}
                        className="p-2 text-base-content/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <FiTrash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ClientRow;
