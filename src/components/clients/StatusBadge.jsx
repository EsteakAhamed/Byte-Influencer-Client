const StatusBadge = ({ status }) => {
    const isActive = status === 'Active';
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
            isActive 
                ? 'bg-emerald-500/15 text-emerald-500' 
                : 'bg-base-content/10 text-base-content/50'
        }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-base-content/30'}`}></span>
            {status}
        </span>
    );
};

export default StatusBadge;
