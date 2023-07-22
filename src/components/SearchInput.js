import React, { useEffect, useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { SearchIcon } from "../assets/icons";
import { useThrottle } from "../hooks/useThrottle";

export default React.memo(function SearchInput({ value, onChange }) {
  const [search, setSearch] = useState(value);
  const { throttleValue } = useThrottle(search, 700);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  function handleClick() {
    setSearch("");
  }

  useEffect(() => {
    onChange(throttleValue);
  }, [throttleValue]);

  return (
    <div className="row" style={{ position: "relative" }}>
      <Input
        value={search}
        onChange={handleChange}
        placeholder="Поиск"
        type="search"
        style={{
          color: "#fff",
          background: "#5A5C66",
          fontWeight: 400,
          padding: "15px 50px 15px 25px",
        }}
      />
      <SearchButton onClick={handleClick} />
    </div>
  );
});

function SearchButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      style={{
        position: "absolute",
        right: "24px",
        top: "0",
        bottom: "0",
        padding: 0,
        width: "21px",
      }}
    >
      <SearchIcon />
    </Button>
  );
}
