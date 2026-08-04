import aboutImage from '../assets/about.jpg';
import aboutImage1 from '../assets/aboutImage.jpg';
import Section from './layout/section';

function About(){
    return(
        <Section id='about'>
            <div className='relative border  flex flex-col gap-35 md:gap-40 md:flex-row '>

              <div className='relative border flex flex-col w-full h-fit '>
    <div className='w-[77%] md:w-full h-[55%] md:h-90'>
        <img src={aboutImage} alt="" className='object-cover w-full h-full rounded-3xl' />
    </div>

    <div className='absolute top-[68%] md:top-[70%] right-0 md:left-[67%] w-[48%]  md:w-[70%] md:h-50 z-10'>
        <img src={aboutImage1} alt="" className='border-5 object-cover border-amber-400 rounded-2xl w-full h-full' />
    </div>
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