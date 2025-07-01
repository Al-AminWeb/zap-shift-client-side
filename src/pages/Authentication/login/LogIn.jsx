import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth.jsx';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const onSubmit = async (data) => {
        try {
            const result = await signIn(data.email, data.password);

            if (result.user) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: `Welcome back, ${result.user.displayName || 'User'}!`,
                    timer: 1500,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    navigate(from, { replace: true });
                }, 1600);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message,
            });
        }
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Please Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500">Email is required</p>}

                        <label className="label mt-4">Password</label>
                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6
                            })}
                            className="input input-bordered w-full"
                            placeholder="Password"
                        />
                        {
                            errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 characters or longer</p>
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>

                        <button type="submit" className="btn btn-primary text-black mt-4">Login</button>
                    </fieldset>
                    <p><small>New to this website? <Link className="btn btn-link" to="/register">Register</Link></small></p>
                </form>
                <SocialLogin />
            </div>
        </div>
    );
};

export default Login;
