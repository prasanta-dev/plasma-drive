import React from 'react'

export const statusStyles = {
    Pending: "bg-amber-100 text-amber-700 border border-amber-200",
    Completed: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Cancelled: "bg-rose-100 text-rose-700 border border-rose-200",
}

function StatusBadge({ status }) {
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[status] ?? 'bg-gray-100 text-gray-600 border border-gray-200'}`}>
            {status}
        </span>
    )
}

export default StatusBadge
