function CakeCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col overflow-hidden rounded-2xl border-cream bg-white shadow-md animate-pulse"
    >
      <div className="relative aspect-square sm:aspect-video md:aspect-square overflow-hidden bg-cream-dark">
        <div className="absolute bottom-3 right-3 translate-y-1/2 w-10 h-10 rounded-full bg-cream border-3 border-white" />
      </div>

      <div className="p-3 md:p-4 flex flex-1 flex-col justify-center gap-2">
        <div className="h-4 w-3/4 rounded bg-cream-dark" />
        <div className="h-4 w-1/2 rounded bg-cream-dark" />
      </div>
    </div>
  );
}

export default CakeCardSkeleton;
