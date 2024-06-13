import React, {
  FunctionComponent, MouseEvent, KeyboardEvent, ReactElement, useState,
} from "react";
import "./VersionPicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { ItemProps } from "./Item";
import { useRulesTestData } from "../context/TestDataContext";
import { AVAILABLE_LANGUAGES } from "../model/TestDataManager";

interface Props {
  children: Array<ReactElement<ItemProps>>;
}

const VersionPicker: FunctionComponent<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { version, setVersion } = useRulesTestData();

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
  const items = React.Children.map(children, (item: ReactElement<ItemProps>) => {
    const isSelected = item.props.code === version;
    if (isSelected) {
      content = item.props.children;
    }

    return React.cloneElement(item, {
      selected: isSelected,
      onClick: () => setVersion!(item.props.code as keyof typeof AVAILABLE_LANGUAGES),
    });
  });

  const className = classNames({
    open,
  });

  return (
    <div
      id="version-picker"
      className={className}
      role="listbox"
      aria-label={t("app.language")}
      tabIndex={0}
      onClick={handleTogglePopup}
      onKeyDown={handleKeyDown}
    >
      <div id="version-picker-content">
        {content}
      </div>
      <div id="version-picker-indicator">
        <FontAwesomeIcon icon={faAngleDown} />
      </div>
      <ul id="version-picker-popup">
        {items}
      </ul>
    </div>
  );
};

export default VersionPicker;
