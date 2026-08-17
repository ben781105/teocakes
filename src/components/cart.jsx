import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ShoppingCart, Minus, Plus } from 'lucide-react'
import { useCart } from '../context/useCart'
import { formatPrice, buildOrderMessage } from '../data/numberFormatter'

function Cart({ isOpen, onClose }) {
  const { cart, loading, removeItem, updateItem, confirmPhone, recoverCart } = useCart()

  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const [recoverOpen, setRecoverOpen] = useState(false)
  const [recoverPhone, setRecoverPhone] = useState('')
  const [recovering, setRecovering] = useState(false)
  const [recoverError, setRecoverError] = useState(null)

  const handleConfirmOrder = async () => {
    if (!phone) {
      setError('Please enter your WhatsApp number')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const updatedCart = await confirmPhone(phone)

      const message = buildOrderMessage(updatedCart)
      const whatsappUrl = `https://wa.me/256746326666?text=${message}`

      window.open(whatsappUrl, '_blank')
      setCheckoutOpen(false)
    } catch (err) {
        console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRecover = async () => {
    if (!recoverPhone) return
    setRecovering(true)
    setRecoverError(null)
    try {
      await recoverCart(recoverPhone)
      setRecoverOpen(false)
    } catch (err) {
        console.error(err)
      setRecoverError('No cart found for that number.')
    } finally {
      setRecovering(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-white"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="h-full flex flex-col pb-4">
              <div className='px-4 py-3 flex justify-between items-center'>
                <span className="flex items-center gap-2">
                  <ShoppingCart className='w-6 h-6' />
                  <h2 className='text-lg font-semibold'>Your Order</h2>
                </span>
                <button onClick={onClose}><X /></button>
              </div>
              <hr className="border-gray-300 m-0" />

              {loading ? (
                <div className='h-full flex items-center justify-center'>
                  <p className='text-sm text-gray-500'>Loading your cart...</p>
                </div>
              ) : !cart || cart.items.length === 0 ? (
                <div className='h-full flex flex-col gap-3 items-center justify-center px-4'>
                  <h3>Your cart is empty</h3>
                  <p className='text-sm text-gray-500'>Add something delicious!</p>

                  {!recoverOpen ? (
                    <button
                      onClick={() => setRecoverOpen(true)}
                      className='text-xs text-gray-500 underline'
                    >
                      Used our site on another device? Recover your cart
                    </button>
                  ) : (
                    <div className='flex flex-col gap-2 w-full'>
                      <input
                        type='tel'
                        value={recoverPhone}
                        onChange={(e) => setRecoverPhone(e.target.value)}
                        placeholder='Your WhatsApp number'
                        className='border rounded-full px-4 py-2 text-sm'
                      />
                      <button
                        onClick={handleRecover}
                        disabled={recovering}
                        className='bg-gray-900 text-white text-sm py-2 rounded-full disabled:opacity-60'
                      >
                        {recovering ? '...' : 'Recover cart'}
                      </button>
                      {recoverError && <p className='text-xs text-red-500'>{recoverError}</p>}
                    </div>
                  )}
                </div>
              ) : (
                <div className='flex flex-col px-4 overflow-y-auto'>
                  {cart.items.map((item) => (
                    <div key={item.id} className='py-4 flex justify-between items-center gap-3 border-b border-gray-200 last:border-b-0'>
                      <div className='flex items-center gap-4'>
                        <span className='w-14 h-14 shrink-0'>
                          <img
                            className='w-full h-full object-cover rounded-lg'
                            src={item.product.image}
                            alt={item.product.name}
                          />
                        </span>
                        <div className='flex flex-col gap-1'>
                          <span>{item.product.name}</span>
                          <span className='text-xs text-gray-500'>{formatPrice(item.product.price)} each</span>
                        </div>
                      </div>

                      <div className='flex items-center gap-2 shrink-0'>
                        <div className='flex items-center border rounded-full'>
                          <button
                            className='flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-100'
                            onClick={() => {
                              if (item.quantity <= 1) return
                              updateItem(item.id, item.quantity - 1)
                            }}
                            aria-label='Decrease quantity'
                          >
                            <Minus className='w-3 h-3' />
                          </button>
                          <span className='w-6 text-center text-sm'>{item.quantity}</span>
                          <button
                            className='flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-100'
                            onClick={() => updateItem(item.id, item.quantity + 1)}
                            aria-label='Increase quantity'
                          >
                            <Plus className='w-3 h-3' />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} aria-label='Remove item'>
                          <X className='w-5 h-5' />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className='flex flex-col px-4 gap-3 mt-auto pt-4'>
                <hr className='border-gray-300' />
                <div className='flex items-center justify-between'>
                  <span>Total</span>
                  <span>Ugx&nbsp;{formatPrice(cart?.total ?? 0)}</span>
                </div>

                {!checkoutOpen ? (
                  <button
                    onClick={() => setCheckoutOpen(true)}
                    disabled={!cart || cart.items.length === 0}
                    className='bg-red-500 text-white py-2 rounded-3xl disabled:opacity-50'
                  >
                    Checkout
                  </button>
                ) : (
                  <div className='flex flex-col gap-2'>
                    <input
                      type='tel'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder='Your WhatsApp number, e.g. +2567xxxxxxx'
                      className='border rounded-full px-4 py-2 text-sm'
                    />
                    {error && <p className='text-xs text-red-500'>{error}</p>}
                    <button
                      onClick={handleConfirmOrder}
                      disabled={submitting}
                      className='bg-red-500 text-white py-2 rounded-3xl disabled:opacity-50'
                    >
                      {submitting ? 'Sending...' : 'Send Order via WhatsApp'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Cart