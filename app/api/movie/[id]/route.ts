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

    imdbSchema.parse(id);

    // Fetch movie
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

    if (reviews.length > 0) {
      const aiResult = await analyzeReviews(reviews);
      aiSummary = aiResult ?? "Unable to analyze sentiment.";
    }

    return NextResponse.json({
      movie,
      aiSummary,
    });
  } catch (error: any) {
    console.error("API ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
