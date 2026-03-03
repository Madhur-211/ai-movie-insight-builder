/**
 * @jest-environment node
 */
import { GET } from "@/app/api/movie/[id]/route";

jest.mock("@/lib/omdb", () => ({
  fetchMovieDetails: jest.fn().mockResolvedValue({
    title: "Mock Movie",
    rating: "8.5",
  }),
}));

jest.mock("@/lib/tmdb", () => ({
  fetchMovieReviews: jest.fn().mockResolvedValue([]),
}));

jest.mock("@/lib/ai", () => ({
  analyzeReviews: jest.fn().mockResolvedValue("Positive sentiment"),
}));

describe("Movie API Route", () => {
  it("returns movie data", async () => {
    const response = await GET(new Request("http://localhost"), {
      params: Promise.resolve({ id: "tt0133093" }),
    });

    const data = await response.json();

    expect(data.movie.title).toBe("Mock Movie");
  });
});
