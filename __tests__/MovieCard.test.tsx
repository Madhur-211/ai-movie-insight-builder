import { render, screen } from "@testing-library/react";
import MovieCard from "@/app/components/MovieCard";

const mockMovie = {
  title: "The Matrix",
  poster: "test.jpg",
  year: "1999",
  rating: "8.7",
  plot: "Sci-fi action movie",
  cast: ["Keanu Reeves", "Laurence Fishburne"],
};

describe("MovieCard Component", () => {
  it("renders movie title", () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText("The Matrix")).toBeInTheDocument();
  });

  it("renders cast members", () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText("Keanu Reeves")).toBeInTheDocument();
  });
});
