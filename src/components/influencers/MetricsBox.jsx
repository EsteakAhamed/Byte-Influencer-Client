const MetricsBox = ({ metrics }) => {
    return (
        <div className="text-xs grid grid-cols-2 gap-x-3 gap-y-1 text-gray-600">
            <div className="flex justify-between">
                <span className="font-medium">Average Likes:</span> 
                <span>{Number(metrics?.avgLikes || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium">Average Views:</span> 
                <span>{Number(metrics?.avgViews || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between col-span-2 mt-1 pt-1 border-t border-gray-100">
                <span className="font-medium">Engagement Rate:</span> 
                <span className="font-semibold text-gray-800">{metrics?.engagementRate}%</span>
            </div>
        </div>
    );
};

export default MetricsBox;