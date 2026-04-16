import { MovieData } from "@/types";

export default async function fetchMovies(q?: string): Promise<MovieData[]> {
  let url = `https://challenge-onebite-cinema-server-topaz.vercel.app/movie`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
