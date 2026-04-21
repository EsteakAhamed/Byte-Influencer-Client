import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { importYouTube } from '../../services/influencerService';
import BaseModal from './BaseModal';

const ImportYouTubeModal = ({ onClose, refresh }) => {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImport = async (e) => {
        e.preventDefault();

        const queryToSubmit = input.trim();

        if (!queryToSubmit) {
            return toast.error("Please enter a valid channel ID or URL");
        }

        try {
            setLoading(true);
            const res = await importYouTube(queryToSubmit);
            
            if (res && res.message === "Influencer already exists") {
                toast("Already exists", { icon: "ℹ️" });
            } else {
                toast.success("YouTube channel imported");
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
                disabled={loading || !input.trim()}
            >
                {loading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
                {loading ? "Importing..." : "Import"}
            </button>
        </>
    );

    return (
        <BaseModal 
            title="Import YouTube" 
            onClose={onClose} 
            footer={footer}
        >
            <form onSubmit={handleImport} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Channel ID, @username, or URL
                </label>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="https://youtube.com/@username"
                    className="input w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    disabled={loading}
                    autoFocus
                />
            </form>
        </BaseModal>
    );
};

export default ImportYouTubeModal;