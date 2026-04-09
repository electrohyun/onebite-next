import SearchableLayout from "@/components/searchable-layout";
import movies from "@/mock/movies.json";
import type { ReactNode } from "react";
import style from "./index.module.css";
import Link from "next/link";

export default function Page() {
  return (
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
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
