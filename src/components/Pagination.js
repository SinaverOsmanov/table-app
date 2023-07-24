import Button from "./ui/Button";

export function Pagination({ page, numberOfPages, onChange }) {
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
      className="pagination flex flex-row mt-4 justify-between items-center px-10"
    >
      <div className="flex flex-col w-1/3">
        <div className="flex flex-row justify-start">
          <Button onClick={prevPage} disabled={page === 1}>
            Назад
          </Button>
        </div>
      </div>
      <div className="flex flex-col page-numbers w-1/3">
        <div className="flex flex-row justify-center space-x-3">
          {pagesArray.map((pageNumber) => (
            <Button
              onClick={() => changeActivePage(pageNumber)}
              className={`flex flex-col ${pageNumber === page ? "active" : ""}`}
              key={pageNumber}
            >
              {pageNumber}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-1/3">
        <div className="flex flex-row justify-end">
          <Button onClick={nextPage} disabled={page > numberOfPages - 1}>
            Далее
          </Button>
        </div>
      </div>
    </nav>
  );
}
