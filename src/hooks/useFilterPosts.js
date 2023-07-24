import { useMemo } from "react";

export function useFilterPosts(posts, search) {
  const filteredPosts = useMemo(() => {
    return posts.filter((item) => {
      return (
        item.body.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [posts, search]);

  return filteredPosts;
}
