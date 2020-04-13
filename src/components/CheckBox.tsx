import React, { FunctionComponent, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./CheckBox.css";

interface Props {
  checked: boolean;
  onChange?: () => void;
}

const CheckBox: FunctionComponent<Props> = ({ checked, onChange }) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 32 && onChange) {
      onChange();
    }
  };

  return (
    <div
      className="checkbox"
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={onChange}
      onKeyDown={handleKeyDown}
    >
      <input type="checkbox" checked={checked} onChange={onChange} />
      <FontAwesomeIcon className="checkmark" icon={faCheck} />
    </div>
  );
};

export default CheckBox;
