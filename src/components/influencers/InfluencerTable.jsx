import InfluencerRow from './InfluencerRow';

const InfluencerTable = ({ data, onDelete, onEdit }) => {
    return (
        <div className="bg-base-100 rounded-xl border border-base-content/10 overflow-hidden">
            <table className="table w-full">
                <thead className="bg-base-200">
                    <tr>
                        <th className="text-xs font-bold uppercase tracking-wider text-base-content/50">Name</th>
                        <th className="text-xs font-bold uppercase tracking-wider text-base-content/50">Niche</th>
                        <th className="text-xs font-bold uppercase tracking-wider text-base-content/50">Platform</th>
                        <th className="text-xs font-bold uppercase tracking-wider text-base-content/50">Followers</th>
                        <th className="text-xs font-bold uppercase tracking-wider text-base-content/50">Status</th>
                        <th className="text-xs font-bold uppercase tracking-wider text-base-content/50">Metrics</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(c => (
                        <InfluencerRow key={c._id} c={c} onDelete={onDelete} onEdit={onEdit} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InfluencerTable;