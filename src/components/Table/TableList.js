import { ListItem } from "./TableItem";
import { SortTitleWithArrow } from "../SortTitleWithArrow";
import Table from "../ui/Table";
import { useSortableTable } from "../../hooks/useSortableTable";

export function TableList({ head, body }) {
  const { sortedData, sort } = useSortableTable(body, head);

  if (!Array.isArray(body) || body.length === 0)
    return <div className="flex flex-row">Список пуст</div>;

  return (
    <Table className="custom-table">
      <thead className="bg-black text-white h-14">
        <tr>
          {head.map((tableItem) => {
            return (
              <SortTitleWithArrow
                key={tableItem.id}
                item={tableItem}
                onClick={sort}
              />
            );
          })}
        </tr>
      </thead>
      <tbody className="border border-light-gray">
        {sortedData.map((item) => (
          <ListItem item={item} key={item.id} />
        ))}
      </tbody>
    </Table>
  );
}
