import React from 'react'
import { useSearchParams } from 'react-router-dom'
import FoodCard from './FoodCard';
import Header from './Header';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const sampledata = [
    {
      id: "100",
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.",
      type: "pastries",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
      addOns: [
        { id: "1", name: "Grilled Chicken", price: 3.0 },
        { id: "2", name: "Bacon Bits", price: 1.5 },
        { id: "3", name: "Extra Parmesan", price: 1.0 }
      ]
    },
    {
      id: "101",
      name: "Spaghetti Carbonara",
      description: "Spaghetti with creamy carbonara sauce, pancetta, and Parmesan cheese.",
      type: "brunch",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
      addOns: [
        { id: "1", name: "Extra Pancetta", price: 2.0 },
        { id: "2", name: "Garlic Bread", price: 2.5 },
        { id: "3", name: "Parmesan Cheese", price: 1.0 }
      ]
    },
    {
      id: "102",
      name: "Tiramisu",
      description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
      type: "brunch",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
      addOns: [
        { id: "1", name: "Extra Mascarpone", price: 1.5 },
        { id: "2", name: "Chocolate Shavings", price: 1.0 },
        { id: "3", name: "Espresso Shot", price: 2.0 }
      ]
    },
    {
      id: "103",
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter and herbs.",
      type: "pastries",
      price: 4.99,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
      addOns: [
        { id: "1", name: "Cheese", price: 1.0 },
        { id: "2", name: "Marinara Sauce", price: 0.5 },
        { id: "3", name: "Herb Butter", price: 0.5 }
      ]
    },
    {
      id: "104",
      name: "Grilled Salmon",
      description: "Fresh salmon fillet grilled to perfection, served with lemon butter sauce.",
      type: "brunch",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
      addOns: [
        { id: "1", name: "Lemon Wedges", price: 0.5 },
        { id: "2", name: "Garlic Butter", price: 1.0 },
        { id: "3", name: "Grilled Vegetables", price: 2.5 }
      ]
    },
    {
      id: "105",
      name: "Mushroom Risotto",
      description: "Creamy risotto with mushrooms.",
      type: "brunch",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
      addOns: [
        { id: "1", name: "Truffle Oil", price: 3.0 },
        { id: "2", name: "Parmesan Cheese", price: 1.0 },
        { id: "3", name: "Grilled Chicken", price: 3.0 }
      ]
    },
    {
      id: "106",
      name: "Chicken Wings",
      description: "Crispy chicken wings tossed in a tangy buffalo sauce.",
      type: "brunch",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
      addOns: [
        { id: "1", name: "Ranch Dressing", price: 0.5 },
        { id: "2", name: "Extra Sauce", price: 1.0 },
        { id: "3", name: "Celery Sticks", price: 0.5 }
      ]
    },
    {
      id: "107",
      name: "Greek Salad",
      description: "Fresh salad with cucumbers, tomatoes, olives, feta cheese, and a Greek vinaigrette.",
      type: "brunch",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
      addOns: [
        { id: "1", name: "Grilled Chicken", price: 3.0 },
        { id: "2", name: "Pita Bread", price: 1.5 },
        { id: "3", name: "Extra Feta", price: 1.0 }
      ]
    },
    {
      id: "108",
      name: "Cheeseburger",
      description: "Juicy beef patty with melted cheese, lettuce, tomato, and pickles in a brioche bun.",
      type: "drinks",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      addOns: [
        { id: "1", name: "Bacon", price: 2.0 },
        { id: "2", name: "Extra Cheese", price: 1.0 },
        { id: "3", name: "Fried Egg", price: 1.5 }
      ]
    },
    {
      id: "109",
      name: "Chocolate Lava Cake",
      description: "Rich chocolate cake with a molten chocolate center, served with vanilla ice cream.",
      type: "Dessert",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      addOns: [
        { id: "1", name: "Extra Ice Cream", price: 2.0 },
        { id: "2", name: "Caramel Drizzle", price: 1.0 },
        { id: "3", name: "Whipped Cream", price: 0.5 }
      ]
    },
    {
      id: "110",
      name: "Mozzarella Sticks",
      description: "Breaded mozzarella sticks served with marinara sauce.",
      type: "brunch",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      addOns: [
        { id: "1", name: "Extra Marinara Sauce", price: 0.5 },
        { id: "2", name: "Ranch Dressing", price: 0.5 },
        { id: "3", name: "Hot Sauce", price: 0.5 }
      ]
    },
    {
      id: "111",
      name: "Shrimp Scampi",
      description: "Shrimp sautéed in garlic, lemon, and white wine sauce, served over linguine.",
      type: "drinks",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      addOns: [
        { id: "1", name: "Extra Shrimp", price: 5.0 },
        { id: "2", name: "Parmesan Cheese", price: 1.0 },
        { id: "3", name: "Garlic Bread", price: 2.5 }
      ]
    },
    {
      id: "112",
      name: "New York Cheesecake",
      description: "Classic New York style cheesecake with a graham cracker crust.",
      type: "Dessert",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      addOns: [
        { id: "1", name: "Strawberry Sauce", price: 1.0 },
        { id: "2", name: "Whipped Cream", price: 0.5 },
        { id: "3", name: "Fresh Berries", price: 2.0 }
      ]
    }
  ]
  


  const typeFilter = searchParams.get("type")
  const filteredData = typeFilter ?
    sampledata.filter(char => char.type.toLowerCase() === typeFilter) :
    sampledata

  function setTypeFilter(key, value) {
    setSearchParams(prevParams => {
      if (value === null) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, value)
      }
      return prevParams
    })
  }


  const fullMenu = filteredData.map((food, index) => (
    <FoodCard key={index} food={food} />
  ));


  return (
    <>
    <Header />
    <div className='mt-20'>
      <div className='flex overflow-x-hidden mt-3 px-2'>
        <button
          className='selection px-6 py-2'
          onClick={() => setTypeFilter("type", null)}
        >All</button>
        <button
          className='selection px-4 py-2'
          onClick={() => setTypeFilter("type", "drinks")}
        >Drinks</button>
        <button
          className='selection px-4 py-2'
          onClick={() => setTypeFilter("type", "brunch")}
        >Brunch</button>
        <button
          className='selection px-4 py-2'
          onClick={() => setTypeFilter("type", "pastries")}
        >Pastries</button>
      </div>

      <div className='flex flex-wrap justify-center items-center'>
        {fullMenu}
      </div>
    </div>
    </>
  )
}