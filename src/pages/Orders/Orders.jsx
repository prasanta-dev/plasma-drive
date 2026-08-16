import { div } from 'framer-motion/client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import booking from '../../services/BookingService'
import addServices from '../../services/AddServices';
import defaultImg from '../../assets/defaultImg.jpg'

const statusStyles = {
    Completed: "text-green-700 dark:text-green-500 dark:bg-green-900/20 text-[16px] font-medium inline-block rounded-md py-1.5",
    Pending: "text-blue-700 dark:text-blue-500 dark:bg-blue-900/20 text-[16px] font-medium inline-block rounded-md py-1.5",
    Cancelled: "text-red-700 dark:text-red-500 dark:bg-red-900/20 text-[16px] font-medium inline-block rounded-md py-1.5",
};


function Orders() {
    const { userData } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("All orders");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userData?.id) return;

        setLoading(true)
        booking.getBookings(userData.id)
            .then((res) => setOrders(res.documents))
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [userData])

    const filteredOrders = filter === "All orders"
        ? orders
        : orders.filter((o) => o.bookingStatus === filter)

    return (
        <main className="mt-6 px-4 md:px-20">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="border-b border-slate-300 pb-4 dark:border-neutral-700">
                    <div className="flex items-center flex-wrap gap-4">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                            Order History
                        </h1>

                        <div className="ml-auto">
                            <label htmlFor="order-filter" className="sr-only">Filter orders</label>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                id="order-filter"
                                className="appearance-none cursor-pointer bg-white border border-slate-300 px-3.5 py-2 text-slate-900 rounded-md text-sm font-semibold dark:text-slate-50 dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                                <option>All orders</option>
                                <option>Completed</option>
                                <option>Pending</option>
                                <option>Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                {
                    loading ? (
                        <p className="mt-6 text-slate-500 dark:text-slate-400">Loading...</p>
                    ) : filteredOrders.length === 0 ? (<p className="mt-6 text-slate-500 dark:text-slate-400">No orders found.</p>) : (
                        <ul className="divide-y divide-slate-300 mt-6 dark:divide-neutral-700">
                            {filteredOrders.map((order, index) => (
                                <li key={index} className="grid grid-cols-2 items-start justify-between gap-6 py-4 md:grid-cols-5">
                                    <div className="flex flex-col items-start gap-4 sm:flex-row md:col-span-2">
                                        <div className="bg-gray-100 p-2 rounded-md w-20 h-20 shrink-0 dark:bg-neutral-800">
                                            {/* {console.log(filteredOrders)} */}
                                            <img
                                                src={order.imageId ? addServices.getFilePreview(order.imageId) : defaultImg}
                                                className="w-full h-full object-cover rounded"
                                                alt={order.name}
                                            />
                                        </div>
                                        <div>
                                            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">{order.serviceName}</h2>
                                            <p className="mt-2 text-sm text-slate-500 font-medium dark:text-slate-400">
                                                Order ID:
                                                <span className="ml-1 text-slate-900 dark:text-slate-50 underline">{`#${(order.$id).slice(-6)}`}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <dl className="contents">
                                        <div>
                                            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Date & Time</dt>
                                            <dd className="text-sm text-slate-900 font-medium mt-1 dark:text-slate-50">{new Date(order.$createdAt).toLocaleDateString('en-GB')}</dd>
                                            <span className='text-sm text-slate-500 font-medium'>{new Date(order.$createdAt).toLocaleTimeString()}</span>
                                        </div>

                                        <div>
                                            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Status</dt>
                                            <dd
                                                // className={`${order.statusClass} text-[13px] font-medium mt-2 inline-block rounded-md py-1.5 px-2.5`}
                                                className={statusStyles[order.bookingStatus] ?? ''}
                                                aria-label={`Order status: ${order.status}`}
                                            >
                                                {order.bookingStatus}
                                            </dd>
                                        </div>

                                        <div className="md:ml-auto">
                                            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Price</dt>
                                            <dd className="text-sm text-red-400 font-medium mt-2 dark:text-slate-50 line-through">₹ {order.price}</dd>
                                            <dd className=" text-sm text-slate-900 font-medium dark:text-slate-50">
                                                ₹ 0.00
                                                <span className="block text-[10px] font-normal text-gray-400">Booking Price</span>
                                            </dd>
                                        </div>
                                    </dl>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </div>
        </main>
    );
};

export default Orders