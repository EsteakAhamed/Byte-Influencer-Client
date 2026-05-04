import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    FiLoader, FiInbox, FiUsers, FiDollarSign, FiTarget,
    FiSearch, FiPlus, FiFilter, FiCheckCircle, FiXCircle
} from 'react-icons/fi';

import ClientTable from '../components/clients/ClientTable';
import Pagination from '../components/Pagination';
import CreateClientModal from '../components/modals/CreateClientModal';
import DeleteClientModal from '../components/modals/DeleteClientModal';
import { fetchClients, deleteClient } from '../services/clientService';
import EditClientModal from '../components/modals/EditClientModal';
import LoadingSpinner from '../components/LoadingSpinner';

const STATUS_FILTER = [
    { id: 'all', label: 'All', icon: FiFilter },
    { id: 'Active', label: 'Active', icon: FiCheckCircle },
    { id: 'Inactive', label: 'Inactive', icon: FiXCircle }
];

const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-base-100 rounded-xl p-5 border border-base-content/10">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-base-content/40">{label}</p>
                <p className="text-2xl font-black text-base-content mt-1">{value}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-base-200">
                <Icon className="w-5 h-5 text-base-content/50" />
            </div>
        </div>
    </div>
);

const ClientList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    const [debouncedSearch, setDebouncedSearch] = useState(searchParams.get('search') || '');
    const [selectedStatus, setSelectedStatus] = useState(searchParams.get('status') || 'all');
    const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
    const [pagination, setPagination] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);

    const loadClients = async (page = currentPage) => {
        try {
            setLoading(true);
            const response = await fetchClients({ page, limit: 20 });
            if (response?.success) {
                setClients(response.data);
                setPagination(response.pagination);
            }
        } catch (err) {
            toast.error(err.message || 'Failed to load clients');
        } finally { setLoading(false); }
    };

    useEffect(() => { loadClients(); }, []);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Update URL params when state changes
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('search', searchTerm);
        if (selectedStatus !== 'all') params.set('status', selectedStatus);
        if (currentPage > 1) params.set('page', currentPage);
        setSearchParams(params);
    }, [searchTerm, selectedStatus, currentPage, setSearchParams]);

    // Reset page to 1 when search or status changes
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, selectedStatus]);

    // Reload when page changes
    useEffect(() => {
        loadClients(currentPage);
    }, [currentPage]);

    const stats = useMemo(() => {
        const totalBudget = clients.reduce((sum, c) => sum + (c.stats?.budget || 0), 0);
        const totalInfluencers = clients.reduce((sum, c) => sum + (c.stats?.influencersCount || 0), 0);
        const activeCount = clients.filter(c => c.status === 'Active').length;
        const formatCurrency = (num) => {
            if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
            if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
            return `$${num}`;
        };
        return { total: pagination?.totalCount || clients.length, budget: formatCurrency(totalBudget), influencers: totalInfluencers, active: activeCount };
    }, [clients, pagination]);

    const filtered = useMemo(() => {
        let result = clients;
        if (selectedStatus !== 'all') result = result.filter(c => c.status === selectedStatus);
        if (debouncedSearch) {
            const search = debouncedSearch.toLowerCase();
            result = result.filter(c => c.name?.toLowerCase().includes(search) || c.campaign?.toLowerCase().includes(search));
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
        return <LoadingSpinner inline message="Loading clients..." />;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-base-content">Client Management</h1>
                <p className="text-base-content/50 font-medium mt-1">Manage client campaigns and budgets</p>
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
                <div className="flex flex-wrap gap-2">
                    {STATUS_FILTER.map(s => {
                        const Icon = s.icon;
                        const active = selectedStatus === s.id;
                        return (
                            <button
                                key={s.id}
                                onClick={() => setSelectedStatus(s.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${active
                                    ? 'bg-base-content text-base-100'
                                    : 'bg-base-200 text-base-content/60 hover:bg-base-300'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {s.label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex gap-3 lg:ml-auto">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-2.5 w-4 h-4 text-base-content/30" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-base-200 border border-base-content/10 rounded-lg focus:outline-none focus:border-emerald-500 text-base-content placeholder:text-base-content/40 font-medium"
                            placeholder="Search clients..."
                        />
                    </div>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors"
                    >
                        <FiPlus className="w-4 h-4" />
                        Add Client
                    </button>
                </div>
            </div>

            {/* Table */}
            {clients.length > 0 ? (
                <>
                    <ClientTable data={clients} onEdit={setEditing} onDelete={setDeleting} />
                    {pagination && (
                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            totalCount={pagination.totalCount}
                            limit={pagination.limit}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            ) : (
                <div className="text-center py-20">
                    <FiInbox className="mx-auto mb-4 w-12 h-12 text-base-content/20" />
                    <p className="text-base-content/40 font-medium">No clients found</p>
                </div>
            )}

            {/* Modals */}
            {showCreate && <CreateClientModal onClose={() => setShowCreate(false)} refresh={loadClients} />}
            {editing && <EditClientModal client={editing} onClose={() => setEditing(null)} refresh={loadClients} />}
            {deleting && <DeleteClientModal client={deleting} onClose={() => setDeleting(null)} refresh={loadClients} />}
        </div>
    );
};

export default ClientList;