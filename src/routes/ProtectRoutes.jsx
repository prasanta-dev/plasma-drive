import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectRoutes() {
    const {userData, authLoading} = useSelector((state) => state.auth)
    if(authLoading) return <div>Loading....</div>
    return userData ? <Outlet /> : <Navigate to='/login' replace />;
}

export default ProtectRoutes