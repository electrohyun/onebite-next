import type { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";

export default function MovieItem({
  id,
  title,
  subTitle,
  releaseDate,
  company,
  posterImgUrl,
}: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={style.container}>
      <img src={posterImgUrl} />
      <div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <br />
        <div className={style.author}>
          {releaseDate} | {company}
        </div>
      </div>
    </Link>
  );
}
