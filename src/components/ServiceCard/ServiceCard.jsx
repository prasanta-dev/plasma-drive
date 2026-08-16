import React, { useState } from 'react'
import { GoPlus } from "react-icons/go";
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import addServices from "../../services/AddServices";
import { BsBagPlus } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/features/cartSlice';
import { button } from 'framer-motion/client';
import bulb from '../../assets/bulb.png'
import { setBagIconState } from '../../redux/features/bagIconEffectSlice';
import useServiceDetails from '../../hook/useServiceDetails';
import { setSelectService } from '../../redux/features/selectServiceSlice';


function ServicesCard({ service, panelOpen }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.auth);
    const items = useSelector((state) => state.cart.items);
    const isInCart = items.some((item) => item.$id === service.$id);



    const handleBookNowBtn = async () => {
        status ? panelOpen(true) : navigate('/login');
        try {
            const res = await addServices.getSingleService(service.slug);
            const doc = res.documents[0];
            dispatch(setSelectService(doc));
            // console.log(doc)
        } catch (error) {
            console.log(error)
        }
    }

    const imageUrl = service.imageId ? addServices.getFilePreview(service.imageId) : 'https://images.unsplash.com/photo-1776221241820-6cbbb6e7cb43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8'

    const handleAddToCart = async () => {
        try {
            const res = await addServices.getSingleService(service.slug);
            const doc = res.documents[0];
            dispatch(addToCart(doc));
            dispatch(setBagIconState(true));

        } catch (error) {
            console.log(error)
        }
    }

    const handleToggleCartIcon = () => {
        dispatch(removeFromCart(service.$id));
    }

    return (
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <div className='relative h-74 w-72'>
                <img
                    src={imageUrl}
                    alt="Product"
                    className="h-74 w-72 object-cover rounded-t-xl"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/95 to-transparent" />
                <h1 className='absolute bottom-2 font-bold text-base text-white px-4 line-clamp-2'>
                    {service.description}
                </h1>
            </div>
            <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">{service.category}</span>
                <p className="text-lg font-bold text-black truncate block capitalize">{service.title}</p>
                <div className='flex items-center justify-between mt-3'>
                    <button onClick={handleBookNowBtn} className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-2 font-medium text-neutral-200 cursor-pointer">
                        <span>Book Now</span>
                        <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]"><div className="relative h-full w-8 bg-white/20"></div></div></button>

                    <div className="p-2 w-11 h-11 flex justify-center">
                        {!isInCart ? (<button onClick={handleAddToCart} className='cursor-pointer active:scale-80 text-xl'>
                            <BsBagPlus />
                        </button>) : (<button className='cursor-pointer' onClick={handleToggleCartIcon}><img className='w-11' src={bulb} alt="" /></button>)}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ServicesCard



