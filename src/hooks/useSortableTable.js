import { useEffect, useState } from "react";

export const useSortableTable = (body, head) => {
  const [list, setList] = useState(body);
  const [sortList, setSortList] = useState({});

  const sort = (sortId) => {
    const sorted = list.sort((a, b) => {
      const prev = a[sortId];
      const next = b[sortId];

      const isANumber = typeof prev === "number" && !isNaN(prev);
      const isBNumber = typeof next === "number" && !isNaN(next);

      if (isANumber && isBNumber) {
        return sortList[sortId] === "asc" ? next - prev : prev - next;
      }

      return sortList[sortId] === "asc"
        ? next[0].localeCompare(prev[0])
        : prev[0].localeCompare(next[0]);
    });

    setSortList((prev) => ({
      ...prev,
      [sortId]: prev[sortId] === "asc" ? "desc" : "asc",
    }));

    setList(sorted);
  };

  useEffect(() => {
    setList(body);
  }, [body]);

  useEffect(() => {
    const sortNames = head.reduce((acc, cur) => {
      acc[cur.id] = "asc";
      return acc;
    }, {});
    setSortList(sortNames);
  }, [head]);

  return { sortedData: list, sort, sortList };
};
