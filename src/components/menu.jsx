// src/pages/Menu.jsx
import { Link } from 'react-router-dom'
import { cakes } from '../data/cakes'
import {useState} from 'react'
import Section from './layout/section'
import menuImage from '../assets/stockcake.jpg'
const statusStyles = {
  available: { label: 'Available', className: 'bg-green-50 text-green-700' },
  'sold-out': { label: 'Sold out', className: 'bg-gray-100 text-gray-400' },
  'made-to-order': { label: 'Made to order', className: 'bg-yellow-50 text-yellow-700' },
}

function Menu() {
  const categories = ['All', ...new Set(cakes.map((cake) => cake.category))]
  const [selectedCategory, setSelectedCategory] = useState('All')


   const filteredCakes =
    selectedCategory === 'All'
      ? cakes
      : cakes.filter((cake) => cake.category === selectedCategory)


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
        {filteredCakes.map(({ id, name, price, src, status }) => {
          const isSoldOut = status === 'sold-out'
          const badge = statusStyles[status]

          return (
            <Link
              key={id}
              to={isSoldOut ? '#' : `/menu/${id}`}
              onClick={(e) => isSoldOut && e.preventDefault()}
              className={`flex items-center gap-4 border border-gray-200 rounded-xl p-3 transition
                ${isSoldOut ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}`}
            >
              <img
                src={src}
                alt={name}
                className="w-14 h-14 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{name}</p>
                <p className="text-xs text-gray-500">{price}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-md ${badge.className}`}>
                {badge.label}
              </span>
            </Link>
          )
        })}
      </div>
      </div>

      <div className='flex-1'>
        <img src={menuImage} alt=""  className='object-cover w-full h-full rounded-2xl'/>
      </div>
     </div>
     </div>
    </Section>
  )
}

export default Menu