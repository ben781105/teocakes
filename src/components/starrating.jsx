

import { Star } from 'lucide-react'

function StarRating({ rating, max = 5 }) {

   
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => {
        const fillAmount = Math.min(Math.max(rating - i, 0), 1) * 100

        return (
          <div key={i} className="relative w-4 h-4">
            <Star className="absolute w-4 h-4 text-gray-200" fill="currentColor" />
            <div
              className="absolute overflow-hidden"
              style={{ width: `${fillAmount}%` }}
            >
              <Star className="w-4 h-4 text-orange-500" fill="currentColor" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StarRating