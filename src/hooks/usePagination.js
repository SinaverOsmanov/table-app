import { useMemo } from "react";

export function usePagination(posts, perPage, page) {
  const numberOfPages = useMemo(
    () => Math.ceil(posts.length / perPage),
    [posts, perPage]
  );

  const pagePosts = useMemo(() => {
    return posts.slice((page - 1) * perPage, page * perPage);
  }, [posts, page, perPage]);

  return { numberOfPages, pagePosts };
}
