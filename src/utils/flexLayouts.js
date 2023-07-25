import { twMerge } from "tailwind-merge";

export function FlexRow({ children, className }) {
  return <div className={twMerge(`flex flex-row`, className)}>{children}</div>;
}

export function FlexCol({ children, className }) {
  return <div className={twMerge(`flex flex-col`, className)}>{children}</div>;
}
