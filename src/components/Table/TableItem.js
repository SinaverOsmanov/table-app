export function ListItem({ item }) {
  return (
    <tr key={item.id} className="border-b border-light-gray max-h-[86px]">
      <td className="md:w-[110px] sm:w-1/6 sm:text-base xs:w-3/12 xs:text-lg pt-6 pb-6 border-r border-light-gray">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row">{item.id}</div>
        </div>
      </td>
      <td className="sm:w-3/6 xs:w-5/12 border-r p-2 border-light-gray">
        <div className="flex flex-col">
          <div className="flex flex-row">{item.title}</div>
        </div>
      </td>
      <td className="md:w-[435px] sm:w-2/6 xs:w-4/12">
        <div className="flex flex-col p-2">
          <div className="flex flex-row text-ellipsis">{item.body}</div>
        </div>
      </td>
    </tr>
  );
}
