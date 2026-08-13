import { useState, useEffect } from 'react'
import { getFavourites } from '../services/favouriteService'
import Section from './layout/section.jsx'
import {Plus} from 'lucide-react' 
import CakeDetail from './cakedetail.jsx'
import { formatPrice } from '../data/numberFormatter.js'
function Favourites() {
  const [cakes, setCakes] = useState([])
  const [selectedCake, setSelectedCake] = useState(null)

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const data = await getFavourites()
        setCakes(data)
      } catch (error) {
        console.error("error fetching favourites", error)
      }
    }
    fetchFavourites()
  }, [])

  return (
    <Section id='favourites'>
      <div className='flex flex-col'>
        <span className='self-center'>Customer Favourites</span>
        <h1 className='text-center'>Our Delicious Cakes</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mt-8'>
          {cakes.map(({ id, image, name, price,description }) => (
            <div key={id} className='group flex flex-col overflow-hidden rounded-2xl border'>
              <div className=' relative   aspect-square sm:aspect-video md:aspect-square overflow-hidden'>
                <img src={image} alt={name} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
                <span
                onClick={() => setSelectedCake({ id, image, name, price,description })}
                 className='absolute bottom-3 cursor-pointer right-3 translate-y-1/2 z-10 transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:scale-110 bg-red-500 border-3 border-white rounded-full p-2 '>
                  <Plus className='w-6 h-6 text-white' />
                </span>
              </div>

              <div className='z-5 p-3 md:p-4 flex flex-1 flex-col justify-center'>
                <h3>{name}</h3>
                <span>Ugx&nbsp;{formatPrice(price)}</span>
              </div>

            
            </div>
          ))}
        </div>
      </div>

      {selectedCake && (
        <CakeDetail cake={selectedCake}  onClose={() => setSelectedCake(null)} />
      )}
    </Section>
  )
}

export default Favourites