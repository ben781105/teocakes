 import {cakes} from '../data/cakes.js'
 import Section from './layout/section.jsx';
function Favourites() {

  return (
    <Section id='favourites'>
      <div className='flex flex-col'>
        <span className='self-center'>Customer Favourites</span>
      <h1 className='text-center' >Our Delicious Cakes</h1>

       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mt-8'>
         {cakes.filter((cake)=> cake.isFavourite).map(({id,src,name,price})=> (
            <div key={id} className='group flex flex-col overflow-hidden rounded-2xl border '>
                <div className='aspect-square sm:aspect-video md:aspect-square overflow-hidden'>
                  <img src={src} alt={name} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' />
                </div>
                
                <div className='p-3 md:p-4 flex flex-1 flex-col justify-center '>
                  <h3>{name}</h3>
                  <p>{price}</p>
                </div>
            </div>
         ))}
       </div>
      </div>
    </Section>

  );
}
export default Favourites;