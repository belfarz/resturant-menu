import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToOrder } from '../features/cartSlice';

export default function PreviewContent({ food, setOpen }) {

  const [count, setCount] = useState(1)
  const dispatch = useDispatch()
  const [addons, setAddons] = useState([]);
  const [price, setPrice] = useState(food.price)

  const addToCart =()=>{

    const order = {
      id: food.id,
      name: food.name,
      description: food.description,
      type: food.type,
      price: food.price,
      image: food.image,
      addOns: addons
    }

    if (count > 1) {
      let i = 1;
      while (i < count) {
        dispatch(addToOrder(order));
        i++;
      }
     }

    dispatch(addToOrder(order));
    setOpen(false);
  }

  const increment =()=>{
    setCount(count + 1)
  }
  const decrement =()=>{
    setCount(count - 1)
  }

  const handleCheckBox = (e, addon) => {
    if (e.target.checked === true) {
      setAddons([...addons, addon]);
      setPrice(prev => prev + addon.price)
    } else {
      setAddons(addons.filter(i => i !== addon));
      setPrice(prev => prev - addon.price)
    }
  }

  const test = food.addOns.map((addons, index) => (
    <div key={index} className='m-4 flex justify-between items-center'>
      <div className=' flex flex-col'>{addons.name} <span className=' text-sm font-extralight'>${addons.price}</span></div>
      <input type="checkbox" onChange={(e) => handleCheckBox(e, addons)} />
    </div>
  ))

  return (
    <div className=' pb-12' style={{ backgroundColor: "#FFF7ED" }}>
      <div
        className="relative w-full h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${food.image})` }}
      ></div>

      <div className="mx-auto p-4 ">
        <h1 className=' text-xl'>{food.name}</h1>
        <p className=' mt-2'>{food.description}</p>
        <h3 className=' text-xl mt-6 '>$ {food.price}</h3>
      </div>

      <div className=' w-full p-4 bg-orange-200 text-xl'>
        <h1>Add ons</h1>
      </div>

      <div className='mb-20'>
        {test}
      </div>

      <div className='flex w-full justify-around p-4 fixed bottom-0 left-0 right-0 pb-4'  style={{ backgroundColor: "#F2E6D6" }}>
        <div className='border border-black mr-4 flex items-center w-2/3 justify-around rounded-xl'>
          <span className=' m-3' onClick={decrement}>-</span>
          <span className=' m-3'>{count}</span>
          <span className=' m-3' onClick={increment}>+</span>
        </div>
        <button className=' bg-orange-300 py-2 px-8 w-full rounded-xl' onClick={addToCart}>Add <span>${(price * count).toFixed(2)}</span></button>
      </div>

    </div>
  )
}
