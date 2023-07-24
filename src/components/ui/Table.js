import React from "react";
import { twMerge } from "tailwind-merge";

export default function Table({ className, children }) {
  //   const classNames = twMerge("", className);

  return <table className={className}>{children}</table>;
}
