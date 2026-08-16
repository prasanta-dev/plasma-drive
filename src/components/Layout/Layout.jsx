import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
function Layout() {
  return (
    <div className='relative flex flex-col min-h-screen'>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-blue-400 opacity-20 blur-[100px]"></div></div>
      <Header />

      <main className='flex-1'>
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout