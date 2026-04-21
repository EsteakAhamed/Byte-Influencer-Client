import ClientRow from './ClientRow';

const ClientTable = ({ data, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Client Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Campaign</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Stats</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(client => (
                        <ClientRow
                            key={client._id}
                            client={client}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientTable;
