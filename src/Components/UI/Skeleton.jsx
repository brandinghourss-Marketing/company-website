const Skeleton = ({ className = "", width = "100%", height = "20px" }) => (
  <div 
    className={`bg-gray-200 animate-pulse rounded ${className}`}
    style={{ width, height }}
  />
);

export const SkeletonText = ({ lines = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton 
        key={i} 
        height="16px" 
        width={i === lines - 1 ? "75%" : "100%"} 
      />
    ))}
  </div>
);

export const SkeletonTitle = () => (
  <Skeleton height="48px" className="mb-4" />
);

export const LandingSkeleton = () => (
  <section className="mt-20 flex flex-col gap-10 peaceful-gradient rounded-xl p-10">
    <SkeletonTitle />
    <Skeleton height="36px" width="60%" />
    <SkeletonText lines={2} />
  </section>
);

export default Skeleton;