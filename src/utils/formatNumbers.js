// Convert large follower counts to readable format (2.5M vs 2500000)
export const formatFollowers = (num) => {
    if (!num || num === 0) return '0';
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toString();
};

// Format budget for display ($1.2M instead of $1200000)
export const formatBudget = (num) => {
    if (!num || num === 0) return '$0';
    if (num >= 1_000_000) return '$' + (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return '$' + (num / 1_000).toFixed(1) + 'K';
    return '$' + num.toString();
};

// Format percentage with one decimal place
export const formatEngagement = (num) => {
    if (!num || num === 0) return '0%';
    return num.toFixed(1) + '%';
};

// Convert ISO date to readable format (Jan 15, 2024)
export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
};
