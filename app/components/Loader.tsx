"use client";

export default function Loader() {
  return (
    <div className="mt-10 space-y-10 animate-fadeIn">
      {/* Title Skeleton */}
      <div className="h-10 w-1/2 rounded-lg shimmer" />

      {/* Movie Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster Skeleton */}
        <div className="w-full md:w-64 h-105 rounded-2xl shimmer" />

        {/* Content Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-6 w-3/4 rounded-lg shimmer" />
          <div className="h-4 w-full rounded shimmer" />
          <div className="h-4 w-5/6 rounded shimmer" />
          <div className="h-4 w-2/3 rounded shimmer" />

          {/* Cast Tags */}
          <div className="flex gap-3 mt-6">
            <div className="h-8 w-24 rounded-full shimmer" />
            <div className="h-8 w-28 rounded-full shimmer" />
            <div className="h-8 w-20 rounded-full shimmer" />
          </div>
        </div>
      </div>

      {/* Sentiment Section */}
      <div className="space-y-4">
        <div className="h-6 w-1/3 rounded shimmer" />
        <div className="h-4 w-full rounded shimmer" />
        <div className="h-4 w-5/6 rounded shimmer" />
        <div className="h-4 w-3/4 rounded shimmer" />
      </div>
    </div>
  );
}
