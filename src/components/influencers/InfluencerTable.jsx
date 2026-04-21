import InfluencerRow from './InfluencerRow';

const InfluencerTable = ({ data, onDelete, onEdit }) => {
    return (
        <table className="table w-full">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Niche</th>
                    <th>Platform</th>
                    <th>Followers</th>
                    <th>Status</th>
                    <th>Metrics</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                {data.map(c => (
                    <InfluencerRow
                        key={c._id}
                        c={c}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default InfluencerTable;