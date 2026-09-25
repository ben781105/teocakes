import cakeImage from "../assets/stockcake.jpg";
import Section from "./layout/section";
import { BadgeCheck } from "lucide-react";
function Hero() {
  return (
    <Section id="hero" className="bg-cream">
      <div className="grid md:grid-cols-2 gap-10 md:gap-25 ">
        <div className="flex flex-col gap-5">
          <p className="font-script text-brick text-2xl  lg:text-3xl font-medium  tracking-wide">
            Baked fresh, just for you
          </p>

          <h1 className=" font-semibold text-gray-900 leading-tight">
            Fresh, handmade cakes for every celebration
          </h1>

          <p className="text-gray-600 max-w-md">
            Handmade birthday, wedding, and custom cakes baked fresh in Entebbe.
            Browse our menu or message us on WhatsApp to order in minutes.
          </p>

          <div className="flex gap-3 mt-2">
            <a
              href="/custom-order"
              className=" text-base px-6 py-3 rounded-lg font-medium bg-brick text-cream  hover:shadow-xl hover:bg-brick-hover hover:-translate-y-0.5 transition-all duration-300 shadow-md"
            >
              Order Your Bake
            </a>

            <a
              href="/menu"
              className=" text-base border font-medium shadow-md  border-espresso text-espresso px-6 py-3 rounded-lg  hover:bg-espresso hover:text-cream hover:-translate-y-0.5 transition-all duration-300"
            >
              View Menu
            </a>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative w-full max-w-lg mx-auto animate-float">
          {/* Outer thick ring */}
          <div
            className="relative aspect-square bg-orange-400 p-6 animate-wriggle-outer"
            style={{ borderRadius: "40% 55% 26% 59% / 57% 41% 53% 38%" }}
          >
            {/* White gap ring */}
            <div className="w-full h-full rounded-full bg-white p-2">
              {/* The actual photo, clipped to a circle */}
              <img
                src={cakeImage}
                fetchPriority="high"
                alt="Chocolate layer cake"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Bottom-right badge */}
          <div className="  absolute bottom-0 -right-4 bg-white rounded-2xl shadow-lg pl-2 pr-7  py-3 flex items-center gap-3">
            <div className="bg-red-600 flex items-center justify-center rounded-full p-2 text-white">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">100% Fresh</p>
              <p className="text-xs text-gray-500">Best Quality</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Hero;
