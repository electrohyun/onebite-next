"use server";

import { updateTag } from "next/cache";

type ActionState = {
  status: boolean;
  error: string;
};

export async function createReviewAction(
  _: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!movieId || !content || !author) {
    return {
      status: false,
      error: "리뷰 작성에 필요한 값이 없습니다.",
    };
  }

  try {
    const response = await fetch(`${process.env.MOVIE_API_BASE_URL}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: Number(movieId),
        content,
        author,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Next.js 강의 코드: revalidateTag(`review-${movieId}`);
    updateTag(`review-${movieId}`);

    return {
      status: true,
      error: "",
    };
  } catch (err) {
    console.error(err);

    return {
      status: false,
      error: "리뷰 작성에 실패했습니다.",
    };
  }
}
