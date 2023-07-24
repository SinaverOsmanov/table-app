import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { selectPosts } from "./store/slices/postsSlice/selectors";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getPostsAsync } from "./store/slices/postsSlice";
import { selectLoadingPosts } from "./store/slices/postsSlice";
import Button from "./components/ui/Button";
import SearchInput from "./components/SearchInput";
import { FilterDownArrow } from "./assets/icons";
import Table from "./components/ui/Table";

function App() {
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoadingPosts);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const setSearchCallback = useCallback((value) => setSearch(value), []);

  useEffect(() => {
    if (loading === "IDLE") {
      dispatch(getPostsAsync());
    }
  }, [dispatch, loading]);

  const filteredPosts = useMemo(() => {
    return posts.filter((item) => {
      return (
        item.body.toLowerCase().includes(search.toLowerCase()) ||
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [posts, search]);

  const numberOfPages = Math.ceil(filteredPosts.length / perPage);

  const pagePosts = useMemo(() => {
    return filteredPosts.slice((page - 1) * perPage, page * perPage);
  }, [filteredPosts, page, perPage]);

  function changePageHandler(page) {
    setPage(page);
  }

  function handleClick(text) {
    setSearch(text);
  }

  if (loading !== "SUCCESS") return <div>Загрузка</div>;

  return (
    <div className="app m-5">
      <div className="wrapper p-[74px]">
        <div className="w-full mb-4">
          <div className="w-1/2">
            <SearchInput
              value={search}
              onChange={setSearchCallback}
              onClick={handleClick}
            />
          </div>
        </div>
        <TableList posts={pagePosts} />
        {/* <div className="">
        <Pagination
          numberOfPages={numberOfPages}
          page={page}
          onChange={changePageHandler}
        />
      </div> */}
      </div>
    </div>
  );
}
function Pagination({ page, numberOfPages, onChange }) {
  const pagesArray = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1
  );

  function changeActivePage(pageNumber) {
    onChange(pageNumber);
  }

  function nextPage() {
    onChange(page + 1);
  }

  function prevPage() {
    onChange(page - 1);
  }

  return (
    <nav
      aria-label="Page navigation"
      className="pagination flex flex-row justify-content-between align-items-center"
    >
      <div className="flex flex-column">
        <div className="flex flex-row">
          <Button onClick={prevPage} disabled={page === 1}>
            Назад
          </Button>
        </div>
      </div>
      <div className="flex flex-column page-numbers">
        <div className="flex flex-row justify-content-center">
          {pagesArray.map((pageNumber) => (
            <Button
              onClick={() => changeActivePage(pageNumber)}
              className={`flex flex-column ${
                pageNumber === page ? "active" : ""
              }`}
              key={pageNumber}
            >
              {pageNumber}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-column">
        <div className="flex flex-row">
          <Button onClick={nextPage} disabled={page > numberOfPages - 1}>
            Далее
          </Button>
        </div>
      </div>
    </nav>
  );
}

function TableList({ posts, filters, onClick }) {
  function handleClick(e) {
    // const id = e.target.closest("button").getAttribute("id");

    console.log(e);
  }

  const tableHeadTitles = {
    id: "ID",
    title: "Заголовок",
    body: "Описание",
  };

  if (posts.length === 0)
    return <div className="flex flex-row">Список пуст</div>;

  return (
    <Table>
      <thead className="bg-black text-white h-14">
        <tr>
          <TableHeaderTitleWithArrow>ID</TableHeaderTitleWithArrow>
          <TableHeaderTitleWithArrow>Заголовок</TableHeaderTitleWithArrow>
          <TableHeaderTitleWithArrow>Описание</TableHeaderTitleWithArrow>
        </tr>
      </thead>

      <tbody className="font-medium text-[13px] border border-light-gray">
        {posts.map((post, index) => (
          <tr
            key={post.id}
            className={`${
              index === posts.length - 1 ? "" : "border-b border-light-gray"
            } min-h-[56px]`}
          >
            <td className="min-w-[110px] pt-6 pb-6 border-r border-light-gray">
              <div className="flex flex-col items-center">
                <div className="flex flex-row items-center">{post.id}</div>
              </div>
            </td>
            <td className="w-6/12 border-r p-2 border-light-gray">
              <div className="flex flex-col">
                <div className="flex flex-row">{post.title}</div>
              </div>
            </td>
            <td className="w-5/12">
              <div className="flex flex-col p-2">
                <div className="flex flex-row justify-content-center items-center">
                  {post.body}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default App;

function TableHeaderTitleWithArrow({ children, onClick }) {
  return (
    <th scope="col">
      <div className="flex flex-row items-center gap-10 justify-center">
        <div className="flex-col">{children}</div>
        <div className="flex-col col-">
          <FilterDownArrow onClick={() => onClick()} />
        </div>
      </div>
    </th>
  );
}
