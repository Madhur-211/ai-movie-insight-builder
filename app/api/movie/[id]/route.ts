import { NextResponse } from "next/server";
import { fetchMovieDetails } from "@/lib/omdb";
import { fetchMovieReviews } from "@/lib/tmdb";
import { analyzeReviews } from "@/lib/ai";
import { imdbSchema } from "@/lib/validation";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    // Validate IMDb ID
    imdbSchema.parse(id);

    // Fetch movie details
    const movieData = await fetchMovieDetails(id);

    // Normalize OMDb response
    const movie = {
      title: movieData.Title,
      year: movieData.Year,
      rating: movieData.imdbRating,
      plot: movieData.Plot,
      poster: movieData.Poster,
      cast: movieData.Actors
        ? movieData.Actors.split(",").map((actor: string) => actor.trim())
        : [],
    };

    // Fetch reviews
    const reviews = await fetchMovieReviews(id);

    let aiSummary = "No reviews available.";
    let sentiment: "Positive" | "Mixed" | "Negative" = "Mixed";

    if (reviews.length > 0) {
      const aiResult = await analyzeReviews(reviews);

      if (aiResult) {
        aiSummary = aiResult.summary;
        sentiment = aiResult.sentiment;
      }
    }

    return NextResponse.json({
      movie,
      aiSummary,
      sentiment,
    });
  } catch (error: any) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 400 },
    );
  }
}
