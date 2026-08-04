import cakeImage from '../assets/stockcake.jpg';
import Section from './layout/section';
function Hero() {
  return (
    <Section id="hero">
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* Left: text content */}
        <div className="flex flex-col gap-5">
          <span className="text-sm font-medium text-orange-600 uppercase tracking-wide">
            Handmade, made to orders
          </span>

          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight">
            Cakes baked with care, made just for you
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-md">
            Every cake is prepared fresh from scratch — no shortcuts, just
            good ingredients and a lot of patience.
          </p>

          <div className="flex gap-3 mt-2">
            
              <a href="/menu"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition"
            >
              See the menu
            </a>
            
              <a href="/custom-order"
              className="border border-gray-300 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Request a custom cake
            </a>
          </div>
        </div>

        {/* Right: image */}
       <div className="relative w-full max-w-md mx-auto animate-float">
       
             {/* Outer thick ring */}
             <div className="relative aspect-square bg-orange-400 p-6 animate-wriggle-outer"
         style={{ borderRadius: '40% 55% 26% 59% / 57% 41% 53% 38%' }}>
       
               {/* White gap ring */}
               <div className="w-full h-full rounded-full bg-white p-2">
       
                 {/* The actual photo, clipped to a circle */}
                 <img
                   src={cakeImage}
                   alt="Chocolate layer cake"
                   className="w-full h-full object-cover rounded-full"
                 />
               </div>
             </div>
       
             {/* Top-left badge */}
             <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] font-medium text-center leading-tight p-2 rotate-[-8deg]">
               Fresh &amp; Homemade
             </div>
       
             {/* Bottom-right badge */}
             <div className="absolute bottom-6 -right-6 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
               <div className="bg-red-600 rounded-full p-2 text-white">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <div>
                 <p className="text-sm font-semibold text-gray-900">Same Day</p>
                 <p className="text-xs text-gray-500">Pickup Available</p>
               </div>
             </div>
       
           </div>

      </div>
    </Section>
  )
}

export default Hero