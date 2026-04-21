import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const BaseModal = ({ 
    onClose, 
    title, 
    children, 
    footer 
}) => {
    const modalRef = useRef(null);

    // Close on ESC
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Close on outside click
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={handleOutsideClick}
        >
            <div 
                ref={modalRef} 
                className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col"
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {title}
                    </h2>
                    <button 
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body - scrolls internally */}
                <div className="px-6 py-5 overflow-y-auto max-h-[70vh] text-sm text-gray-600">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100 rounded-b-2xl">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BaseModal;
