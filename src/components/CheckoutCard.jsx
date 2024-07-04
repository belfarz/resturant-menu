import React from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { removeFromOrder } from '../features/cartSlice';
import { useDispatch } from 'react-redux';

export default function CheckoutCard({ order }) {

    const dispatch = useDispatch();
    const addons = order.data?.addOns?.map((addon, index) => (
        <div className=' text-sm flex justify-between items-center my-1'>
            <span className=' list-none' key={index}>{addon.name}</span>
            <span>${addon.price}</span>
        </div>

    ))

    let addonsTotal = 0;
    // Inside your component function or useEffect
    order.data.addOns.forEach((addon) => {
        addonsTotal += addon.price;
    });

    return (
        <div className='food--card flex flex-col justify-center items-center w-full max-w-[600px] m-4'>
            <div
                className="relative w-full h-[20vh] bg-cover bg-center flex justify-end "
                style={{ backgroundImage: `url(${order.data.image})` }}
            >
                <span className=' p-2 bg-yellow-400 h-12 rounded-full'
                    onClick={() => dispatch(removeFromOrder(order.orderId))}
                ><MdOutlineDeleteOutline className=' text-4xl text-red-500' /></span>
            </div>
            <div className='flex flex-col justify-center items-start p-6 w-full'>
            
                <div className='flex justify-between items-center w-full mb-2'>
                <span className=' text-xl font-normal  '>{order.data.name}</span>
                    <span className=' font-thin'>${order.data.price}</span>
                   
                </div>
            </div>

            {addonsTotal > 0 ?
                <div className=' w-full p-6 bg-orange-200 '>
                    <span className=' text-xl mb-2 block'>Your addons</span>
                    <hr />
                    {addons}
                    <hr />
                    <div className=' text-sm flex justify-between items-center my-1'>
                        <span className=' text-xl' >Total</span>
                        <span className=' text-lg'>${addonsTotal.toFixed(2)}</span>
                    </div>

                </div> : ""
            }
        </div>
    )
}
