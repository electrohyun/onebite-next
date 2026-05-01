import SearchableLayout from "@/components/searchable-layout";
import style from "./page.module.css";
import Link from "next/link";
import fetchMovies from "@/lib/fetch-movies";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const movies = await fetchMovies(q);

  return (
    <SearchableLayout>
      <div className={style.container}>
        <section className={style.search_result_section}>
          <div className={style.search_result_list}>
            {movies.map((movie) => {
              return (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className={style.search_result_item}
                >
                  <img src={movie.posterImgUrl} />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </SearchableLayout>
  );
}
