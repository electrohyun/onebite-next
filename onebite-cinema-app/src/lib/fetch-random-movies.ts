import { MovieData } from "@/types";

export default async function fetchRandomMovies(): Promise<MovieData[]> {
  const url = `${process.env.MOVIE_API_BASE_URL}/movie/random`;

  try {
    const response = await fetch(url, { next: { revalidate: 3 } });
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
