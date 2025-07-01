import React from 'react';
import logo from '../../../assets/logo.png';
import { Link } from "react-router";

const ProFast = () => {
    return (
        <Link to='/' className="flex items-end btn btn-ghost">
            <img className='mb-2 w-10 h-10' src={logo} alt="ProFast Logo" />
            <p className='text-4xl font-bold -ml-3'>Profast</p>
        </Link>
    );
};

export default ProFast;
