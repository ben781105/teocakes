import {Minus,Plus} from 'lucide-react'
import {useEffect, useState} from 'react'
import {addToCart} from '../services/cartService'
function CakeDetail({ cake, onClose }) {
    const [quantity, setQuantity] = useState(1)
    const [adding, setAdding] = useState(false)
    const [added, setAdded] = useState(false)
     useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!cake) return null

   const { id, name, price, image, description } = cake 

   const handleAddToCart = async () => {
    setAdding(true)
    try {
      await addToCart(id, quantity)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      console.error("error adding to cart", error)
    } finally {
      setAdding(false)
    }
  }
  

   
    return(

        <div
        onClick={onClose}
         className='fixed w-full  inset-0 z-50 flex items-center justify-center  py-6 px-6 md:px-8  bg-black/50'
        >
           <div
           onClick={(e) => e.stopPropagation()}
           className='relative bg-white rounded-2xl max-w-3xl w-full h-[90vh] md:h-100 flex flex-col md:flex-row overflow-hidden'
           >
              <div className= 'w-full md:w-1/2 h-1/2 md:h-full shrink-0 overflow-hidden'>
                <img src={image} alt={name} className='w-full h-full object-cover rounded-2xl' />
              </div>

              <div className='w-full md:w-1/2 h-1/2 md:h-full p-5 md:p-6 flex flex-col md:justify-center md:items-center  overflow-y-auto'>
                <div className='flex flex-col gap-3'>
                    <h1>{name}</h1>
                    <p>{description}</p>
                    <span>{price}</span>

                    <div className='flex items-center gap-4 mt-4 '>
                        <div className='flex items-center gap-3 border rounded-full w-fit px-3 py-1'>
                           <button className=' flex items-center justify-center w-8 h-8 rounded-full ' onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label='Decrease quantity'><Minus /></button>
                           <span>{quantity}</span>
                           <button className='flex items-center justify-center w-8 h-8 rounded-full' onClick={() => setQuantity((q) => q + 1)} aria-label='Increase quantity'><Plus /></button>
                        </div>

                        <button className='border px-3 rounded-3xl w-1/2 h-12 flex items-center justify-center'  onClick={handleAddToCart}> {adding ? "Adding..." : added ? "Added ✓" : "Add to Cart"}</button>
                    </div>
                </div>
              </div>
           </div>
        </div>
    )
}
export default CakeDetail