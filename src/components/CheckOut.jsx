import React from 'react'
import { FaTimes } from "react-icons/fa";
import { useSelector } from 'react-redux';
import CheckoutCard from './CheckoutCard';

export default function CheckOut({ setOpen }) {
    const orderItems = useSelector(state => state.orders.orders)

    const orders = orderItems.map((order, index) => (
        <CheckoutCard order={order} key={index} />
    ))
    return (
        <div className=' w-full z-[9999] h-fit ' style={{ backgroundColor: "#F2E6D6" }}>
            <div className=' flex p-6' style={{ backgroundColor: "#F2E6D6" }} >
                <span onClick={() => setOpen(false)} className=' text-2xl mr-2 flex items-center justify-center'><FaTimes className=' font-bold text-2xl' /></span>
                <span className=' font-semibold text-xl'>Orders</span>
            </div>
            <hr className='bg-gray-600' />
            <div className='flex flex-wrap justify-center items-center'>
                {orders}
            </div>
        </div>
    )
}
