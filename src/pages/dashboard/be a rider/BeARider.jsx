import React from 'react';
import {useForm} from 'react-hook-form';

import toast from 'react-hot-toast';
import warehouses from '../../../assets/warehouses.json';
import useAuth from "../../../hooks/useAuth.jsx";
import useAxiosSecure from "../../../hooks/useAxios.jsx";
import Swal from "sweetalert2";

const BeARider = () => {
    const {user} = useAuth();
    const {register, handleSubmit, watch, reset, formState: {errors}} = useForm();

    const axiosSecure = useAxiosSecure();

    const region = watch("region");

    const regions = [...new Set(warehouses.map(w => w.region))];
    const getCentersByRegion = (region) =>
        warehouses.filter(w => w.region === region);

    const onSubmit = (data) => {
        const riderApplication = {
            ...data,
            name: user.displayName,
            email: user.email,
            status: 'pending',
            createdAtISO: new Date().toISOString(),
            createdAtUnix: Date.now(),
        };


        console.log("🛵 Rider Application:", riderApplication);

        axiosSecure.post('/riders', riderApplication)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Application Submitted!',
                        text: 'Your rider application has been received. We will contact you soon.',
                        confirmButtonColor: '#2563EB', // Tailwind blue-600
                    });
                    reset();
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while submitting your application.',
                    confirmButtonColor: '#DC2626', // Tailwind red-600
                });
            });
    };
    return (
        <div className="max-w-3xl mx-auto my-12 p-6 bg-base-100 shadow-lg rounded-xl">
            <h2 className="text-3xl font-bold text-center mb-4">🛵 Become a Rider</h2>
            <p className="text-center text-gray-500 mb-6">Fill in your details to apply as a rider</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Read-only Name and Email */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Full Name</label>
                        <input
                            type="text"
                            value={user.displayName || ''}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            value={user.email || ''}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Rider Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Age</label>
                        <input type="number" {...register("age", {required: true})}
                               className="input input-bordered w-full"/>
                        {errors.age && <span className="text-error text-sm">Age is required</span>}
                    </div>
                    <div>
                        <label className="label">Phone Number</label>
                        <input type="text" {...register("phone", {required: true})}
                               className="input input-bordered w-full"/>
                        {errors.phone && <span className="text-error text-sm">Phone is required</span>}
                    </div>
                </div>

                {/* Region + Center */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">Region</label>
                        <select {...register("region", {required: true})} className="select select-bordered w-full">
                            <option value="">Select Region</option>
                            {regions.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                        {errors.region && <span className="text-error text-sm">Region required</span>}
                    </div>
                    <div>
                        <label className="label">Service Center</label>
                        <select {...register("district", {required: true})} className="select select-bordered w-full">
                            <option value="">Select District</option>
                            {getCentersByRegion(region).map(c => (
                                <option key={c.id} value={c.district}>
                                    {c.name} ({c.district})
                                </option>
                            ))}
                        </select>
                        {errors.district && <span className="text-error text-sm">District required</span>}
                    </div>
                </div>

                {/* Bike Info */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="label">NID Number</label>
                        <input type="text" {...register("nid", {required: true})}
                               className="input input-bordered w-full"/>
                        {errors.nid && <span className="text-error text-sm">NID is required</span>}
                    </div>
                    <div>
                        <label className="label">Bike Brand</label>
                        <input type="text" {...register("bikeBrand", {required: true})}
                               className="input input-bordered w-full"/>
                        {errors.bikeBrand && <span className="text-error text-sm">Required</span>}
                    </div>
                    <div>
                        <label className="label">Bike Registration No</label>
                        <input type="text" {...register("bikeNumber", {required: true})}
                               className="input input-bordered w-full"/>
                        {errors.bikeNumber && <span className="text-error text-sm">Required</span>}
                    </div>
                </div>

                {/* Submit */}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary px-8">Submit Application</button>
                </div>
            </form>
        </div>
    );
};

export default BeARider;
