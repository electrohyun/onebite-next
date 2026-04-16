import style from "./[id].module.css";

const mockData = {
  id: 1,
  title: "휴민트",
  releaseDate: "2026-02-11",
  company: "(주)NEW",
  genres: ["액션", "드라마"],
  subTitle: "휴민트가 노출되었다, 반드시 살려야 한다!",
  description:
    "동남아에서 벌어진 국제 범죄를 추적하던 국정원 블랙 요원, 조 과장(조인성)은 자신의 휴민트 작전에서 희생된 정보원이 남긴 단서를 쫓아 블라디보스토크로 향한다. 그곳에서 북한 식당 종업원 채선화(신세경)와 접촉한 조 과장은 새로운 휴민트 작전의 정보원으로 그녀를 선택한다. 한편, 국경 지역에서 발생한 실종 사건을 조사하기 위해 블라디보스토크로 파견된 보위성 조장 박건(박정민)은 해당 사건의 배후에 북한 총영사 황치성(박해준)이 연루되어 있음을 알게 된다. 서로 다른 목적으로 블라디보스토크에서 충돌하게 된 사람들. 짙어지는 의심과 불확실한 진실, 각자의 선택은 돌이킬 수 없는 길을 향하는데...",
  runtime: 119,
  posterImgUrl:
    "https://search.pstatic.net/common?&quality=85&direct=true&src=https%3A%2F%2Fs.pstatic.net%2Fmovie.phinf%2F20260211_258%2F1770776745027AHaUb_JPEG%2Fmovie_image.jpg%3Ftype%3Dw640_2",
};

export default function Page() {
  const {
    title,
    subTitle,
    description,
    releaseDate,
    company,
    genres,
    runtime,
    posterImgUrl,
  } = mockData;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
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
