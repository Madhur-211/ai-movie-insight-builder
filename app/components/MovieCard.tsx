"use client";

import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const displayedCast = movie.cast.slice(0, 6);

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 md:p-8 
                    flex flex-col md:flex-row gap-8 
                    transition-all duration-300 hover:shadow-2xl animate-fadeIn"
    >
      {/* Poster */}
      <div className="relative w-full md:w-64 shrink-0 group">
        <div className="overflow-hidden rounded-2xl shadow-md">
          <img
            src={movie.poster !== "N/A" ? movie.poster : "/no-image.png"}
            alt={`${movie.title} poster`}
            className="w-full h-105 object-cover 
                       transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col">
        <div>
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            {movie.title}
          </h2>

          {/* Metadata Badges */}
          <div className="flex flex-wrap gap-3 mb-5 text-sm">
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
              📅 {movie.year}
            </span>

            <span
              className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 
                             dark:bg-yellow-900/30 dark:text-yellow-400 font-medium"
            >
              ⭐ {movie.rating}
            </span>
          </div>

          {/* Plot */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {movie.plot}
          </p>
        </div>

        {/* Cast */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-3">
            Cast
          </h3>

          <div className="flex flex-wrap gap-2">
            {displayedCast.map((actor, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-sm 
                           bg-gray-200 dark:bg-gray-700 
                           hover:bg-gray-300 dark:hover:bg-gray-600
                           transition-colors duration-200"
              >
                {actor}
              </span>
            ))}

            {movie.cast.length > 6 && (
              <span className="px-3 py-1 rounded-full text-sm bg-gray-300 dark:bg-gray-600">
                +{movie.cast.length - 6} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
