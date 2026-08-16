function ServicesCardSkeleton() {
  return (
    <div className="w-72 bg-white shadow-md rounded-xl">
      {/* Image skeleton */}
      <div className="relative h-74 w-72 rounded-t-xl overflow-hidden bg-gray-200 animate-pulse">
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gray-300/60" />
        {/* Title lines over image */}
        <div className="absolute bottom-3 px-4 w-full space-y-1.5">
          <div className="h-3 bg-gray-400/50 rounded w-full" />
          <div className="h-3 bg-gray-400/50 rounded w-3/4" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="px-4 py-3 w-72">
        {/* Category */}
        <div className="h-2.5 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />

        <div className="flex items-center justify-between mt-3">
          {/* Button */}
          <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse" />
          {/* Bag icon */}
          <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default ServicesCardSkeleton