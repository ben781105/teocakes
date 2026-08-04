import person from '../assets/testimonials/person.jpg'
import person1 from '../assets/testimonials/person1.jpg'
import person2 from '../assets/testimonials/person2.jpg'
import StarRating from './StarRating'
import Section from './layout/section'

function Testimonials() {

    const testimonials = [
        {
            id: 1,
            name: "James Carter",
            src: person,
            text: "I had a great experience with this bakery. The cakes were delicious and the staff was friendly. I highly recommend them!",
            rating: 5,
            status: "First-time customer",
        },
        { 
            id: 2,
            name: "Emily Smith",
            src: person1,
            text: "I had a great experience with this bakery. The cakes were delicious and the staff was friendly. I highly recommend them!",
            rating: 4,
            status:'Food Blogger'
        },
        {
            id: 3,
            name: "Daniel Kim",
            src: person2,
            text: "I had a great experience with this bakery. The cakes were delicious and the staff was friendly. I highly recommend them!",
            rating: 4.5,
            status:'Regular Customer'
        },
       
    ]

return(
    <Section id='testimonials'>
        <div className='flex flex-col gap-3 items-center'>
            <span>Word On The Street</span>
            <h1 className='text-center'>Our Customers Feedback</h1>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10'>
            {testimonials.map(({id,name,src,text,rating,status})=>
            <div key={id} className='border rounded-2xl p-6 flex flex-col h-full'>
                <StarRating rating={rating} />
                <p className='mt-3 text-sm text-gray-600'>"{text}"</p>

                <div className='flex items-center gap-3 mt-auto pt-6'>
                    <div>
                        <img src={src} alt={name} className='w-12 h-12 rounded-full object-cover'/>
                    </div>

                    <div className='flex flex-col'>
                        <span className='font-medium'>{name}</span>
                        <span className='text-sm text-gray-500'>{status}</span>
                    </div>
                </div>
            </div>
            )}
        </div>
    </Section>
)
}
export default Testimonials