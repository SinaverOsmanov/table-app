import Button from "./ui/Button";

const maxViliblePages = 5;

export function Pagination({ page, numberOfPages, onChange }) {
  const pagesArray = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1
  );

  const startPage = Math.max(1, page - Math.floor(maxViliblePages / 2));
  const endPage = Math.min(numberOfPages, startPage + maxViliblePages - 1);
  const visiblePages = pagesArray.slice(startPage - 1, endPage);

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
      className="pagination flex flex-row mt-4 justify-between items-baseline md:px-10 sm:px-5 xs:px-0"
    >
      <div className="flex flex-col w-1/3">
        <div className="flex flex-row justify-start xs:text-lg md:text-xl">
          <Button onClick={prevPage} disabled={page === 1}>
            Назад
          </Button>
        </div>
      </div>
      <div className="flex flex-col page-numbers w-1/3">
        <div className="flex flex-row justify-center space-x-3">
          {visiblePages.map((pageNumber) => (
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
        <div className="flex flex-row justify-end xs:text-lg">
          <Button onClick={nextPage} disabled={page > numberOfPages - 1}>
            Далее
          </Button>
        </div>
      </div>
    </nav>
  );
}
