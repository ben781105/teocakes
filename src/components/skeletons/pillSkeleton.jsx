function PillSkeleton({ width = "w-20" }) {
  return (
    <div
      aria-hidden="true"
      className={`h-9 ${width} rounded-full bg-cream-dark animate-pulse`}
    />
  );
}

export default PillSkeleton;
