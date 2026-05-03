import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, LogIn, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await loginUser(data);

            // Store auth data and update context state
            login(response.token, response.user);

            toast.success(response.message || "Welcome back!");

            // Send to dashboard after successful login
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-300 via-base-100 to-primary/5 px-4">
            <div className="card w-full max-w-md bg-base-100/40 backdrop-blur-xl border border-base-content/10 shadow-2xl">
                <div className="card-body p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                            <LogIn size={32} />
                        </div>
                        <h2 className="text-3xl font-black tracking-tight">Welcome Back</h2>
                        <p className="text-base-content/60 mt-2">Sign in to manage your influencer network</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-bold text-base-content/70 text-xs uppercase tracking-widest">Email Address</span>
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-base-content/40 group-focus-within:text-primary transition-colors">
                                    <Mail size={18} />
                                </span>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
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
                            <div className="flex justify-between items-end">
                                <label className="label">
                                    <span className="label-text font-bold text-base-content/70 text-xs uppercase tracking-widest">Password</span>
                                </label>
                                <Link to="#" className="text-xs font-bold text-primary hover:underline mb-1 opacity-70">Forgot Password?</Link>
                            </div>
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
                            {errors.password && (
                                <p className="text-error text-xs mt-1 font-medium">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block text-white border-none shadow-lg shadow-primary/20 mt-4 h-12"
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm border-t border-base-content/5 pt-6">
                        <span className="text-base-content/60 font-medium text-xs">NEW TO THE PLATFORM? </span>
                        <Link to="/register" className="link link-primary font-bold no-underline hover:underline ml-1 uppercase tracking-widest">
                            Join Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
