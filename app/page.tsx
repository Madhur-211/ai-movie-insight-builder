"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";
import SentimentBox from "./components/SentimentBox";
import Loader from "./components/Loader";
import { MovieApiResponse } from "@/types/movie";

export default function Home() {
  const [data, setData] = useState<MovieApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(id: string) {
    if (!id || loading) return;

    try {
      setLoading(true);
      setError(null);
      setData(null);

      const res = await fetch(`/api/movie/${id}`);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to fetch movie data.");
      }

      const result: MovieApiResponse = await res.json();
      setData(result);
    } catch (err: any) {
      setError(err.message || "Unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-950 dark:to-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            AI Movie Insight Builder
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Enter an IMDb ID (e.g., tt0133093) to generate AI-powered audience
            insights.
          </p>
        </header>

        {/* Search */}
        <SearchBar onSearch={handleSearch} disabled={loading} />

        {/* Loading */}
        {loading && (
          <div className="mt-10 flex justify-center animate-pulse">
            <Loader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-8 p-4 border border-red-300 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg shadow-sm transition-all duration-300">
            <p className="font-medium">Something went wrong</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Results */}
        {data && (
          <section className="mt-10 space-y-8 animate-fadeIn">
            <MovieCard movie={data.movie} />
            <SentimentBox summary={data.aiSummary} sentiment={data.sentiment} />
          </section>
        )}

        {/* Empty State */}
        {!loading && !data && !error && (
          <div className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
            Start by searching for a movie to see AI-generated insights.
          </div>
        )}
      </div>
    </main>
  );
}
