import style from "./page.module.css";
import fetchOneMovie from "@/lib/fetch-one-movie";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export const generateStaticParams = () => {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
    { id: "10" },
    { id: "11" },
    { id: "12" },
    { id: "13" },
    { id: "14" },
    { id: "15" },
    { id: "16" },
    { id: "17" },
    { id: "18" },
  ];
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await fetchOneMovie(Number(id));

  if (!movie) notFound();

  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} alt={title} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.author}>
        {releaseDate} / {genres.join(", ")} | {runtime}분
      </div>
      <div className={style.company}>{company}</div>

      <div className={style.subtitle}>{subTitle}</div>

      <div className={style.description}>{description}</div>
    </div>
  );
}
