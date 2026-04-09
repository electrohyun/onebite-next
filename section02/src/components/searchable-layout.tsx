import { useRouter } from "next/router";
import {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const q = router.query.q as string;

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  // ChangeEvent 객체 타입인데, 어떤 태그에서 발생한 거냐면,
  // HTMLInputElement에서 발생한 이벤트 타입입니다.
  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_contatiner}>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세용"
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
