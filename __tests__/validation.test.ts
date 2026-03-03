import { imdbSchema } from "@/lib/validation";

describe("IMDb ID validation", () => {
  it("accepts valid IMDb IDs", () => {
    expect(() => imdbSchema.parse("tt0133093")).not.toThrow();
  });

  it("rejects invalid IMDb IDs", () => {
    expect(() => imdbSchema.parse("123")).toThrow();
    expect(() => imdbSchema.parse("ttabc")).toThrow();
  });
});
