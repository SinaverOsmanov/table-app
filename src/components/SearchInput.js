import React, { useState } from "react";
import Input from "./ui/Input";
import { SearchButton } from "./SearchButton";

export default React.memo(function SearchInput({ value, onSearchButtonClick }) {
  const [search, setSearch] = useState(value);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function handleSearchClick() {
    if (search !== value) {
      onSearchButtonClick(search);
    }
  }

  return (
    <div className="relative">
      <Input
        value={search}
        onChange={handleChange}
        placeholder="Поиск"
        type="search"
        className="bg-gray py-4 pl-4 pr-14 placeholder:text-gray-dark w-full"
      />
      <div className={"absolute top-0 right-0 h-full flex mr-6"}>
        <SearchButton onClick={handleSearchClick} />
      </div>
    </div>
  );
});
