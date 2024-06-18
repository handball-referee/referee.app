import React, {
  MouseEvent, KeyboardEvent, ReactElement, useState, PropsWithChildren,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { ItemProps } from "./Item";

interface Props<T> {
  selected: T;
  children: Array<ReactElement<ItemProps<T>>>;
  onSelect: (code: T) => void;
  type?: "header" | "regular"
}

function Dropdown<T>({
  children, selected, onSelect, type = "regular",
}: PropsWithChildren<Props<T>>) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleTogglePopup = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setOpen(!open);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 32) {
      setOpen(!open);
    } else if (open) {
      if (event.keyCode === 27 || event.keyCode === 9) {
        setOpen(false);
      } else {
        return;
      }
    } else if (event.keyCode === 40) {
      setOpen(true);
    } else {
      return;
    }

    event.preventDefault();
  };

  let content = null;
  const items = React.Children.map(children, (item: ReactElement<ItemProps<T>>) => {
    const isSelected = item.props.code === selected;
    if (isSelected) {
      content = item.props.children;
    }

    return React.cloneElement(item, {
      type,
      selected: isSelected,
      onClick: () => onSelect(item.props.code),
    });
  });

  const className = classNames("flex relative h-8 border border-blue-500 rounded-lg box-border cursor-pointer", {
    "rounded-b-none": open,
    "m-3 text-white bg-blue-400 hover:bg-blue-500": type === "header",
    "text-black bg-white hover:bg-grey-100": type === "regular",
  });

  const popupClassName = classNames("absolute top-8 right-0 border border-blue-500 mt-[-2px] mr-[-1px] rounded-b min-w-full list-none z-10", {
    block: open,
    hidden: !open,
    "bg-blue-500": type === "header",
    "bg-white": type === "regular",
  });

  const contentClassName = classNames("flex-grow p-1 flex content-center");

  return (
    <div
      className={className}
      role="listbox"
      aria-label={t("app.language")}
      tabIndex={0}
      onClick={handleTogglePopup}
      onKeyDown={handleKeyDown}
    >
      <div className={contentClassName}>
        {content}
      </div>
      <div className="flex text-2xl w-4 my-1 mx-2 text-blue-100">
        <FontAwesomeIcon icon={faAngleDown} className="block" />
      </div>
      <ul className={popupClassName}>
        {items}
      </ul>
    </div>
  );
}

export default Dropdown;
