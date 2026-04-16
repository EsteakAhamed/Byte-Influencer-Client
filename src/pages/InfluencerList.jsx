import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, ExternalLink, Trash2, Edit3 } from 'lucide-react';

const InfluencerList = () => {
    // Mock data with more detail to match the premium UI
    const [creators] = useState([
        { id: 1, name: "Alex Rivera", handle: "@arivera_tech", platform: "YouTube", followers: "1.2M", niche: "Technology", status: "Active", avatar: "AR" },
        { id: 2, name: "Sarah Chen", handle: "@schen_studio", platform: "Instagram", followers: "850K", niche: "Design", status: "Active", avatar: "SC" },
        { id: 3, name: "Marcus Jordan", handle: "@mj_hoops", platform: "TikTok", followers: "2.4M", niche: "Sports", status: "Inactive", avatar: "MJ" },
        { id: 4, name: "Elena Gomez", handle: "@elena_travels", platform: "TikTok", followers: "500K", niche: "Travel", status: "Active", avatar: "EG" },
    ]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Influencer Network</h1>
                    <p className="text-zinc-500 mt-1 font-medium">Manage and monitor your global creator base.</p>
                </div>
                <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95">
                    + Add New Creator
                </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-3xl border border-zinc-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name or handle..."
                        className="w-full pl-12 pr-4 py-3 bg-zinc-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 font-semibold rounded-2xl transition-all">
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-[32px] border border-zinc-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-50/50 border-b border-zinc-100">
                            <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-zinc-400">Creator</th>
                            <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-zinc-400">Platform</th>
                            <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-zinc-400">Followers</th>
                            <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-zinc-400">Status</th>
                            <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-zinc-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {creators.map((creator) => (
                            <tr key={creator.id} className="hover:bg-emerald-50/30 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                                            {creator.avatar}
                                        </div>
                                        <div>
                                            <p className="font-bold text-zinc-900 leading-none">{creator.name}</p>
                                            <p className="text-zinc-400 text-sm mt-1">{creator.handle}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${creator.platform === 'YouTube' ? 'bg-red-50 text-red-600' :
                                            creator.platform === 'Instagram' ? 'bg-purple-50 text-purple-600' :
                                                'bg-zinc-900 text-white'
                                        }`}>
                                        {creator.platform}
                                    </span>
                                </td>
                                <td className="px-8 py-5 font-semibold text-zinc-700">{creator.followers}</td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${creator.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-300'}`}></span>
                                        <span className={`text-xs font-bold ${creator.status === 'Active' ? 'text-emerald-700' : 'text-zinc-500'}`}>
                                            {creator.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-white rounded-lg text-zinc-400 hover:text-emerald-600 transition-colors shadow-sm border border-transparent hover:border-zinc-100">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-white rounded-lg text-zinc-400 hover:text-red-600 transition-colors shadow-sm border border-transparent hover:border-zinc-100">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InfluencerList;