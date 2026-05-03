import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { X, Eye, EyeOff, Loader2, Lock } from 'lucide-react';

const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Current password is required'),
  
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters')
    .regex(/[a-zA-Z]/, 'Must contain at least 1 letter')
    .regex(/[0-9]/, 'Must contain at least 1 number')
    .regex(/[^a-zA-Z0-9]/, 'Must contain at least 1 special character'),
  
  confirmNewPassword: z
    .string()
    .min(1, 'Please confirm your new password')
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: 'Passwords do not match',
  path: ['confirmNewPassword']
}).refine(data => data.currentPassword !== data.newPassword, {
  message: 'New password must be different from current password',
  path: ['newPassword']
});

export default function ChangePasswordModal({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(changePasswordSchema)
  });

  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // Call backend API
      await axios.patch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/change-password`,
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword
        },
        {
          headers: {
            'Authorization': `Bearer ${token || localStorage.getItem('byte_token')}`,
            'Content-Type': 'application/json'
          }
        }
      );

      toast.success('Password changed successfully');
      reset();
      onClose();

    } catch (error) {
      console.error('Change password error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to change password';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-base-300/80 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="card w-full max-w-md bg-base-100 shadow-2xl z-10 animate-in zoom-in-95 duration-300 overflow-hidden border border-base-content/10 text-base-content">
        {/* Header */}
        <div className="bg-primary/5 p-6 border-b border-base-content/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Lock size={20} />
            </div>
            <h3 className="text-xl font-bold">Change Password</h3>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
          >
            <X size={20} />
          </button>
        </div>

        <div className="card-body p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Current Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Current Password</span>
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  placeholder="Enter current password"
                  className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 pr-10 ${errors.currentPassword ? 'input-error' : ''}`}
                  {...register('currentPassword')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-error text-xs mt-1 font-medium">{errors.currentPassword.message}</p>
              )}
            </div>

            {/* New Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">New Password</span>
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 pr-10 ${errors.newPassword ? 'input-error' : ''}`}
                  {...register('newPassword')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-error text-xs mt-1 font-medium">{errors.newPassword.message}</p>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Confirm New Password</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  className={`input input-bordered w-full bg-base-200/50 focus:bg-base-100 pr-10 ${errors.confirmNewPassword ? 'input-error' : ''}`}
                  {...register('confirmNewPassword')}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmNewPassword && (
                <p className="text-error text-xs mt-1 font-medium">{errors.confirmNewPassword.message}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                className="btn btn-ghost flex-1"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1 text-white border-none"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
