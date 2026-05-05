import SearchableLayout from "@/components/searchable-layout";
import style from "./page.module.css";
import Link from "next/link";
import fetchMovies from "@/lib/fetch-movies";
import { Suspense } from "react";
import { delay } from "@/lib/delay";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);

  const movies = await fetchMovies(q);

  return (
    <div className={style.search_result_list}>
      {movies.map((movie) => {
        return (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className={style.search_result_item}
          >
            <img src={movie.posterImgUrl} alt={movie.title} />
          </Link>
        );
      })}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  return (
    <SearchableLayout>
      <div className={style.container}>
        <section className={style.search_result_section}>
          <Suspense
            key={query}
            fallback={
              <div className={style.search_result_list}>
                <MovieListSkeleton count={3} />
              </div>
            }
          >
            <SearchResult q={query} />
          </Suspense>
        </section>
      </div>
    </SearchableLayout>
  );
}
