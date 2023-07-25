import React from "react";
import { twMerge } from "tailwind-merge";

export default React.memo(function Input(props) {
  const classNames = twMerge(
    "text-white focus:outline-none appearance-none focus-visible:outline-none",
    props.className
  );

  return <input {...props} className={classNames} />;
});
