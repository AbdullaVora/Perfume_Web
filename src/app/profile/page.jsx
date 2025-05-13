"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { IoIosMail } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiInstance from '@/api/instance';
import Header from '@/components/Header';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


const Profile = () => {
    const { userId, userEmail, userName, userPhone } = useSelector((state) => state.userData)
    const [phone, setPhone] = useState('');


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [originalData, setOriginalData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const [id, setId] = useState(null)


    useEffect(() => {
        const name = userName;
        const email = userEmail;
        const usermobile = userPhone; // Replace with actual userPhone from Redux if available
        const id = userId;

        setId(id);
        setPhone(userPhone || ''); // Initialize phone here
        setFormData({
            name: name || '',
            email: email || '',
            phone: usermobile || ''
        });
        setOriginalData({
            name: name || '',
            email: email || '',
            phone: usermobile || ''
        });
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const hasChanges = () => {
        return (
            formData.name !== originalData.name ||
            formData.email !== originalData.email ||
            phone !== originalData.phone
        );
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!hasChanges()) {
            // toast.info('No changes made', { autoClose: 2000 });
            Swal.fire({
                icon: 'info',
                text: 'No Changes Made',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        // console.log(formData)

        setIsLoading(true);
        try {
            const response = await apiInstance.put(`/api/auth/editUser/${id}`, {...formData, mobile: phone});

            if (response.status === 200) {
                // toast.success('Profile updated successfully', { autoClose: 2000 });
                Swal.fire({
                    icon: 'success',
                    text: 'Profile Updated Successfully',
                    timer: 2000,
                    showConfirmButton: false
                });
                localStorage.setItem('user', response.data.name);
                localStorage.setItem('userEmail', response.data.email);
                localStorage.setItem('userPhone', response.data.mobile);
                setOriginalData({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.mobile
                });
                setFormData(prev => ({
                    ...prev
                }));
            } else {
                // toast.error(response.data.message || 'Update failed', { autoClose: 2000 });
                Swal.fire({
                    icon: 'error',
                    text: response.data.messsage,
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            // toast.error(error.response?.data?.message || error.message || 'Update failed', { autoClose: 2000 });
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message,
                timer: 2000,
                showConfirmButton: false
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* <Header /> */}
            <div className="container-fluid px-3">
                <h2 className='text-center fw-bolder display-5 mt-4 mb-4'>PROFILE</h2>
                <div className="d-flex flex-column align-items-center justify-contant-center py-3 py-md-5">
                    <div className="login w-100" style={{ maxWidth: "500px" }}>
                        <h4 className='fw-bold mb-2'>Update Profile</h4>
                        <form onSubmit={handleSubmit}>
                            <label className='mt-3'>Full Name: </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleChange}
                                className='form-control py-3'
                                placeholder='ENTER YOUR NAME'
                                value={formData.name}
                            />
                            <label className='mt-3'>E-Mail: </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                className='form-control py-3'
                                placeholder='ENTER YOUR EMAIL'
                                value={formData.email}
                            />
                            <div className='mt-3'>
                                <PhoneInput
                                    international
                                    defaultCountry="US"
                                    value={phone}
                                    onChange={setPhone}
                                    className='form-control py-3'
                                    placeholder="ENTER YOUR PHONE NUMBER"
                                />
                            </div>
                            {/* <div className="position-relative mt-3">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                    className='form-control py-3'
                                    placeholder='ENTER NEW PASSWORD (leave blank to keep current)'
                                    value={formData.password}
                                />
                                <button
                                    type="button"
                                    className="position-absolute end-0 top-50 translate-middle-y bg-transparent border-0 me-3"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div> */}
                            <button
                                className='d-block w-100 mt-3 py-3 border-0 fw-semibold text-white rounded-1'
                                type='submit'
                                disabled={!hasChanges() || isLoading}
                                style={{
                                    backgroundColor: !hasChanges() ? '#cccccc' : '#0a5d5d',
                                    cursor: !hasChanges() ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isLoading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </>
    )
}

export default Profile