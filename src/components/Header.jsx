import React, { useState } from 'react'
import logo from "../images/coffee.png"
import cartLogo from "../images/cart.png"
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import CheckoutModal from './CheckoutModal'
import CheckOut from './CheckOut'

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation()
  const id = location.pathname

  const orderItems = useSelector(state => state.orders.orders)
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 flex justify-between p-4 lg:px-40 font-medium text-xl bg-white z-[1]"  >
        <img src={logo} alt="" onClick={() => console.log(id)} className='nav--logo' />
        <div onClick={() => setOpen(true)} className="nav flex">
          <img src={cartLogo} alt="" width={40} />
          <h2 className=' bg-yellow-500 text-white rounded-full flex justify-center items-center text-sm h-6 w-6 text-center' >{orderItems.length}</h2>
        </div>

      </nav>
      <CheckoutModal open={open} setOpen={setOpen}>
          <CheckOut setOpen={setOpen} />
      </CheckoutModal>
    </>
  )
}
