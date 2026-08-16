import React, { useEffect, useState } from 'react'
import booking from '../../services/BookingService'
import addServices from '../../services/AddServices'
import StatusBadge from './StatusBadge'
import defaultImg from '../../assets/defaultImg.jpg'

const STATUS_OPTIONS = ['Pending', 'Completed', 'Cancelled']

function OrdersPanel() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('All')
    const [updatingId, setUpdatingId] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        let active = true
        setLoading(true)
        booking.getAllBookings()
            .then((res) => { if (active) setOrders(res.documents) })
            .catch(() => { if (active) setError('Could not load orders. Check your connection and try again.') })
            .finally(() => { if (active) setLoading(false) })
        return () => { active = false }
    }, [])

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingId(orderId)
        const prev = orders
        // optimistic update
        setOrders((current) =>
            current.map((o) => (o.$id === orderId ? { ...o, bookingStatus: newStatus } : o))
        )
        try {
            await booking.updateBookingStatus(orderId, newStatus)
        } catch (error) {
            setOrders(prev) // rollback
            setError('Could not update status. Try again.')
        } finally {
            setUpdatingId(null)
        }
    }

    const counts = orders.reduce((acc, o) => {
        acc[o.bookingStatus] = (acc[o.bookingStatus] || 0) + 1
        return acc
    }, {})

    const filteredOrders = filter === 'All'
        ? orders
        : orders.filter((o) => o.bookingStatus === filter)

    return (
        <div>
            {/* Header + stats */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900">Orders</h1>
                    <p className="text-sm text-neutral-500 mt-1">All bookings across every customer.</p>
                </div>

                <div className="flex gap-2 text-sm">
                    <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-medium">
                        Pending {counts.Pending || 0}
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium">
                        Completed {counts.Completed || 0}
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-medium">
                        Cancelled {counts.Cancelled || 0}
                    </div>
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 mb-5 border-b border-neutral-200 pb-3 overflow-x-auto">
                {['All', ...STATUS_OPTIONS].map((opt) => (
                    <button
                        key={opt}
                        onClick={() => setFilter(opt)}
                        className={`px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                            filter === opt
                                ? 'bg-neutral-900 text-white'
                                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {error && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
                    {error}
                </div>
            )}

            {/* Orders list */}
            {loading ? (
                <div className="space-y-3">
                    {Array(4).fill(0).map((_, i) => (
                        <div key={i} className="h-24 rounded-xl bg-neutral-100 animate-pulse" />
                    ))}
                </div>
            ) : filteredOrders.length === 0 ? (
                <p className="text-neutral-400 mt-10 text-center">No orders found.</p>
            ) : (
                <ul className="space-y-3">
                    {filteredOrders.map((order) => (
                        <li
                            key={order.$id}
                            className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-neutral-200 bg-white shadow-sm"
                        >
                            <img
                                src={order.imageId ? addServices.getFilePreview(order.imageId) : defaultImg}
                                className="w-16 h-16 rounded-lg object-cover bg-neutral-100 shrink-0"
                                alt=""
                            />

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-semibold text-neutral-900 capitalize">{order.serviceName}</h3>
                                    <span className="text-xs text-neutral-400">#{order.$id.slice(-6)}</span>
                                </div>
                                <p className="text-sm text-neutral-600 mt-0.5">{order.customerName} · {order.phone}</p>
                                <p className="text-sm text-neutral-500 truncate">{order.address}</p>
                                {order.problemDescription && (
                                    <p className="text-xs text-neutral-400 mt-1 line-clamp-1">"{order.problemDescription}"</p>
                                )}
                            </div>

                            <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:text-right shrink-0">
                                <span className="text-sm font-semibold text-neutral-900">₹ {order.price}</span>
                                <span className="text-xs text-neutral-400">
                                    {new Date(order.$createdAt).toLocaleDateString('en-GB')}
                                </span>
                                <span className="text-xs text-neutral-400">
                                    {new Date(order.$createdAt).toLocaleTimeString('en-GB')}
                                </span>
                            </div>

                            <div className="flex flex-col items-start sm:items-end gap-2 sm:w-36 shrink-0">
                                <StatusBadge status={order.bookingStatus} />
                                <select
                                    value={order.bookingStatus}
                                    disabled={updatingId === order.$id}
                                    onChange={(e) => handleStatusChange(order.$id, e.target.value)}
                                    className="w-full sm:w-auto text-sm border border-neutral-200 rounded-md px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:opacity-50 cursor-pointer"
                                >
                                    {STATUS_OPTIONS.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default OrdersPanel
