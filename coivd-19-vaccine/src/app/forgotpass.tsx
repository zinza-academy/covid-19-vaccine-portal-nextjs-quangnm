'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import bgforget from '@/asset/image/bgforget.jpg';
import { Button } from '@mui/material';

const Forgotpass = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!email) {
            alert('Email is required');
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            router.push('');
        }, 2000);
    };

    return (
        <div className="row align-items-start" style={{ height: '100vh' }}>
            <div
                className="col"
                style={{
                    backgroundImage: `url(${bgforget.src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%'
                }}
            >
            </div>
            <div className="col d-flex justify-content-center align-items-center h-100">
                <form onSubmit={handleSubmit} className="w-75">
                    <div className="text-center mb-3">
                        <span>Để khôi phục mật khẩu, vui lòng đăng nhập đúng email đã dùng để đăng ký <span className="text-danger">(*)</span></span>
                    </div>
                    <input
                        type="email"
                        placeholder="user@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control mb-3"
                        required
                    />
                    <div className='col d-flex justify-content-center align-items-center'>
                        <Button variant="outlined" className='mr-2'>Quay lại</Button>
                        <button
                            type="submit"
                            className="btn btn-primary mx-2"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Gửi...' : 'Gửi'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Forgotpass;
