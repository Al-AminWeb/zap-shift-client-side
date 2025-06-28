import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {
    RouterProvider,
} from "react-router";
import {router} from "./router/router.jsx";

import 'aos/dist/aos.css';
import AOS from 'aos';
import AuthProvider from "./context/AuthContext/AuthProvider.jsx";
import {QueryClient} from "@tanstack/react-query";
import {QueryClientProvider} from "@tanstack/react-query";

AOS.init()
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <div className='bg-[#ebeced]'>
            <div className='urbanist max-w-7xl mx-auto '>
               <QueryClientProvider client={queryClient}>
                   <AuthProvider>
                       <RouterProvider router={router}/>
                   </AuthProvider>
               </QueryClientProvider>
            </div>
        </div>

    </StrictMode>,
)
