const PlatformBadge = ({ platforms }) => {
    return (
        <div className="flex flex-wrap gap-1">
            {platforms?.map((p, i) => (
                <span
                    key={i}
                    className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700 border border-gray-200"
                >
                    {p}
                </span>
            ))}
        </div>
    );
};

export default PlatformBadge;