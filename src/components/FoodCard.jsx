import React, { useState } from 'react'
import PreviewModal from './PreviewModal';
import PreviewContent from './PreviewContent';


export default function FoodCard({ food }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='food--card flex flex-col justify-center items-center sm:w-4/5 max-w-[400px]  m-4  '>
                {/* <img src={food.image} alt="" className=' ' /> */}
                <div
                    className="relative w-full h-[40vh] bg-cover bg-center"
                    style={{ backgroundImage: `url(${food.image})` }}
                ></div>
                <div className='flex flex-col justify-center items-start p-6 '>
                    <h1 className='text-2xl font-semibold mb-2' >{food.name}</h1>
                    <p className='font-light mb-6'>{food.description}</p>
                    <div className='flex justify-between w-full mb-6'>
                        <span className=' text-xl font-bold'>Price</span>
                        <span className=' text-xl'>${food.price}</span>
                    </div>
                    <span onClick={() => setOpen(true)} className=' bg-yellow-500 flex items-center justify-center w-full font-bold p-4'>Add to order</span>
                </div>
            </div>

            <PreviewModal open={open} setOpen={setOpen}>
                <PreviewContent food={food} setOpen={setOpen} />
            </PreviewModal>

        </>
    )
}
