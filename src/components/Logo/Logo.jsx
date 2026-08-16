import React from 'react'
import plasma from '../../assets/Logo.png'
function Logo({color, marginBottom}) {
    return (
        <div className="flex items-center gap-3 cursor-pointer">
            <img src={plasma} className={`w-auto h-6 mb-1 ${color} ${marginBottom}`} alt="" />
        </div>
    )
}

export default Logo