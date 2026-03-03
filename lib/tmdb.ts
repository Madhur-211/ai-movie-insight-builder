import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Simple in-memory cache
const reviewCache = new Map<string, any[]>();

export async function fetchMovieReviews(imdbId: string) {
  try {
    // ✅ Return from cache if exists
    if (reviewCache.has(imdbId)) {
      console.log("Using cached reviews");
      return reviewCache.get(imdbId);
    }

    // 1️⃣ Convert IMDb → TMDB ID
    const findRes = await axios.get(`${TMDB_BASE_URL}/find/${imdbId}`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        external_source: "imdb_id",
      },
      timeout: 8000,
    });

    const movie = findRes.data.movie_results?.[0];
    if (!movie) return [];

    // 2️⃣ Fetch Reviews
    const reviewRes = await axios.get(
      `${TMDB_BASE_URL}/movie/${movie.id}/reviews`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
        timeout: 8000,
      },
    );

    const normalizedReviews = reviewRes.data.results
      ?.slice(0, 5)
      .map((review: any) => ({
        author: review.author,
        content: review.content,
        rating: review.author_details?.rating ?? null,
        createdAt: review.created_at,
      }));

    console.log("Normalized Reviews Count:", normalizedReviews?.length);

    // ✅ Store in cache
    reviewCache.set(imdbId, normalizedReviews);

    return normalizedReviews || [];
  } catch (error) {
    console.error("TMDB Error:", error);

    // If network fails but cache exists, use cache
    if (reviewCache.has(imdbId)) {
      console.log("Using cached reviews after error");
      return reviewCache.get(imdbId);
    }

    return [];
  }
}
