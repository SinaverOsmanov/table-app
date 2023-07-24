import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { selectPosts } from "./store/slices/postsSlice/selectors";
import React, { useEffect, useState } from "react";
import { getPostsAsync } from "./store/slices/postsSlice";
import { selectLoadingPosts } from "./store/slices/postsSlice";
import SearchInput from "./components/SearchInput";
import { Pagination } from "./components/Pagination";
import { TableList } from "./components/Table/TableList";
import { useFilterPosts } from "./hooks/useFilterPosts";
import { usePagination } from "./hooks/usePagination";

const tableHeadTitles = [
  { title: "ID", id: "id" },
  { title: "Заголовок", id: "title" },
  { title: "Описание", id: "body" },
];

function App() {
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoadingPosts);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filteredPosts = useFilterPosts(posts, search);
  const { numberOfPages, pagePosts } = usePagination(
    filteredPosts,
    perPage,
    page
  );

  function changePageHandler(page) {
    setPage(page);
  }

  function handleClick(text) {
    setSearch(text);
  }

  useEffect(() => {
    if (loading === "IDLE") {
      dispatch(getPostsAsync());
    }
  }, [dispatch, loading]);

  if (loading !== "SUCCESS") return <div>Загрузка</div>;

  return (
    <div className="app m-5">
      <div className="wrapper p-[74px]">
        <div className="w-full mb-4">
          <div className="w-1/2">
            <SearchInput value={search} onSearchButtonClick={handleClick} />
          </div>
        </div>
        <TableList head={tableHeadTitles} body={pagePosts} />
        <Pagination
          numberOfPages={numberOfPages}
          page={page}
          onChange={changePageHandler}
        />
      </div>
    </div>
  );
}

export default App;
