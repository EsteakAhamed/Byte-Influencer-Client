import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import StatusBadge from './StatusBadge';
import StatsBox from './StatsBox';

const ClientRow = ({ client, onEdit, onDelete }) => {
    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-4 px-4">
                <div>
                    <p className="font-medium text-gray-900">{client.name}</p>
                </div>
            </td>
            <td className="py-4 px-4 text-gray-600">{client.campaign}</td>
            <td className="py-4 px-4">
                <StatusBadge status={client.status} />
            </td>
            <td className="py-4 px-4">
                <StatsBox stats={client.stats} />
            </td>
            <td className="py-4 px-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(client)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <FiEdit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(client)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <FiTrash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ClientRow;
