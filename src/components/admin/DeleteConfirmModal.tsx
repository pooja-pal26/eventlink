import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
    registrationCode: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDeleting: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    registrationCode,
    onConfirm,
    onCancel,
    isDeleting,
}) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 border border-gray-700 rounded-xl w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <h2 className="text-lg font-semibold text-white">Delete Registration</h2>
                    </div>
                    <button
                        onClick={onCancel}
                        className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    <p className="text-gray-300">
                        Are you sure you want to delete registration{' '}
                        <span className="text-green-400 font-mono font-semibold">{registrationCode}</span>?
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        This action cannot be undone. All data associated with this registration will be permanently removed.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 p-4 border-t border-gray-700">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
