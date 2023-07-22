import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { SearchIcon } from "../assets/icons";

export default function SearchInput({ value, onChange }) {
  // const [value, setValue] = useState(value);

  function handleChange(event) {
    onChange(event.target.value);
  }

  function handleClick() {
    onChange("");
  }

  return (
    <div className="row" style={{ position: "relative" }}>
      <Input
        value={value}
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
}

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
