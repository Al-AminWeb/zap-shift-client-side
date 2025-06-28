import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import warehouses from '../../assets/warehouses.json'
import useAuth from "../../hooks/useAuth.jsx";
import {useEffect} from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
       // 1️⃣  current user hook

const ParcelForm = () => {
    /* ─── Auth ─── */
    const { user } = useAuth()// user.email → creator’s e‑mail


    /* ─── React‑Hook‑Form ─── */
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors }
    } = useForm()
    const axiosSecure = useAxiosSecure()

    /* ─── Local watch values ─── */
    const parcelType     = watch('type')
    const senderRegion   = watch('senderRegion')
    const receiverRegion = watch('receiverRegion')

    /* Clear weight when switching to Document */
    useEffect(() => {
        if (parcelType === 'document') setValue('weight', '')
    }, [parcelType, setValue])

    /* ─── Helper data ─── */
    const regions = [...new Set(warehouses.map(w => w.region))]
    const getCentersByRegion = region => warehouses.filter(w => w.region === region)

    const isSameDistrict = (senderCenterName, receiverCenterName) => {
        const sender   = warehouses.find(w => w.name === senderCenterName)
        const receiver = warehouses.find(w => w.name === receiverCenterName)
        return sender && receiver && sender.district === receiver.district
    }

    /* Pricing + breakdown */
    const calculateCostDetails = ({ type, weight = 0, senderCenter, receiverCenter }) => {
        const within = isSameDistrict(senderCenter, receiverCenter)
        weight = parseFloat(weight) || 0
        const breakdown = []
        let total = 0

        if (type === 'document') {
            const base = within ? 60 : 80
            breakdown.push({ label: 'Document base fee', amount: base })
            total = base
            return { breakdown, total }
        }

        // Non‑document
        if (weight <= 3) {
            const base = within ? 110 : 150
            breakdown.push({ label: 'Non‑document base (≤3kg)', amount: base })
            total = base
            return { breakdown, total }
        }

        // weight > 3kg
        const base    = within ? 110 : 150
        const extraKg = weight - 3
        const extraWt = extraKg * 40
        breakdown.push({ label: 'Base (first 3kg)', amount: base })
        breakdown.push({ label: `Extra weight (${extraKg}kg × ৳40)`, amount: extraWt })
        total = base + extraWt

        if (!within) {
            breakdown.push({ label: 'Outside‑district surcharge', amount: 40 })
            total += 40
        }
        return { breakdown, total }
    }

    /* ─── Submit handler ─── */
    const onSubmit = data => {
        const { breakdown, total } = calculateCostDetails({
            ...data,
            senderCenter: data.senderCenter,
            receiverCenter: data.receiverCenter
        })

        /* quick toast */
        toast(`Estimated Cost: ৳${total}`, { icon: '💰' })

        /* SweetAlert2 modal HTML */
        const listHTML = breakdown
            .map(
                i =>
                    `<li style="display:flex;justify-content:space-between;margin-bottom:4px">
             <span>${i.label}</span><span>৳${i.amount}</span>
           </li>`
            )
            .join('')
        const modalHTML = `
      <div style="text-align:left;font-size:16px">
        <ul style="list-style:none;padding:0">${listHTML}</ul>
        <hr style="margin:8px 0">
        <div style="display:flex;justify-content:space-between;font-weight:bold;font-size:20px">
          <span>Total</span><span style="color:#16a34a">৳${total}</span>
        </div>
      </div>
    `

        Swal.fire({
            title: 'Confirm Delivery Cost',
            html: modalHTML,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Proceed to Payment',
            cancelButtonText: 'Back to Edit',
            confirmButtonColor: '#16a34a',
            cancelButtonColor: '#d97706',
            reverseButtons: true
        }).then(result => {
            if (result.isConfirmed) {
                const now = new Date()
                const parcelData = {
                    ...data,
                    createdBy: user?.email || 'anonymous',
                    createdAtISO: now.toISOString(),
                    createdAtUnix: now.getTime()
                }
                console.log('📦 Saved Parcel:', parcelData)
                axiosSecure.post('/parcels',parcelData)
                    .then(res => {
                        console.log(res.data);
                    })

                toast.success('Parcel saved! Redirecting to payment…')
                reset()
                /* optional: navigate('/payment', { state: { parcel: parcelData } }) */
            } else {
                toast('Feel free to adjust your parcel details.')
            }
        })
    }

    /* ─── JSX ─── */
    return (
        <div className="max-w-5xl mx-auto p-6 bg-base-100 shadow-xl rounded-xl my-12">
            <Toaster />
            <h1 className="text-3xl font-bold text-center">Send a Parcel</h1>
            <p className="text-center text-gray-500 mb-6">Please fill in the required fields</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* ── Parcel Info ── */}
                <section className="bg-base-200 p-4 rounded-xl">
                    <h2 className="text-xl font-semibold mb-2">Parcel Info</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Type */}
                        <div>
                            <label className="label">Type</label>
                            <div className="flex gap-4">
                                {['document', 'non-document'].map(opt => (
                                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value={opt}
                                            {...register('type', { required: true })}
                                            className="radio radio-primary"
                                        />
                                        <span className="capitalize">{opt.replace('-', ' ')}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.type && <span className="text-error text-sm">Required</span>}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="label">Parcel Name</label>
                            <input
                                type="text"
                                {...register('title', { required: true })}
                                className="input input-bordered w-full"
                            />
                            {errors.title && <span className="text-error text-sm">Required</span>}
                        </div>

                        {/* Weight */}
                        {parcelType === 'non-document' && (
                            <div>
                                <label className="label">Weight (kg)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register('weight', { required: true })}
                                    className="input input-bordered w-full"
                                />
                                {errors.weight && <span className="text-error text-sm">Required</span>}
                            </div>
                        )}
                    </div>
                </section>

                {/* ── Sender & Receiver ── */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sender */}
                    <div className="bg-base-200 p-4 rounded-xl">
                        <h2 className="text-xl font-semibold mb-2">Sender Info</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                className="input input-bordered w-full"
                                placeholder="Sender Name"
                                defaultValue="Alamin Islam"
                                {...register('senderName', { required: true })}
                            />
                            <input
                                className="input input-bordered w-full"
                                placeholder="Contact"
                                {...register('senderContact', { required: true })}
                            />
                            {/* NEW: Sender E‑mail */}
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                placeholder="Sender E‑mail"
                                {...register('senderEmail', { required: true })}
                            />
                            {errors.senderEmail && (
                                <span className="text-error text-sm md:col-span-2">Required & must be valid e‑mail</span>
                            )}
                            <select
                                className="select select-bordered w-full"
                                {...register('senderRegion', { required: true })}
                            >
                                <option value="">Select Region</option>
                                {regions.map(r => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="select select-bordered w-full"
                                {...register('senderCenter', { required: true })}
                            >
                                <option value="">Select Service Center</option>
                                {getCentersByRegion(senderRegion).map(c => (
                                    <option key={c.id} value={c.name}>
                                        {c.name} ({c.district})
                                    </option>
                                ))}
                            </select>
                            <textarea
                                className="textarea textarea-bordered md:col-span-2"
                                placeholder="Address"
                                {...register('senderAddress', { required: true })}
                            />
                            <textarea
                                className="textarea textarea-bordered md:col-span-2"
                                placeholder="Pickup Instruction"
                                {...register('pickupInstruction', { required: true })}
                            />
                        </div>
                    </div>

                    {/* Receiver */}
                    <div className="bg-base-200 p-4 rounded-xl">
                        <h2 className="text-xl font-semibold mb-2">Receiver Info</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                className="input input-bordered w-full"
                                placeholder="Receiver Name"
                                {...register('receiverName', { required: true })}
                            />
                            <input
                                className="input input-bordered w-full"
                                placeholder="Contact"
                                {...register('receiverContact', { required: true })}
                            />
                            <select
                                className="select select-bordered w-full"
                                {...register('receiverRegion', { required: true })}
                            >
                                <option value="">Select Region</option>
                                {regions.map(r => (
                                    <option key={r} value={r}>
                                        {r}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="select select-bordered w-full"
                                {...register('receiverCenter', { required: true })}
                            >
                                <option value="">Select Service Center</option>
                                {getCentersByRegion(receiverRegion).map(c => (
                                    <option key={c.id} value={c.name}>
                                        {c.name} ({c.district})
                                    </option>
                                ))}
                            </select>
                            <textarea
                                className="textarea textarea-bordered md:col-span-2"
                                placeholder="Address"
                                {...register('receiverAddress', { required: true })}
                            />
                            <textarea
                                className="textarea textarea-bordered md:col-span-2"
                                placeholder="Delivery Instruction"
                                {...register('deliveryInstruction', { required: true })}
                            />
                        </div>
                    </div>
                </section>

                {/* ── Submit ── */}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary px-10">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ParcelForm
