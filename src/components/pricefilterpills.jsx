import { SlidersHorizontal } from "lucide-react";

const priceBuckets = [
  { label: "All", min: "", max: "" },
  { label: "50k", min: "", max: 50000 },
  { label: "60k", min: "", max: 60000 },
  { label: "70k", min: "", max: 70000 },
  { label: "80k", min: "", max: 80000 },
  { label: "90k", min: "", max: 90000 },
  { label: "100k", min: "", max: 100000 },
  { label: "110k", min: "", max: 110000 },
  { label: "120k", min: "", max: 120000 },
  { label: "130k", min: "", max: 130000 },
  { label: "140k", min: "", max: 140000 },
  { label: "150k", min: "", max: 150000 },
  { label: "200k - 500k", min: 200000, max: 500000 },
  { label: "500k - 1m", min: 500000, max: 1000000 },
  { label: "Above 1m", min: 1000000, max: "" },
];

function PriceFilterPills({ priceRange, onSelect }) {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex items-center gap-2 text-espresso font-medium">
        <SlidersHorizontal className="w-4 h-4 text-brick" aria-hidden="true" />
        <span className="font-heading">Filter by price</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {priceBuckets.map((bucket) => {
          const isActive =
            priceRange.min === bucket.min && priceRange.max === bucket.max;
          return (
            <button
              key={bucket.label}
              onClick={() => onSelect({ min: bucket.min, max: bucket.max })}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition
                ${
                  isActive
                    ? "bg-brick border-brick text-white"
                    : "bg-white border-cream-dark text-espresso hover:border-brick hover:bg-brick hover:text-white"
                }`}
            >
              {bucket.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PriceFilterPills;
