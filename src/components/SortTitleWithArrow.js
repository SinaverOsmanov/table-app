import React, { useEffect, useState } from "react";
import { FilterDownArrow } from "../assets/icons";

export default React.memo(function SortTitleWithArrow({
  item,
  onClick,
  sortList,
}) {
  const [sortButton, setSortButton] = useState(false);

  function clickHandler() {
    onClick(item.id);
  }

  useEffect(() => {
    const isSortActive = sortList[item.id] !== "asc";

    setSortButton(isSortActive);
  }, [item, sortList]);

  return (
    <th scope="col">
      <div className="flex md:space-x-12 sm:flex-row xs:flex-col xs:flex-1 sm:space-x-4 items-center justify-center">
        <div className="sm:flex-col sm:mb-0 xs:flex-row xs:mb-3">
          {item.title}
        </div>
        <div
          className={`sm:flex-col xs:flex-row cursor-pointer ${
            sortButton ? "rotate-180" : "rotate-0"
          }`}
          onClick={clickHandler}
        >
          <FilterDownArrow />
        </div>
      </div>
    </th>
  );
});
