export interface Movie {
  title: string;
  year: string;
  rating: string;
  plot: string;
  poster: string;
  cast: string[];
}

export type SentimentType = "Positive" | "Mixed" | "Negative";

export interface MovieApiResponse {
  movie: Movie;
  aiSummary: string;
  sentiment: SentimentType;
}
