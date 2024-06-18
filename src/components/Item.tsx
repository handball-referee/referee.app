import React, { PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";

export interface ItemProps<T> {
  code: T; // eslint-disable-line react/no-unused-prop-types
  type?: "header" | "regular"
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

function Item<T>({
  selected,
  type,
  children,
  onClick,
  className: additionalClassName,
}: PropsWithChildren<ItemProps<T>>) {
  const className = classNames("flex p-1 content-center", {
    "aria-selected:bg-blue-500 hover:bg-blue-200": type === "header",
    "aria-selected:bg-grey-300 hover:bg-grey-400": type === "regular",
  }, additionalClassName);
  return (
    <li
      className={className}
      role="option"
      aria-selected={selected}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

export default Item;
