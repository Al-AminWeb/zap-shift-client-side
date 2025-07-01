import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {data, Link} from 'react-router';
import useAuth from "../../../hooks/useAuth.jsx";
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from "axios";
import useAxios from "../../../hooks/useAxios.jsx";

const Register = () => {
    const [profilePic,setProfilePic]=useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [previewImage, setPreviewImage] = useState(null);
    const axiosInstance = useAxios();


    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);
                const userInfo = {
                    email:data.email,
                    role:"user",
                    created_at : new Date().toISOString(),
                    last_log_in:new Date().toISOString(),
                }

                const userRes=await axiosInstance.post('/user',userInfo)
                console.log(userRes.data);

                updateUserProfile({
                    displayName: data.name,
                    photoURL: profilePic // or handle file upload
                });

            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(image);
        }

        const formData = new FormData();
        formData.append('image',image);
        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

        try {
            const res = await axios.post(url, formData);
            if (res.data && res.data.success) {
                setProfilePic(res.data.data.url);
            } else {
                console.error("Image upload failed", res.data);
                alert("Image upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Check your connection or API key.");
        }

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            <div className="card bg-white w-full max-w-md shadow-xl p-6 rounded-xl">
                <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="label text-gray-700 font-medium">Profile Picture</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input file-input-bordered w-full" />
                        {previewImage && <img src={previewImage} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-full mx-auto" />}
                    </div>

                    {/* Name */}
                    <div className="mb-4">
                        <label className="label text-gray-700 font-medium">Name</label>
                        <input type="text" {...register('name', { required: true })} className="input input-bordered w-full" placeholder="Your Name" />
                        {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="label text-gray-700 font-medium">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input input-bordered w-full" placeholder="Email" />
                        {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="label text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            {...register('password', { required: true, minLength: 6 })}
                            className="input input-bordered w-full"
                            placeholder="Password"
                        />
                        {errors.password?.type === 'required' && <p className="text-red-500 text-sm mt-1">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500 text-sm mt-1">Password must be 6 characters or longer</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full mt-4">Register</button>

                    {/* Link to login */}
                    <p className="text-center text-sm mt-4">
                        Already have an account?
                        <Link className="text-blue-600 hover:underline ml-1" to="/login">Login</Link>
                    </p>
                </form>

                <div className="divider my-6">OR</div>

                {/* Social Login */}
                <SocialLogin />
            </div>
        </div>
    );
};

export default Register;
