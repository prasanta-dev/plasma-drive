import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
import { LuLayoutDashboard, LuClipboardList, LuPlus, LuLogOut } from "react-icons/lu"
import authService from '../../services/AuthServices'
import { logoutSuccess } from '../../redux/features/authSlice'
import OrdersPanel from '../../components/Admin/OrdersPanel'
import AddServicePanel from '../../components/Admin/AddServicePanel'

// 🔑 Add the email(s) that should have access to this dashboard.
const ADMIN_EMAILS = [
    'loldeep4646@gmail.com',
]

const NAV_ITEMS = [
    { key: 'orders', label: 'Orders', icon: LuClipboardList },
    { key: 'add-service', label: 'Add Service', icon: LuPlus },
]

function Admin() {
    const { userData, authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState('orders')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleLogout = async () => {
        try {
            await authService.logout()
            dispatch(logoutSuccess())
        } catch (error) {
            console.log(error)
        }
    }

    // Wait for the session check on refresh before deciding access
    if (authLoading) {
        return (
            <div className="flex items-center justify-center h-screen text-neutral-500">
                Loading...
            </div>
        )
    }

    // Not logged in, or logged in but not an admin email — send home
    if (!userData || !ADMIN_EMAILS.includes(userData.email)) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="flex min-h-screen bg-[#f4f3f1]">
            {/* Sidebar */}
            <aside
                className={`fixed sm:static z-40 inset-y-0 left-0 w-64 bg-[#1c1b1a] text-neutral-200 flex flex-col transition-transform duration-300
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
            >
                <div className="px-6 py-6 border-b border-white/10">
                    <p className="text-lg font-bold tracking-tight text-white">Plasma Drive</p>
                    <p className="text-xs text-amber-400 mt-0.5">Admin Dashboard</p>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-1">
                    {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => { setActiveTab(key); setSidebarOpen(false) }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer
                                ${activeTab === key
                                    ? 'bg-amber-400 text-neutral-900'
                                    : 'text-neutral-300 hover:bg-white/5'
                                }`}
                        >
                            <Icon className="text-base" />
                            {label}
                        </button>
                    ))}
                </nav>

                <div className="px-3 py-4 border-t border-white/10 space-y-1">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-300 hover:bg-white/5 transition"
                    >
                        <LuLayoutDashboard className="text-base" />
                        Back to site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-300 hover:bg-white/5 transition cursor-pointer"
                    >
                        <LuLogOut className="text-base" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 sm:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="flex-1 min-w-0">
                {/* Mobile top bar */}
                <div className="sm:hidden flex items-center justify-between px-4 py-3 bg-[#1c1b1a] text-white">
                    <p className="font-bold">Plasma Drive Admin</p>
                    <button onClick={() => setSidebarOpen(true)} className="cursor-pointer">
                        <LuLayoutDashboard className="text-xl" />
                    </button>
                </div>

                <main className="p-4 sm:p-8 max-w-5xl mx-auto">
                    {activeTab === 'orders' && <OrdersPanel />}
                    {activeTab === 'add-service' && <AddServicePanel />}
                </main>
            </div>
        </div>
    )
}

export default Admin
