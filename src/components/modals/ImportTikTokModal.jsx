import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { importTikTok } from '../../services/influencerService';
import BaseModal from './BaseModal';

const ImportTikTokModal = ({ onClose, refresh }) => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImport = async (e) => {
        e.preventDefault();

        if (!url.includes("tiktok.com") && !url.startsWith("@")) {
            return toast.error("Invalid TikTok URL or username");
        }

        try {
            setLoading(true);
            const res = await importTikTok(url);
            
            if (res && res.message === "Influencer already exists") {
                toast("Already exists", { icon: "ℹ️" });
            } else {
                toast.success("Imported successfully");
            }

            refresh();
            onClose();
        } catch (error) {
            toast.error(error.message || "Import failed");
        } finally {
            setLoading(false);
        }
    };

    const footer = (
        <>
            <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="btn px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 disabled:opacity-50 font-medium"
            >
                Cancel
            </button>
            <button 
                type="button"
                onClick={handleImport}
                className="btn px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center font-medium min-w-[100px]"
                disabled={loading || !url.trim()}
            >
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                {loading ? "Importing..." : "Import"}
            </button>
        </>
    );

    return (
        <BaseModal 
            title="Import TikTok" 
            onClose={onClose} 
            footer={footer}
        >
            <form onSubmit={handleImport} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    TikTok Profile URL or @username
                </label>
                <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://tiktok.com/@username or @username"
                    className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    disabled={loading}
                    autoFocus
                />
            </form>
        </BaseModal>
    );
};

export default ImportTikTokModal;
