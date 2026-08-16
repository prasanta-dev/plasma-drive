import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import { SlHandbag } from "react-icons/sl";
import authService from '../../services/AuthServices';
import { logoutSuccess } from '../../redux/features/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import { RiLogoutCircleRLine } from "react-icons/ri";
import { label } from 'framer-motion/client';
import { setBagIconState } from '../../redux/features/bagIconEffectSlice';
import { setSearchQuery } from '../../redux/features/searchSlice';
import bulb from '../../assets/bulb.png'
import ProfileDropdown from '../DropdownBtn/DropdownBtn';
import Logo from '../Logo/Logo'


function Navbar() {
    // State to handle mobile menu visibility

    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(false); // controls actual ren

    const NavItems = [
        { label: 'Home', path: '/' },
        { label: 'Services', path: '/services' },
        { label: 'About', path: '/about' },
        { label: 'Our Works', path: '/our-works' },
        { label: 'Contact Us', path: '/contact-us' },
    ]

    const isLogin = useSelector((state) => state.auth.status);
    const { userData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items)
    const BagIconState = useSelector((state) => state.bagIconEffect.bagIconState)
    const searchQuery = useSelector((state) => state.search.query);
    const navigate = useNavigate();

    const openMenu = () => {
        setVisible(true);
        setIsOpen(true); // tiny delay so enter animation triggers
    };

    const closeMenu = () => {
        setIsOpen(false);                        // triggers exit animation
        setTimeout(() => setVisible(false), 200); // unmount after animation completes
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            dispatch(logoutSuccess())
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        dispatch(setSearchQuery(value));

        if (value.trim()) {
            navigate('/services');
        }
    };



    return (
        <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-15">

                    {/* Mobile Menu Button (Left) */}
                    <div className="flex items-center md:hidden">
                        <button
                            type="button"
                            onClick={isOpen ? closeMenu : openMenu}
                            className="text-[#262610] hover:opacity-70 focus:outline-none"
                        >
                            {isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Logo Section */}
                    {/* <div className="flex items-center gap-3 cursor-pointer">
                        <div className="relative w-8 h-8 md:w-10 md:h-10 bg-[#262610] rounded-full overflow-hidden">
                            <div className="absolute top-0 w-full h-1/2 bg-[#FF7A00]"></div>
                        </div>
                        <span className="text-2xl md:text-3xl font-black tracking-tighter text-[#262610]">D33P</span>
                    </div> */}

                    {/* new Logo */}
                    <Link to={'/'}>
                        <Logo  />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 text-base font-medium text-[#262610]">
                        {NavItems.map((item) => (
                            <NavLink to={item.path} key={item.label} className={({ isActive }) => `transition ${isActive ? "text-[#0a9396]" : "text-gray-900 hover:text-gray-500/75 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"}`}>
                                <ul>
                                    <li className="flex items-center gap-1 cursor-pointer group"><span>{item.label}</span></li>
                                </ul>
                            </NavLink>
                        ))}

                    </div>

                    {/* Right Action Icons */}
                    <div className="flex gap-6 items-center justify-center text-[#262610] text-xl relative px-1">
                        <div className='absolute right-24.5'>
                            <input
                                value={searchQuery}
                                onChange={handleSearch}
                                type="text"
                                placeholder="Search ..."
                                className="hidden lg:block w-35 max-w-md text-sm px-4 py-1 border-2 border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all" />
                            <span className='hidden lg:block absolute top-1.5 right-2 text-gray-400'><IoSearch /></span>

                        </div>

                        {isLogin ?
                            <ProfileDropdown userData={userData} logout={handleLogout} />
                            :
                            <button className="hover:opacity-60 cursor-pointer text-[23px] sm:text-[26px] border rounded-full">
                                <Link to={'/register'}>
                                    <GoPerson />
                                </Link>
                            </button>}
                        <div className='relative'>
                            <Link to={'/addToCart'}>
                                <button onClick={() => dispatch(setBagIconState(false))} className="hover:opacity-60 cursor-pointer mt-1 ">
                                    <SlHandbag />
                                    <div className={`${items.length !== 0 ? "bg-green-300" : "bg-neutral-300"} flex items-center justify-center rounded-full text-sm absolute top-0 -right-3 w-5 h-5`}>{items.length}</div>
                                    {(BagIconState && items.length !== 0) ? (
                                        <span className=" bg-orange-400 flex items-center justify-center rounded-full text-sm absolute top-0 -right-3 w-5 h-5 animate-ping"></span>
                                    ) : ''}
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu with Conditional Rendering */}
            <>
                <style>{`
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 1; transform: translateY(0); }
      to   { opacity: 0; transform: translateY(-8px); }
    }
  `}</style>

                {visible && (
                    <div
                        className="md:hidden bg-white flex flex-col items-center gap-4 py-4 font-medium text-[#262610] absolute w-full"
                        style={{
                            animation: `${isOpen ? "slideDown" : "slideUp"} 0.2s ease-in-out forwards`
                        }}
                    >
                        {NavItems.map((item) => (
                            <NavLink
                                to={item.path}
                                key={item.label}
                                className={({ isActive }) =>
                                    `transition ${isActive ? "text-[#0a9396] underline underline-offset-4" : "text-gray-900 hover:text-gray-500/75"}`
                                }
                            >
                                <ul>
                                    <li onClick={closeMenu}>
                                        <span>{item.label}</span>
                                    </li>
                                </ul>
                            </NavLink>
                        ))}
                    </div>
                )}
            </>
        </nav>
    );
}

export default Navbar;