import React, { useEffect, useState } from 'react'
import { FaTimes } from "react-icons/fa";
import { useSelector } from 'react-redux';
import CheckoutCard from './CheckoutCard';

export default function CheckOut({ setOpen }) {
    const orderItems = useSelector(state => state.orders.orders)
    const [totalCost, setTotalCost] = useState(0)

    const orders = orderItems.map((order, index) => (
        <CheckoutCard order={order} key={index} />
    ))

    useEffect(() => {
        setTotalCost(0)
        orderItems.forEach((order) => {
            let calculatedPrice = order.data.price;
            order.data.addOns.forEach((addon) => {
                calculatedPrice += addon.price;
            });
            setTotalCost(prev => prev + calculatedPrice)
        });
    }, [orderItems]);

    return (
        <div className={`w-full z-[9999]  ${orderItems.length > 1 ? 'h-fit' : 'h-[100dvh] overflow-hidden'}`} style={{ backgroundColor: "#F2E6D6" }}>
            <div className=' flex p-6' style={{ backgroundColor: "#F2E6D6" }} >
                <span onClick={() => setOpen(false)} className=' text-2xl mr-2 flex items-center justify-center'><FaTimes className=' font-bold text-2xl' /></span>
                <span className=' font-semibold text-xl'>Orders</span>
            </div>
            <hr className='bg-gray-600' />
            <div className='flex flex-wrap justify-center items-center pb-24 '>
                {totalCost > 0 ?
                    orders :
                    <div className="h-screen flex items-center justify-center">
                        <h1 className=' text-3xl'>no orders yet</h1>
                    </div>
                }
            </div>

            {totalCost > 0 ?
                <div className=' flex justify-center p-4 fixed bottom-0  left-0 right-0 pb-4 h-36' >
                    <div className=' flex shadow-2xl justify-between w-3/4 h-16 bg-orange-200 p-4 rounded-full'>
                        <span className=' text-lg'>Confirm Order</span>
                        <span className=' text-lg'>${totalCost.toFixed(2)}</span>
                    </div>
                </div>
                : ""

            }
        </div>
    )
}
