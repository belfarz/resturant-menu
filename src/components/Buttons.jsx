import React from 'react'
import Home from './Home'
import { NavLink, useLocation } from 'react-router-dom'


export default function Buttons() {
  const location = useLocation()
  const id = location.pathname
  return (
    <>
    <Home />
    <div className='flex items-center justify-center'>
      <NavLink
       className='btn mx-5 px-10'
       to={`${id}/menu`}
      >menu</NavLink>
      <NavLink className='btn mx-5 px-10'>waiter</NavLink>
    </div>
    </>
  )
}
