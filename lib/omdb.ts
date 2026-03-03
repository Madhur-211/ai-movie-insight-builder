import axios from "axios";

export async function fetchMovieDetails(imdbId: string) {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      i: imdbId,
      apikey: process.env.OMDB_API_KEY,
    },
  });

  if (response.data.Response === "False") {
    throw new Error("Movie not found");
  }

  return response.data;
}
