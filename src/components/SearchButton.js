import { SearchIcon } from "../assets/icons";
import Button from "./ui/Button";

export function SearchButton({ onClick }) {
  return (
    <Button onClick={onClick}>
      <SearchIcon />
    </Button>
  );
}
