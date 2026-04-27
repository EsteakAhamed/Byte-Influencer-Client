import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiLoader, FiYoutube } from 'react-icons/fi';
import { importYouTube } from '../../services/influencerService';
import BaseModal from './BaseModal';

const ImportYouTubeModal = ({ onClose, refresh }) => {
    const [ytUrl, setYtUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImport = async (e) => {
        e?.preventDefault();
        if (!ytUrl.includes("youtube.com") && !ytUrl.includes("youtu.be")) return toast.error("Invalid YouTube URL");
        try {
            setLoading(true);
            const res = await importYouTube(ytUrl);
            if (res && res.message === "Influencer already exists") toast("Already exists", { icon: "ℹ️" });
            else toast.success("Imported successfully");
            refresh(); onClose();
        } catch (error) { toast.error(error.message || "Import failed"); }
        finally { setLoading(false); }
    };

    const footer = (
        <div className="flex items-center gap-3 w-full sm:w-auto">
            <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2.5 border border-base-content/15 rounded-xl font-semibold text-base-content/70 hover:bg-base-300 transition-all disabled:opacity-50 flex-1 sm:flex-none">Cancel</button>
            <button type="button" onClick={handleImport} disabled={loading || !ytUrl.trim()} className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center min-w-[120px] disabled:opacity-50 flex-1 sm:flex-none">
                {loading ? <FiLoader className="animate-spin w-4 h-4 mr-2" /> : null}
                {loading ? "Importing..." : "Import"}
            </button>
        </div>
    );

    return (
        <BaseModal title="Import YouTube" onClose={onClose} footer={footer}>
            <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-base-200 border border-base-content/10 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-red-500/15 text-red-500"><FiYoutube className="w-6 h-6" /></div>
                    <div><h4 className="font-bold text-base-content">YouTube Channel</h4><p className="text-xs text-base-content/50">Enter the channel URL to analyze stats</p></div>
                </div>
                <form onSubmit={handleImport} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-base-content/70 ml-1">Channel URL</label>
                        <input value={ytUrl} onChange={(e) => setYtUrl(e.target.value)} placeholder="https://youtube.com/@channelname" className="w-full px-4 py-3 bg-base-200 border border-base-content/15 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none font-medium text-base-content placeholder:text-base-content/40 h-12 transition-colors" disabled={loading} autoFocus />
                    </div>
                </form>
            </div>
        </BaseModal>
    );
};

export default ImportYouTubeModal;