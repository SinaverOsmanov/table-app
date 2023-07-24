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

  const tableHeadTitles = [
    { title: "ID", id: "id" },
    { title: "Заголовок", id: "title" },
    { title: "Описание", id: "body" },
  ];

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
        <TableList head={tableHeadTitles} body={pagePosts} />
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

function TableList({ head, body }) {
  const [list, setList] = useState(body);
  const sortNames = head.reduce((acc, cur) => {
    acc[cur.id] = "asc";
    return acc;
  }, {});

  const [sortList, setSortList] = useState(sortNames);

  function sort(sortId) {
    const sorted = list.sort((a, b) => {
      const isANumber = typeof a[sortId] === "number" && !isNaN(a[sortId]);
      const isBNumber = typeof b[sortId] === "number" && !isNaN(b[sortId]);

      if (isANumber && isBNumber) {
        return sortList[sortId] === "asc"
          ? b[sortId] - a[sortId]
          : a[sortId] - b[sortId];
      }

      return sortList[sortId] === "asc"
        ? b[sortId][0].localeCompare(a[sortId][0])
        : a[sortId][0].localeCompare(b[sortId][0]);
    });

    setSortList((prev) => ({
      ...prev,
      [sortId]: prev[sortId] === "asc" ? "desc" : "asc",
    }));

    setList(sorted);
  }

  if (body.length === 0)
    return <div className="flex flex-row">Список пуст</div>;

  return (
    <Table>
      <thead className="bg-black text-white h-14">
        <tr>
          {head.map((tableItem) => {
            return (
              <TableHeaderTitleWithArrow
                key={tableItem.id}
                item={tableItem}
                onClick={sort}
              />
            );
          })}
        </tr>
      </thead>

      <tbody className="font-medium text-[13px] border border-light-gray">
        {list.map((item, index) => (
          <tr
            key={item.id}
            className={`${
              index === list.length - 1 ? "" : "border-b border-light-gray"
            } min-h-[56px]`}
          >
            <td className="min-w-[110px] pt-6 pb-6 border-r border-light-gray">
              <div className="flex flex-col items-center">
                <div className="flex flex-row items-center">{item.id}</div>
              </div>
            </td>
            <td className="w-6/12 border-r p-2 border-light-gray">
              <div className="flex flex-col">
                <div className="flex flex-row">{item.title}</div>
              </div>
            </td>
            <td className="w-5/12">
              <div className="flex flex-col p-2">
                <div className="flex flex-row justify-content-center items-center">
                  {item.body}
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

function TableHeaderTitleWithArrow({ item, onClick }) {
  return (
    <th scope="col">
      <div className="flex flex-row items-center gap-10 justify-center">
        <div className="flex-col">{item.title}</div>
        <div
          className="flex-col cursor-pointer"
          onClick={() => onClick(item.id)}
        >
          <FilterDownArrow />
        </div>
      </div>
    </th>
  );
}
