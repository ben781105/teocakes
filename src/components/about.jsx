import aboutImage from '../assets/about.jpg';
import Section from './layout/section';

function About(){
    return(
        <Section id='about'>
            <div className='relative flex flex-col gap-20 md:flex-row '>

             
                <div className='w-full aspect-square'>
                    <img src={aboutImage} alt="" className='object-cover w-full h-full rounded-3xl' />
                </div>


                <div className='flex flex-col gap-3'>
                    <span>Welcome to TeoCakes</span>
                    <h1>We invite you to visit our Delicious cakes <span>Bakery</span></h1>
                    <p>At TeoCakes, we take pride in our passion for baking and our commitment to creating delectable cakes that bring joy to every occasion. Our bakery is a haven for cake enthusiasts, where we combine traditional recipes with innovative flavors to craft unique and unforgettable treats.</p>
                    <button className='w-[30%] md:[50%]  border'>Explore Our Menu</button>
                    
                </div>

            </div>
        </Section>
    )
}
export default About;