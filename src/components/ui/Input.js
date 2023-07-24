import React from "react";
import { twMerge } from "tailwind-merge";

export default React.memo(function Input(props) {
  const classNames = twMerge(
    "text-white focus-visible:outline-none",
    props.className
  );

  return <input {...props} className={classNames} />;
});
