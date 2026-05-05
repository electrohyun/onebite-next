import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  // 현재 페이지의 메타 데이터 동적으로 생성
  return {
    title: q ? `${q} 검색 결과 | 한입 북스` : "한입 북스",
    description: q ? `${q} 검색 결과` : "한입 북스에 등록된 도서를 만나보세요",
    openGraph: {
      title: q ? `${q} 검색 결과 | 한입 북스` : "한입 북스",
      description: q
        ? `${q} 검색 결과`
        : "한입 북스에 등록된 도서를 만나보세요",
      images: ["/thumbnail.png"],
    },
  };
}

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" },
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>;
  }
  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense
      key={q || ""}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
