import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Search, Trash2, Edit3, Loader2, UserPlus, X } from 'lucide-react';

const InfluencerList = () => {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // NEW: Instagram URL state
    const [igUrl, setIgUrl] = useState("");
    const [importing, setImporting] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    // GET ALL DATA
    const fetchCreators = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/influencers`);
            setCreators(response.data);
        } catch (err) {
            setError("Database connection failed.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCreators();
    }, []);

    // IMPORT FROM INSTAGRAM
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!igUrl.includes("instagram.com")) {
            return alert("Please enter a valid Instagram URL");
        }

        try {
            setImporting(true);

            const res = await axios.post(
                `${API_BASE_URL}/influencers/import-ig`,
                { igUrl }
            );

            console.log("Imported:", res.data);

            setIsModalOpen(false);
            setIgUrl("");
            fetchCreators(); // refresh list
        } catch (err) {
            console.error(err);
            alert("Failed to import influencer");
        } finally {
            setImporting(false);
        }
    };

    // SEARCH FILTER
    const filteredCreators = useMemo(() => {
        return creators.filter(c =>
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.niche?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, creators]);

    // LOADING SCREEN
    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-400">
            <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mb-4" />
            <p className="animate-pulse font-semibold">Syncing Network...</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">

            {/* HEADER */}
            <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-black text-zinc-900 tracking-tight">Network</h1>
                    <p className="text-zinc-500 font-medium text-lg mt-2">
                        Managing {creators.length} global creators.
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn bg-zinc-900 border-none rounded-2xl hover:bg-zinc-800 shadow-xl px-8 text-white h-14"
                >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Add Influencer
                </button>
            </header>

            {/* SEARCH */}
            <div className="flex mb-8">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search name, handle, or niche..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input w-full pl-12 bg-white border-zinc-200 rounded-2xl shadow-sm"
                    />
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-[40px] border border-zinc-100 shadow-2xl overflow-hidden">
                <table className="table w-full">
                    <thead className="bg-zinc-50/80">
                        <tr>
                            <th className="p-6 text-zinc-400 text-xs">Creator</th>
                            <th className="p-6 text-zinc-400 text-xs">Niche</th>
                            <th className="p-6 text-zinc-400 text-xs">Platform</th>
                            <th className="p-6 text-zinc-400 text-xs">Followers</th>
                            <th className="p-6 text-zinc-400 text-xs">Status</th>
                            <th className="p-6 text-zinc-400 text-xs text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-50">
                        {filteredCreators.map((creator) => (
                            <tr key={creator._id} className="hover:bg-emerald-50/40 group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-zinc-100 rounded-xl w-12 h-12 flex items-center justify-center font-bold text-xs">
                                            {creator.name.substring(0, 2)}
                                        </div>
                                        <div>
                                            <div className="font-bold">{creator.name}</div>
                                            <div className="text-zinc-400 text-xs">{creator.handle}</div>
                                        </div>
                                    </div>
                                </td>

                                <td className="p-6 capitalize">
                                    {creator.niche || 'General'}
                                </td>

                                <td className="p-6">
                                    <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-xl text-sm">
                                        {creator.platforms?.[0] || "Social"}
                                    </span>
                                </td>

                                {/* ✅ FIXED FOLLOWERS */}
                                <td className="p-6 font-bold">
                                    {creator.followers}
                                </td>

                                <td className="p-6">
                                    <span className={`px-2 py-1 text-xs rounded-lg ${creator.status === 'Active'
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-zinc-300'
                                        }`}>
                                        {creator.status}
                                    </span>
                                </td>

                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100">
                                        <button className="text-zinc-400 hover:text-emerald-600">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button className="text-zinc-400 hover:text-red-500">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-3xl p-8 relative">

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4"
                        >
                            <X />
                        </button>

                        <h2 className="text-2xl font-bold mb-6">
                            Import from Instagram
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="https://www.instagram.com/username/"
                                value={igUrl}
                                onChange={(e) => setIgUrl(e.target.value)}
                                className="input w-full border rounded-xl px-4 py-2"
                                required
                            />

                            <button
                                type="submit"
                                disabled={importing}
                                className="w-full bg-emerald-600 text-white py-3 rounded-xl"
                            >
                                {importing ? "Importing..." : "Import Influencer"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InfluencerList;