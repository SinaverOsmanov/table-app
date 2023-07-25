import { ListItem } from "./TableItem";
import SortTitleWithArrow from "../SortTitleWithArrow";
import Table from "../ui/Table";
import { useSortableTable } from "../../hooks/useSortableTable";

export function TableList({ head, body }) {
  const { sortedData, sort, sortList } = useSortableTable(body, head);

  if (!Array.isArray(body) || body.length === 0)
    return <div className="flex flex-row">Список пуст</div>;

  return (
    <Table className="custom-table">
      <thead className="bg-black text-white sm:h-14 xs:h-20">
        <tr>
          {head.map((tableItem) => {
            return (
              <SortTitleWithArrow
                key={tableItem.id}
                item={tableItem}
                onClick={sort}
                sortList={sortList}
              />
            );
          })}
        </tr>
      </thead>
      <tbody className="border border-light-gray lg:text-md md:text-xs">
        {sortedData.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </tbody>
    </Table>
  );
}
