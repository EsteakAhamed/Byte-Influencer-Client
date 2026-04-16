import React, { useState } from 'react';
import { Search, Filter, Trash2, Edit3, Building2, Briefcase, Mail } from 'lucide-react';

const ClientList = () => {
    const [clients] = useState([
        { id: 1, name: "Jordan Smith", company: "Nike", email: "j.smith@nike.com", status: "Active", project: "Summer Campaign", avatar: "JS" },
        { id: 2, name: "Sarah Connor", company: "Cyberdyne Systems", email: "sara@cyberdyne.io", status: "Pending", project: "Tech Launch", avatar: "SC" },
        { id: 3, name: "Bruce Wayne", company: "Wayne Ent.", email: "bruce@wayne.com", status: "Inactive", project: "Charity Gala", avatar: "BW" },
    ]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold text-zinc-900 tracking-tight">Client Portfolio</h1>
                    <p className="text-zinc-500 mt-1 font-medium">Manage brand relationships and active contracts.</p>
                </div>
                <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 transition-all active:scale-95">
                    + Add New Client
                </button>
            </div>

            {/* Filter & Search */}
            <div className="bg-white p-4 rounded-3xl border border-zinc-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by company or name..."
                        className="w-full pl-12 pr-4 py-3 bg-zinc-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-sm"
                    />
                </div>
                <button className="flex items-center gap-2 px-5 py-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 font-semibold rounded-2xl transition-all">
                    <Filter className="w-4 h-4" />
                    Filter Status
                </button>
            </div>

            {/* Client Table */}
            <div className="bg-white rounded-[32px] border border-zinc-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-50/50 border-b border-zinc-100">
                            <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-zinc-400">Client</th>
                            <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-zinc-400">Company</th>
                            <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-zinc-400">Current Project</th>
                            <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-zinc-400">Status</th>
                            <th className="px-8 py-5 text-xs uppercase tracking-widest font-bold text-zinc-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50">
                        {clients.map((client) => (
                            <tr key={client.id} className="hover:bg-emerald-50/30 transition-colors group">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-600 flex items-center justify-center font-bold text-sm">
                                            {client.avatar}
                                        </div>
                                        <div>
                                            <p className="font-bold text-zinc-900 leading-none">{client.name}</p>
                                            <div className="flex items-center gap-1 text-zinc-400 text-xs mt-1">
                                                <Mail size={12} /> {client.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-zinc-600 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Building2 size={16} className="text-emerald-500" />
                                        {client.company}
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                                        <Briefcase size={14} />
                                        {client.project}
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${client.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                                            client.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                'bg-zinc-100 text-zinc-500'
                                        }`}>
                                        {client.status}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-white rounded-lg text-zinc-400 hover:text-emerald-600 transition-all border border-transparent hover:border-zinc-100 shadow-sm">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-white rounded-lg text-zinc-400 hover:text-red-600 transition-all border border-transparent hover:border-zinc-100 shadow-sm">
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

export default ClientList;