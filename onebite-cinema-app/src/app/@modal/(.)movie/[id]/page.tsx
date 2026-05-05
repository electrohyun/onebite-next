import Modal from "@/components/modal";
import MoviePage from "@/app/movie/[id]/page";

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Modal>
      <MoviePage params={params} />
    </Modal>
  );
}
