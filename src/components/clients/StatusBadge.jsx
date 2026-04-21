const StatusBadge = ({ status }) => {
    const isActive = status === 'Active';
    return (
        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
            isActive 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-600'
        }`}>
            {status}
        </span>
    );
};

export default StatusBadge;
