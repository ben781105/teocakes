
import { Link } from 'react-router-dom'
import {useState,useEffect} from 'react'
import { getCakes } from '../services/productService'
import Section from './layout/section'
import menuImage from '../assets/stockcake.jpg'


function Menu() {
  const [cakes,setCakes] = useState([])

 const categories = ['All', ...new Set(cakes.map((cake) => cake.category_name))]
 const [selectedCategory, setSelectedCategory] = useState('All')

  

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const data = await getCakes()
        console.log("fetched cakes", data)
        setCakes(data)
      } catch (error) {
        console.error("error fetching cakes", error)
      }
    }
    fetchCakes()
  }, [])
 const filteredCakes =
    selectedCategory === 'All'
      ? cakes
      : cakes.filter((cake) => cake.category_name === selectedCategory)

  
  return (
    <Section id='menu'>
     <div className='flex flex-col gap-4 md:gap-6 h-fit'>
      <span className=" self-center">Make your Order</span>
      <h1 className='text-center'>Our Menu Card</h1>

      <div className='flex flex-col md:flex-row gap-4 md:gap-6'>
      <div className='flex flex-col  w-full md:w-[60%]'>
        
      {/* filter pills */}
            <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-xs px-3 py-1 rounded-full border transition
              ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* cake list */}
      <div className="flex flex-col gap-3">
        {filteredCakes.map(({ id, name, price, image}) => {
          

          return (
            <Link
              key={id} 
              className="flex items-center gap-4 border border-gray-200 rounded-xl"
            >
              <img
                src={image}
                alt={name}
                className="w-14 h-14 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{name}</p>
                <p className="text-xs text-gray-500">{price}</p>
              </div>
            </Link>
          )
        })}
      </div>
      </div>

      <div className='flex-1 flex-start'>
        <img src={menuImage} alt=""  className='object-cover w-full h-80 md:h-full rounded-2xl'/>
      </div>
     </div>
     </div>
    </Section>
  )
}

export default Menu