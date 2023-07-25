import { FlexCol, FlexRow } from "../../utils/flexLayouts";

export function ListItem({ item }) {
  return (
    <tr key={item.id} className="border-b border-light-gray max-h-[86px]">
      {/* Колонка для ID */}
      <td className="md:w-[110px] sm:w-1/6 sm:text-base xs:w-3/12 xs:text-lg pt-6 pb-6 border-r border-light-gray">
        <FlexCol className="items-center justify-center">
          <FlexRow>{item.id}</FlexRow>
        </FlexCol>
      </td>
      {/* Колонка для Заголовка */}
      <td className="sm:w-3/6 xs:w-5/12 border-r p-2 border-light-gray">
        <FlexCol>
          <FlexRow>{item.title}</FlexRow>
        </FlexCol>
      </td>
      {/* Колонка для Описания */}
      <td className="md:w-[435px] sm:w-2/6 xs:w-4/12">
        <FlexCol className="p-2">
          {/* Текст описания с обрезанным содержимым и троеточием в конце */}
          <FlexRow className="text-ellipsis">{item.body}</FlexRow>
        </FlexCol>
      </td>
    </tr>
  );
}
