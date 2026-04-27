import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, UserPlus, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerUser } from '../services/authService';

const registerSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[a-zA-Z]/, "Must contain at least 1 letter")
        .regex(/[0-9]/, "Must contain at least 1 number")
        .regex(/[^a-zA-Z0-9]/, "Must contain at least 1 special character"),
    confirmPassword: z.string()
}).refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: "onChange"
    });

    const password = watch("password", "");

    const getPasswordStrength = (pass) => {
        if (!pass) return 0;
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[a-zA-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^a-zA-Z0-9]/.test(pass)) score++;
        return score;
    };

    const strength = getPasswordStrength(password);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await registerUser({
                username: data.username,
                email: data.email,
                password: data.password
            });
            toast.success(response.message || "Registration successful!");
            navigate('/login');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-300 via-base-100 to-primary/5 px-4 py-20">
            <div className="card w-full max-w-lg bg-base-100/40 backdrop-blur-xl border border-base-content/10 shadow-2xl">
                <div className="card-body p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                            <UserPlus size={32} />
                        </div>
                        <h2 className="text-3xl font-black tracking-tight">Create Your Account</h2>
                        <p className="text-base-content/60 mt-2">Join Byte Influencer and manage your growth</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Username */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold text-base-content/70">Username</span>
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40 group-focus-within:text-primary transition-colors">
                                    <UserPlus size={18} />
                                </span>
                                <input
                                    type="text"
                                    placeholder="johndoe"
                                    className={`input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-100 transition-all ${errors.username ? 'input-error' : 'focus:border-primary'}`}
                                    {...register('username')}
                                />
                            </div>
                            {errors.username && (
                                <p className="text-error text-xs mt-1 font-medium">{errors.username.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold text-base-content/70">Email Address</span>
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40 group-focus-within:text-primary transition-colors">
                                    <Mail size={18} />
                                </span>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    className={`input input-bordered w-full pl-10 bg-base-200/50 focus:bg-base-100 transition-all ${errors.email ? 'input-error' : 'focus:border-primary'}`}
                                    {...register('email')}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-error text-xs mt-1 font-medium">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold text-base-content/70">Password</span>
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40 group-focus-within:text-primary transition-colors">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`input input-bordered w-full pl-10 pr-10 bg-base-200/50 focus:bg-base-100 transition-all ${errors.password ? 'input-error' : 'focus:border-primary'}`}
                                    {...register('password')}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {/* Strength Indicator */}
                            {password && (
                                <div className="mt-2 space-y-1">
                                    <div className="flex gap-1 h-1">
                                        <div className={`flex-1 rounded-full transition-all duration-500 ${strength >= 1 ? (strength === 1 ? 'bg-error' : strength <= 3 ? 'bg-warning' : 'bg-success') : 'bg-base-content/10'}`}></div>
                                        <div className={`flex-1 rounded-full transition-all duration-500 ${strength >= 2 ? (strength <= 3 ? 'bg-warning' : 'bg-success') : 'bg-base-content/10'}`}></div>
                                        <div className={`flex-1 rounded-full transition-all duration-500 ${strength >= 3 ? (strength <= 3 ? 'bg-warning' : 'bg-success') : 'bg-base-content/10'}`}></div>
                                        <div className={`flex-1 rounded-full transition-all duration-500 ${strength >= 4 ? 'bg-success' : 'bg-base-content/10'}`}></div>
                                    </div>
                                    <p className="text-[10px] uppercase font-bold tracking-wider opacity-50">
                                        Strength: {strength <= 1 ? 'Weak' : strength <= 3 ? 'Medium' : 'Strong'}
                                    </p>
                                </div>
                            )}
                            {errors.password && (
                                <p className="text-error text-xs mt-1 font-medium">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold text-base-content/70">Confirm Password</span>
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40 group-focus-within:text-primary transition-colors">
                                    <Lock size={18} />
                                </span>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={`input input-bordered w-full pl-10 pr-10 bg-base-200/50 focus:bg-base-100 transition-all ${errors.confirmPassword ? 'input-error' : 'focus:border-primary'}`}
                                    {...register('confirmPassword')}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-primary transition-colors"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-error text-xs mt-1 font-medium">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block text-white border-none shadow-lg shadow-primary/20 mt-4 h-12"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm border-t border-base-content/5 pt-6">
                        <span className="text-base-content/60 font-medium text-xs">ALREADY HAVE AN ACCOUNT? </span>
                        <Link to="/login" className="link link-primary font-bold no-underline hover:underline ml-1">
                            LOG IN
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
