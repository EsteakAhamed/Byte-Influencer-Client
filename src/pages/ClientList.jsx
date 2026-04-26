import { useEffect, useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import {
    FiLoader,
    FiInbox,
    FiUsers,
    FiDollarSign,
    FiTarget,
    FiSearch,
    FiPlus,
    FiFilter,
    FiCheckCircle,
    FiXCircle
} from 'react-icons/fi';

import ClientTable from '../components/clients/ClientTable';
import CreateClientModal from '../components/modals/CreateClientModal';
import EditClientModal from '../components/modals/EditClientModal';
import DeleteClientModal from '../components/modals/DeleteClientModal';
import { fetchClients, deleteClient } from '../services/clientService';

const STATUS_FILTER = [
    { id: 'all', label: 'All', icon: FiFilter },
    { id: 'Active', label: 'Active', icon: FiCheckCircle },
    { id: 'Inactive', label: 'Inactive', icon: FiXCircle }
];

const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-base-100 rounded-xl p-5 border border-base-content/10 shadow-sm">
        <div className="flex justify-between">
            <div>
                <p className="text-sm text-base-content/60">{label}</p>
                <p className="text-2xl font-bold text-base-content">{value}</p>
            </div>
            <Icon className="w-5 h-5 text-base-content/60" />
        </div>
    </div>
);

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const [showCreate, setShowCreate] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);

    const loadClients = async () => {
        try {
            setLoading(true);
            const data = await fetchClients();
            if (data) setClients(data);
        } catch (err) {
            toast.error(err.message || 'Failed to load clients');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadClients();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const stats = useMemo(() => {
        const totalBudget = clients.reduce((sum, c) => sum + (c.stats?.budget || 0), 0);
        const totalInfluencers = clients.reduce((sum, c) => sum + (c.stats?.influencersCount || 0), 0);
        const activeCount = clients.filter(c => c.status === 'Active').length;

        const formatCurrency = (num) => {
            if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
            if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
            return `$${num}`;
        };

        return {
            total: clients.length,
            budget: formatCurrency(totalBudget),
            influencers: totalInfluencers,
            active: activeCount
        };
    }, [clients]);

    const filtered = useMemo(() => {
        let result = clients;

        if (selectedStatus !== 'all') {
            result = result.filter(c => c.status === selectedStatus);
        }

        if (debouncedSearch) {
            const search = debouncedSearch.toLowerCase();
            result = result.filter(c =>
                c.name?.toLowerCase().includes(search) ||
                c.campaign?.toLowerCase().includes(search)
            );
        }

        return result;
    }, [clients, debouncedSearch, selectedStatus]);

    const handleDelete = async () => {
        if (!deleting) return;
        const id = deleting._id;
        const prev = clients;
        setClients(prev.filter(c => c._id !== id));

        try {
            await deleteClient(id);
            toast.success('Deleted');
            setDeleting(null);
        } catch (err) {
            setClients(prev);
            toast.error(err.message || 'Delete failed');
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <FiLoader className="animate-spin w-10 h-10 text-gray-400" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-base-content">Client Management</h1>
                <p className="text-base-content/60">Manage client campaigns and budgets</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatCard icon={FiUsers} label="Total Clients" value={stats.total} />
                <StatCard icon={FiDollarSign} label="Total Budget" value={stats.budget} />
                <StatCard icon={FiUsers} label="Influencers" value={stats.influencers} />
                <StatCard icon={FiTarget} label="Active" value={stats.active} />
            </div>

            {/* Filter + Search */}
            <div className="bg-base-100 border border-base-content/10 rounded-xl p-4 mb-6 flex flex-col lg:flex-row gap-4">
                {/* Status Filter */}
                <div className="flex flex-wrap gap-2">
                    {STATUS_FILTER.map(s => {
                        const Icon = s.icon;
                        const active = selectedStatus === s.id;
                        return (
                            <button
                                key={s.id}
                                onClick={() => setSelectedStatus(s.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${active
                                        ? 'bg-base-content text-base-100'
                                        : 'bg-base-200 text-base-content/70 hover:bg-base-300'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {s.label}
                            </button>
                        );
                    })}
                </div>

                {/* Search + Add */}
                <div className="flex gap-3 lg:ml-auto">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-base-content/40" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-base-100 border border-base-content/20 rounded-lg focus:outline-none focus:border-emerald-500 text-base-content"
                            placeholder="Search clients..."
                        />
                    </div>

                    <button
                        onClick={() => setShowCreate(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                    >
                        <FiPlus className="w-4 h-4" />
                        Add Client
                    </button>
                </div>
            </div>

            {/* Table */}
            {filtered.length > 0 ? (
                <ClientTable
                    data={filtered}
                    onEdit={setEditing}
                    onDelete={setDeleting}
                />
            ) : (
                <div className="text-center py-20 text-gray-400">
                    <FiInbox className="mx-auto mb-4 w-12 h-12" />
                    No clients found
                </div>
            )}

            {/* Modals */}
            {showCreate && (
                <CreateClientModal onClose={() => setShowCreate(false)} refresh={loadClients} />
            )}
            {editing && (
                <EditClientModal client={editing} onClose={() => setEditing(null)} refresh={loadClients} />
            )}
            {deleting && (
                <DeleteClientModal client={deleting} onClose={() => setDeleting(null)} refresh={loadClients} />
            )}
        </div>
    );
};

export default ClientList;