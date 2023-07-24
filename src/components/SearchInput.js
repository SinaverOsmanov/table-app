import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { SearchIcon } from "../assets/icons";

export default React.memo(function SearchInput({ value, onChange, onClick }) {
  const [search, setSearch] = useState(value);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function handleClick() {
    if (search !== value) {
      onClick(search);
    }
  }

  return (
    <div className="relative">
      <Input
        value={search}
        onChange={handleChange}
        placeholder="Поиск"
        type="search"
        className="bg-bg-input py-4 pl-4 pr-10 placeholder:text-gray-dark w-full"
      />
      <div className={"absolute top-0 right-0 h-full flex mr-6"}>
        <SearchButton onClick={handleClick} />
      </div>
    </div>
  );
});

function SearchButton({ onClick }) {
  return (
    <Button onClick={onClick}>
      <SearchIcon />
    </Button>
  );
}
