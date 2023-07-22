import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { selectPosts } from "./store/slices/postsSlice/selectors";
import { useEffect, useState } from "react";
import { getPostsAsync } from "./store/slices/postsSlice";
import { selectLoadingPosts } from "./store/slices/postsSlice";
import Button from "./components/ui/Button";
import SearchInput from "./components/SearchInput";
import { FilterDownArrow } from "./assets/icons";

function App() {
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoadingPosts);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const perPage = 10;

  const numberOfPages = Math.ceil(posts.length / 10);

  const pagePosts = posts.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    if (loading === "IDLE") {
      dispatch(getPostsAsync());
    }
  }, [dispatch, loading]);

  function changePageHandler(page) {
    setPage(page);
  }

  if (loading !== "SUCCESS") return <div>Загрузка</div>;

  return (
    <div className="app m-auto mt-5">
      <div className="d-flex row mb-3">
        <div className="flex-column col-7">
          <SearchInput value={search} onChange={setSearch} />
        </div>
      </div>
      <div className="d-flex row mb-2">
        <TableList posts={pagePosts} />
      </div>
      <div className="d-flex row">
        <Pagination
          numberOfPages={numberOfPages}
          page={page}
          onChange={changePageHandler}
        />
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
      className="pagination d-flex flex-row justify-content-between align-items-center"
    >
      <div className="d-flex flex-column">
        <div className="d-flex flex-row">
          <Button onClick={prevPage} disabled={page === 1}>
            Назад
          </Button>
        </div>
      </div>
      <div className="d-flex flex-column page-numbers">
        <div className="d-flex flex-row justify-content-center">
          {pagesArray.map((pageNumber) => (
            <Button
              onClick={() => changeActivePage(pageNumber)}
              className={`d-flex flex-column ${
                pageNumber === page ? "active" : ""
              }`}
              key={pageNumber}
            >
              {pageNumber}
            </Button>
          ))}
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row">
          <Button onClick={nextPage} disabled={page > numberOfPages - 1}>
            Далее
          </Button>
        </div>
      </div>
    </nav>
  );
}

function TableList({ posts }) {
  return (
    <table className="table table-bordered custom-table">
      <thead>
        <tr>
          <th scope="col">
            <THeadTitle>ID</THeadTitle>
          </th>
          <th scope="col">
            <THeadTitle>Заголовок</THeadTitle>
          </th>
          <th scope="col">
            <THeadTitle>Описание</THeadTitle>
          </th>
        </tr>
      </thead>

      <tbody style={{ fontSize: "13px" }}>
        {posts.map((post) => (
          <tr key={post.id}>
            <td style={{ width: "10%" }}>
              <div className="d-flex col justify-content-center align-items-center">
                <div className="d-flex flex-row align-items-middle">
                  {post.id}
                </div>
              </div>
            </td>
            <td style={{ width: "50%" }}>
              <div className="d-flex flex-column align-items-middle">
                <div className="d-flex flex-row align-items-middle">
                  {post.title}
                </div>
              </div>
            </td>
            <td style={{ width: "40%" }}>
              <div className="d-flex flex-column align-items-middle">
                <div className="d-flex flex-row justify-content-center align-items-middle">
                  {post.body}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;

function THeadTitle({ children }) {
  return (
    <div className="d-flex flex-row justify-content-center">
      <div className="d-flex flex-column col-6 align-items-center justify-content-center">
        <div className="d-flex row align-items-center justify-content-between">
          <div className="d-flex flex-column col-6">{children}</div>
          <div className="d-flex flex-column col-6 col-offset-1">
            <Button>
              <FilterDownArrow />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
