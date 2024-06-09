import Link from "next/link";
import React, { useState } from "react";
import api from '@/app/api/api';
import { useUser } from "@/app/hooks/userContext";

const LoginModal: React.FC = () => {
    const { login } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        setError('');

        try {
            const response = await api.post('/auth/login', {
                username: email,
                password: password,
                expiresInMins: 30,
            });

            const userData = response.data;
            login(userData);
            setIsOpen(false);
        } catch (error) {
            setError('Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="outline-button">Sign In</button>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>Sign In</h3>
                            <button onClick={() => setIsOpen(false)} className="modal-close">&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <label htmlFor="email">Username: </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="username"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input"
                                    />
                                </div>
                            </div>
                            {error && <div className="text-red-500 text-sm">{error}</div>}
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleLogin} type="button" className="button" disabled={loading}>
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                            <Link href="#" className="mt-2 inline-block w-full text-center text-sm underline" prefetch={false}>
                                Forgot Password?
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            <style jsx>{`
              .outline-button {
                border: 1px solid gray;
                padding: 8px 16px;
                background-color: transparent;
                cursor: pointer;
              }

              .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .modal-container {
                background: white;
                padding: 20px;
                border-radius: 8px;
                max-width: 400px;
                width: 100%;
                position: relative;
              }

              .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
              }

              .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
              }

              .input {
                padding: 8px;
                border: 1px solid gray;
                border-radius: 4px;
                width: 100%;
              }

              .button {
                padding: 8px 16px;
                background-color: #000000;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                width: 100%;
              }
            `}</style>
        </div>
    );
};

export default LoginModal;
