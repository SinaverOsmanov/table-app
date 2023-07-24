import { FilterDownArrow } from "../assets/icons";

export function SortTitleWithArrow({ item, onClick }) {
  return (
    <th scope="col">
      <div className="flex flex-row items-center gap-10 justify-center">
        <div className="flex-col">{item.title}</div>
        <div
          className="flex-col cursor-pointer"
          onClick={() => onClick(item.id)}
        >
          <FilterDownArrow />
        </div>
      </div>
    </th>
  );
}
