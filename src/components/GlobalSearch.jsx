import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiUsers, FiBriefcase } from 'react-icons/fi';
import { fetchInfluencers } from '../services/influencerService';
import { fetchClients } from '../services/clientService';

// Global command palette pattern - allows quick navigation without browsing lists
// Separate from list page search to enable jumping to any resource from anywhere
const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ influencers: [], clients: [] });
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    // Parallel fetch reduces total latency vs sequential requests
    const performSearch = useCallback(async (searchTerm) => {
        if (!searchTerm.trim()) {
            setResults({ influencers: [], clients: [] });
            return;
        }

        setLoading(true);
        try {
            const [influencerRes, clientRes] = await Promise.all([
                fetchInfluencers({ limit: 5, search: searchTerm }),
                fetchClients({ limit: 5, search: searchTerm })
            ]);

            setResults({
                influencers: influencerRes.data || [],
                clients: clientRes.data || []
            });
        } catch (err) {
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // 300ms delay prevents API spam while typing fast
    useEffect(() => {
        const timer = setTimeout(() => {
            performSearch(query);
        }, 300);
        return () => clearTimeout(timer);
    }, [query, performSearch]);

    // Close on outside click preserves standard dropdown behavior
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Cmd/Ctrl+K is the standard shortcut for command palettes (Slack, Notion, etc.)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
                setIsOpen(true);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSelect = (type, item) => {
        setIsOpen(false);
        setQuery('');
        navigate(`/${type}s/${item._id}`);
    };

    const hasResults = results.influencers.length > 0 || results.clients.length > 0;

    return (
        <div ref={containerRef} className="relative hidden md:block flex-1 max-w-lg mx-4">
            {/* Search Input */}
            <div className="relative">
                <FiSearch 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" 
                    size={18} 
                />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search influencers, clients... (⌘K)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    className="w-full pl-10 pr-10 py-2 bg-base-200 border border-transparent rounded-xl text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:border-emerald-500/50 focus:bg-base-100 transition-all"
                />
                {query && (
                    <button
                        onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                    >
                        <FiX size={16} />
                    </button>
                )}
            </div>

            {/* Results Dropdown */}
            {isOpen && (query || hasResults) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-base-100 border border-base-content/10 rounded-xl shadow-2xl shadow-black/10 z-50 overflow-hidden">
                    {loading ? (
                        <div className="p-4 text-center text-sm text-base-content/50">
                            Searching...
                        </div>
                    ) : !hasResults && query ? (
                        <div className="p-4 text-center text-sm text-base-content/50">
                            No results found for "{query}"
                        </div>
                    ) : (
                        <div className="max-h-96 overflow-y-auto">
                            {/* Influencers Section */}
                            {results.influencers.length > 0 && (
                                <div className="border-b border-base-content/5 last:border-0">
                                    <div className="px-4 py-2 text-xs font-bold text-base-content/40 uppercase tracking-wider bg-base-200/50">
                                        <FiUsers className="inline mr-1" size={12} />
                                        Influencers
                                    </div>
                                    {results.influencers.map((item) => (
                                        <button
                                            key={item._id}
                                            onClick={() => handleSelect('influencer', item)}
                                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-base-200 transition-colors text-left"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600 text-sm font-bold">
                                                {item.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-base-content truncate">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-base-content/50 truncate">
                                                    {item.handle || item.niche}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Clients Section */}
                            {results.clients.length > 0 && (
                                <div className="border-b border-base-content/5 last:border-0">
                                    <div className="px-4 py-2 text-xs font-bold text-base-content/40 uppercase tracking-wider bg-base-200/50">
                                        <FiBriefcase className="inline mr-1" size={12} />
                                        Clients
                                    </div>
                                    {results.clients.map((item) => (
                                        <button
                                            key={item._id}
                                            onClick={() => handleSelect('client', item)}
                                            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-base-200 transition-colors text-left"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-600 text-sm font-bold">
                                                {item.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-base-content truncate">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-base-content/50 truncate">
                                                    {item.campaign || item.status}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;
