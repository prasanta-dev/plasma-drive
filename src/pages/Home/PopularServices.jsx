import React from 'react'
import Services from '../Services/Services'
import Btn from '../../components/Btn/Btn'
import { Link } from 'react-router-dom'

function PopularServices() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4 mt-3">Popular Services</h2>
      <Services limit={3} />
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-100 h-1 my-8 bg-[#bdbcbc] border-0 rounded-sm shadow-2xl" />
        <div className="absolute px-4 -translate-x-1/2 bg-neutral-primary left-1/2">
          <Link to={'/services'}>
            <Btn />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PopularServices