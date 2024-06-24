import React from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { removeFromOrder } from '../features/cartSlice';
import { useDispatch } from 'react-redux';

export default function CheckoutCard({ order }) {

    const dispatch = useDispatch();
    const addons = order.data?.addOns?.map((addon,index)=>(
        <li className=' list-none' key={index}>{addon.name}</li>
    ))
    return (
        <div className='food--card flex flex-col justify-center items-center w-full max-w-[600px] m-4'>
            <div
                className="relative w-full h-[20vh] bg-cover bg-center flex justify-end "
                style={{ backgroundImage: `url(${order.data.image})` }}
            >
            <span className=' p-2 bg-yellow-400 h-12 rounded-full'
                onClick={()=>dispatch(removeFromOrder(order.orderId))}
            ><MdOutlineDeleteOutline className=' text-4xl text-red-500' /></span>
            </div>
            <div className='flex flex-col justify-center items-start p-6 w-full'>
                <div className='flex justify-between w-full mb-2'>
                    <div className='flex flex-col'>
                    <span className=' text-xl font-normal'>{order.data.name}</span>
                    <span className=' font-thin'>${order.data.price}</span>
                    </div>
                    <div className='border border-black flex items-center justify-around rounded-xl mb-4'>
                        <span className=' mx-3 m-1' >-</span>
                        <span className=' mx-3 m-1'>1</span>
                        <span className=' mx-3 m-1' >+</span>
                    </div>
                </div>
            </div>
            
            <div className=' w-full p-4 bg-orange-200 '>
                    <span className=' text-xl'>Your addons</span>
                    {addons}

                </div>
        </div>
    )
}
