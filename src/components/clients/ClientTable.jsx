import ClientRow from './ClientRow';

const ClientTable = ({ data, onEdit, onDelete }) => {
    return (
        <div className="bg-base-100 rounded-xl border border-base-content/10 overflow-hidden">
            <table className="w-full">
                <thead className="bg-base-200 border-b border-base-content/10">
                    <tr>
                        <th className="text-left py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-base-content/50">Client Name</th>
                        <th className="text-left py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-base-content/50">Campaign</th>
                        <th className="text-left py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-base-content/50">Status</th>
                        <th className="text-left py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-base-content/50">Stats</th>
                        <th className="text-left py-3.5 px-5 text-xs font-bold uppercase tracking-wider text-base-content/50">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-base-content/5">
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
