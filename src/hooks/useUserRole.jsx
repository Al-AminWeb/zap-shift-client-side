import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure(); // ✅ Use your secure axios here

    const {
        data: role,
        isLoading: roleLoading,
        refetch,
    } = useQuery({
        queryKey: ['userRole', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            if (!user?.email) throw new Error('User email is missing');

            // console.log('🔍 Fetching role for user:', user.email);

            const res = await axiosSecure.get('/user/role', {
                params: { email: user.email },
            });

            // console.log('✅ API response:', res.data); // { role: "admin" }

            return res.data.role;
        },
    });

    return {
        role,
        roleLoading: authLoading || roleLoading,
        refetch,
    };
};

export default useUserRole;





// import { useQuery } from '@tanstack/react-query';
// import useAuth from './useAuth';
//
//
// const useUserRole = () => {
//     const { user, loading: authLoading } = useAuth();
//
//     const {
//         data: role,
//         isLoading: roleLoading,
//         refetch,
//     } = useQuery({
//         queryKey: ['userRole', user?.email],
//         enabled: !authLoading && !!user?.email,
//         queryFn: async () => {
//             const res = await fetch(`http://localhost:3000/user/role/?email=${user?.email}`, {
//                 headers: {
//                     Authorization: `Bearer ${user.accessToken}`,
//                 }
//             });
//             const data = await res.json();
//             console.log(data);
//             return data.role;
//         },
//     });
//
//     return { role, roleLoading: authLoading || roleLoading, refetch };
// };
//
// export default useUserRole;
