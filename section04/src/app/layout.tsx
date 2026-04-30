import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
  );

  if (!response.ok) {
    return <div>제작 @winterlood</div>;
  }

  const books: BookData[] = await response.json();
  const bookCount = books.length;

  return (
    <div>
      📚 ONEBITE BOOKS - 총 {bookCount}권의 책이 있습니다. 제작 @winterlood
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
