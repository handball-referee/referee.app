import React, { FunctionComponent, ReactNode } from "react";

export interface ItemProps {
  code: string;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
  children: ReactNode;
}

const Item: FunctionComponent<ItemProps> = ({
  selected,
  children,
  onClick,
  className,
  code,
}) => (
  <li
    className={className}
    role="option"
    aria-selected={selected}
    value={code}
    onClick={onClick}
    onKeyDown={onClick}
  >
    {children}
  </li>
);

Item.defaultProps = {
  className: "",
  onClick: () => null,
  selected: false,
};

export default Item;
