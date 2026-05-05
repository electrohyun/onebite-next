import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal?: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <GlobalLayout>{children}</GlobalLayout>
        {modal}
        <div id="modal-root" />
      </body>
    </html>
  );
}
