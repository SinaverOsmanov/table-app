export function ListItem({ item }) {
  return (
    <tr
      key={item.id}
      className="border-b border-light-gray overflow-y-hidden max-h-[85px]"
    >
      <td className="pt-6 pb-6 border-r border-light-gray">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row">{item.id}</div>
        </div>
      </td>
      <td className="w-6/12 border-r p-2 border-light-gray">
        <div className="flex flex-col">
          <div className="flex flex-row">{item.title}</div>
        </div>
      </td>
      <td className="w-5/12">
        <div className="flex flex-col p-2">
          <div className="flex flex-row">{item.body}</div>
        </div>
      </td>
    </tr>
  );
}
