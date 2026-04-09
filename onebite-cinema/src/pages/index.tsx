import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import type { ReactNode } from "react";
import movies from "@/mock/movies.json";
import MovieItem from "@/components/movie-item";
import Link from "next/link";

export default function Home() {
  return (
    <div className={style.container}>
      <section className={style.recommend_section}>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommend_list}>
          {movies.slice(0, 3).map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className={style.recommend_movie_item}
            >
              <img src={movie.posterImgUrl} />
            </Link>
          ))}
        </div>
      </section>
      <section className={style.all_movies_section}>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_movies_list}>
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className={style.all_movies_item}
            >
              <img src={movie.posterImgUrl} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
