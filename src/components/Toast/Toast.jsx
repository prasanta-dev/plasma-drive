import React, { useEffect, useState } from 'react'
import { LuCircleCheck, LuCircleX, LuX } from 'react-icons/lu'

// type: 'success' | 'error'
function Toast({ show, type = 'success', title, message, onClose }) {
    const [visible, setVisible] = useState(false)
    const [render, setRender] = useState(false)

    useEffect(() => {
        if (show) {
            setRender(true)
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setVisible(true))
            })
        } else {
            setVisible(false)
            const t = setTimeout(() => setRender(false), 400)
            return () => clearTimeout(t)
        }
    }, [show])

    if (!render) return null

    const isSuccess = type === 'success'

    return (
        // Backdrop
        <div
            className={`fixed inset-0 z-200 flex items-center justify-center px-4 transition-all duration-400
                ${visible ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ backdropFilter: visible ? 'blur(6px)' : 'blur(0px)', backgroundColor: visible ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0)' }}
            onClick={onClose}
        >
            {/* Card */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    w-full max-w-sm bg-[#1c1b1a] text-white
                    border-l-4 ${isSuccess ? 'border-primary-400' : 'border-rose-400'}
                    rounded-2xl shadow-2xl px-6 py-6
                    flex flex-col items-center text-center gap-4
                    transition-all duration-400 ease-out
                    ${visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-6'}
                `}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-white transition cursor-pointer self-end"
                >
                    <LuX className="text-lg" />
                </button>

                {/* Icon */}
                <div className={`text-5xl ${isSuccess ? 'text-primary-400' : 'text-rose-400'}`}>
                    {isSuccess ? <LuCircleCheck /> : <LuCircleX />}
                </div>

                {/* Text */}
                <div>
                    <p className="font-bold text-lg text-white">{title}</p>
                    {message && (
                        <p className="text-sm text-neutral-400 mt-1.5 leading-relaxed">{message}</p>
                    )}
                </div>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className={`mt-1 px-6 py-2 rounded-lg text-sm font-semibold transition cursor-pointer
                        ${isSuccess
                            ? 'bg-primary-500 hover:bg-primary-600 text-white'
                            : 'bg-rose-500 hover:bg-rose-600 text-white'
                        }`}
                >
                    OK
                </button>
            </div>
        </div>
    )
}

export default Toast