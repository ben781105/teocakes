function CakeCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-4 bg-white rounded-xl px-3 py-3 animate-pulse"
    >
      <div className="w-16 h-16 rounded-full bg-cream-dark shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 w-2/3 rounded bg-cream-dark" />
        <div className="h-4 w-1/3 rounded bg-cream-dark" />
      </div>
    </div>
  );
}

export default CakeCardSkeleton;
