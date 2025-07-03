// useAxiosSecure.jsx
import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

// Create an axios instance
const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
});

const useAxiosSecure = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ Add request interceptor once
        const requestInterceptor = axiosSecure.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // ✅ Add response interceptor once
        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                const status = error?.response?.status;

                if (status === 403) {
                    navigate('/forbidden');
                } else if (status === 401) {
                    logOut()
                        .then(() => navigate('/login'))
                        .catch(() => {});
                }

                return Promise.reject(error);
            }
        );

        // ✅ Cleanup: remove interceptors on unmount
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user, logOut, navigate]);

    // ✅ Return the configured instance
    return axiosSecure;
};

export default useAxiosSecure;
