import { useState } from 'react'
import { submitCustomRequest } from '../services/customCakeService'

function CustomCakeForm() {
  const [form, setForm] = useState({
    name: '',
    phone_number: '',
    description: '',
    size: '',
    flavor: '',
    occasion: '',
    date_needed: '',
    budget: '',
    additional_message: '',
  })
  const [image, setImage] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const buildWhatsappMessage = (data) => {
    const lines = [`🎂 *Custom Cake Request*`, ``, `Name: ${data.name}`, `Description: ${data.description}`]
    if (data.size) lines.push(`Size: ${data.size}`)
    if (data.flavor) lines.push(`Flavor: ${data.flavor}`)
    if (data.occasion) lines.push(`Occasion: ${data.occasion}`)
    if (data.date_needed) lines.push(`Date needed: ${data.date_needed}`)
    if (data.budget) lines.push(`Budget: Ugx ${data.budget}`)
    if (data.additional_message) lines.push(``, `Note: ${data.additional_message}`)
    return lines.join('\n')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone_number || !form.description) {
      setError('Please fill in your name, phone number, and description.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const data = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (value) data.append(key, value)
      })
      if (image) data.append('reference_image', image)

      const saved = await submitCustomRequest(data)

      const message = buildWhatsappMessage(saved)
      const whatsappUrl = `https://wa.me/256701234567?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')

      setSubmitted(true)
    } catch (err) {
      console.error('Error submitting custom request:', err)
      setError('Something went wrong submitting your request. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className='text-center py-10'>
        <h3 className='text-lg font-semibold'>Request sent!</h3>
        <p className='text-sm text-gray-600 mt-2'>We'll get back to you on WhatsApp shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-lg mx-auto py-4'>
      <h2 className='text-xl font-semibold text-center'>Request a Custom Cake</h2>
      <p className='text-sm text-gray-600 text-center'>
       Got a cake idea that's not on our menu? Describe it below and we'll get back
       to you on WhatsApp with pricing and details.
     </p>

      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium'>Your Name *</label>
        <input name='name' value={form.name} onChange={handleChange} className='border rounded-lg px-3 py-2 text-sm' />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium'>WhatsApp Number *</label>
        <input name='phone_number' value={form.phone_number} onChange={handleChange} className='border rounded-lg px-3 py-2 text-sm' placeholder='+2567xxxxxxx' />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium'>Describe what you want *</label>
        <textarea name='description' value={form.description} onChange={handleChange} rows={4} className='border rounded-lg px-3 py-2 text-sm' />
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>Size / Servings</label>
          <input name='size' value={form.size} onChange={handleChange} className='border rounded-lg px-3 py-2 text-sm' placeholder='e.g. serves 20' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>Flavor</label>
          <input name='flavor' value={form.flavor} onChange={handleChange} className='border rounded-lg px-3 py-2 text-sm' />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>Occasion</label>
          <input name='occasion' value={form.occasion} onChange={handleChange} className='border rounded-lg px-3 py-2 text-sm' placeholder='Birthday, Wedding...' />
        </div>
        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>Date Needed</label>
          <input type='date' name='date_needed' value={form.date_needed} onChange={handleChange} className='border rounded-lg px-3 py-2 text-sm' />
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium'>Budget (Ugx)</label>
        <input type='number' name='budget' value={form.budget} onChange={handleChange} className='border rounded-lg px-3 py-2 text-sm' />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium'>Reference Image</label>
        <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])} className='text-sm' />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-sm font-medium'>Additional Notes</label>
        <textarea name='additional_message' value={form.additional_message} onChange={handleChange} rows={2} className='border rounded-lg px-3 py-2 text-sm' />
      </div>

      {error && <p className='text-xs text-red-500'>{error}</p>}

      <button type='submit' disabled={submitting} className='bg-red-500 text-white py-2 rounded-3xl disabled:opacity-50 w-[60%] self-center'>
        {submitting ? 'Sending...' : 'Send Request via WhatsApp'}
      </button>
    </form>
  )
}

export default CustomCakeForm