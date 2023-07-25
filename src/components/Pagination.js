import { FlexCol, FlexRow } from "../utils/flexLayouts";
import Button from "./ui/Button";

const maxViliblePages = 5;

export function Pagination({ page, numberOfPages, onChange }) {
  const visiblePages = calculateVisiblePages(page, numberOfPages);

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
      className="pagination flex flex-row mt-4 justify-between md:px-10 sm:px-5 items-baseline xs:px-0" // md:px-10-отступы слева и справа для экрана(768px)
    >
      <FlexCol className="w-1/3">
        <FlexRow className="justify-start xs:text-lg md:text-2xl">
          <Button onClick={prevPage} disabled={page === 1}>
            Назад
          </Button>
        </FlexRow>
      </FlexCol>
      <FlexCol className="page-numbers w-1/3">
        <FlexRow className="justify-center space-x-3">
          {visiblePages.map((pageNumber) => (
            <Button
              onClick={() => changeActivePage(pageNumber)}
              className={`flex flex-col ${pageNumber === page ? "active" : ""}`}
              key={pageNumber}
            >
              {pageNumber}
            </Button>
          ))}
        </FlexRow>
      </FlexCol>
      <FlexCol className="w-1/3">
        <FlexRow className="justify-end md:text-2xl xs:text-lg">
          <Button onClick={nextPage} disabled={page > numberOfPages - 1}>
            Далее
          </Button>
        </FlexRow>
      </FlexCol>
    </nav>
  );
}

function calculateVisiblePages(page, numberOfPages) {
  const pagesArray = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1
  );
  const startPage = Math.max(1, page - Math.floor(maxViliblePages / 2));
  const endPage = Math.min(numberOfPages, startPage + maxViliblePages - 1);
  const visiblePages = pagesArray.slice(startPage - 1, endPage);

  return visiblePages;
}
