import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FiLoader, FiFacebook } from 'react-icons/fi';
import { importFacebook } from '../../services/influencerService';
import BaseModal from './BaseModal';

const ImportFacebookModal = ({ onClose, refresh }) => {
    const [fbUrl, setFbUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImport = async (e) => {
        e?.preventDefault();
        if (!fbUrl.includes("facebook.com")) return toast.error("Invalid Facebook URL");
        try {
            setLoading(true);
            const res = await importFacebook(fbUrl);
            if (res && res.message === "Influencer already exists") toast("Already exists", { icon: "ℹ️" });
            else toast.success("Imported successfully");
            refresh(); onClose();
        } catch (error) { toast.error(error.message || "Import failed"); }
        finally { setLoading(false); }
    };

    const footer = (
        <div className="flex items-center gap-3 w-full sm:w-auto">
            <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2.5 border border-base-content/15 rounded-xl font-semibold text-base-content/70 hover:bg-base-300 transition-all disabled:opacity-50 flex-1 sm:flex-none">Cancel</button>
            <button type="button" onClick={handleImport} disabled={loading || !fbUrl.trim()} className="px-8 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center min-w-[120px] disabled:opacity-50 flex-1 sm:flex-none">
                {loading ? <FiLoader className="animate-spin w-4 h-4 mr-2" /> : null}
                {loading ? "Importing..." : "Import"}
            </button>
        </div>
    );

    return (
        <BaseModal title="Import Facebook" onClose={onClose} footer={footer}>
            <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-base-200 border border-base-content/10 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-600/15 text-blue-500"><FiFacebook className="w-6 h-6" /></div>
                    <div><h4 className="font-bold text-base-content">Facebook Page</h4><p className="text-xs text-base-content/50">Enter the public page URL to fetch data</p></div>
                </div>
                <form onSubmit={handleImport} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-base-content/70 ml-1">Page URL</label>
                        <input value={fbUrl} onChange={(e) => setFbUrl(e.target.value)} placeholder="https://facebook.com/pagename" className="w-full px-4 py-3 bg-base-200 border border-base-content/15 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none font-medium text-base-content placeholder:text-base-content/40 h-12 transition-colors" disabled={loading} autoFocus />
                    </div>
                </form>
            </div>
        </BaseModal>
    );
};

export default ImportFacebookModal;
