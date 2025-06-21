import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FoodCard from './FoodCard';
import Header from './Header';
import axios from 'axios';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sampleData, setSampleData] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:3122/api/menu").then((response)=>{
      setSampleData(response.data)
      console.log(response.data)
    }).catch((Error)=>{
      console.log(Error)
    })

  },[])
  
  const sampledata = [
    {
      id: "100",
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.",
      type: "pastries",
      price: 7.99,
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad.jpg",
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
      image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ6S89YAp-BhzBtuQ1TUAsXrrwcs2PH2oj-4AaNFt2y0WJYdihay94L_xFmdfIMb2ODg2fol1V0nu0x1Rrm0nS48QPNHGkq_pGnpscZRNw",
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
      image: "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2024/09/THUMB-VIDEO-2_rev1-56.jpeg",
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
      image: "https://www.ambitiouskitchen.com/wp-content/uploads/2023/02/Garlic-Bread-4.jpg",
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
      image: "https://www.dinneratthezoo.com/wp-content/uploads/2019/05/grilled-salmon-final-2-1024x1536.jpg",
      addOns: [
        { id: "1", name: "Lemon Wedges", price: 0.5 },
        { id: "2", name: "Garlic Butter", price: 1.0 },
        { id: "3", name: "Grilled Vegetables", price: 2.5 }
      ]
    },
    {
      id: "105",
      name: "Mushroom Risotto",
      description: "Creamy risotto with mushrooms with beans curry kidney beans and cheese.",
      type: "brunch",
      price: 15.99,
      image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/mushroom-risotto-recipe.jpg",
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
      image: "https://www.recipetineats.com/tachyon/2024/11/New-Oreleans-chicken-wings_1.jpg?resize=500%2C500",
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
      image: "https://www.onceuponachef.com/images/2023/06/greek-salad-1-1200x1477.jpg",
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
      image: "https://www.sargento.com/assets/Uploads/Recipe/Image/GreatAmericanBurger__FillWzgwMCw4MDBd.jpg",
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
      image: "https://www.foodnetwork.com/content/dam/images/food/fullset/2014/2/19/1/WU0701H_Molten-Chocolate-Cakes_s4x3.jpg",
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
      image: "https://sugarspunrun.com/wp-content/uploads/2021/07/Homemade-Mozzarella-Sticks-Recipe-1-of-1.jpg",
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
      image: "https://cdn11.bigcommerce.com/s-5ljyj9oebs/images/stencil/600x600/products/3118/36969/P091722222900_1__10330.1727120426.jpg?c=2",
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
      image: "https://www.browneyedbaker.com/wp-content/uploads/2024/04/new-york-cheesecake-21-1200A.jpg",
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
      <div className='flex overflow-x-hidden mt-3 px-2 lg:px-[10%]'>
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

      <div className='flex flex-wrap justify-center gap-10 items-center'>
        {fullMenu}
      </div>
    </div>
    </>
  )
}
