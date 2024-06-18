import React, { FunctionComponent, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface Props {
  checked: boolean;
  onChange?: () => void;
  labelledBy?: string;
  readOnly?: boolean;
}

const CheckBox: FunctionComponent<Props> = ({
  checked,
  onChange,
  labelledBy,
  readOnly,
}) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 32 && onChange) {
      onChange();
    }
  };

  return (
    <div
      className="checkbox relative select-none bg-white border border-blue-500 rounded w-5 h-5 box-border cursor-pointer hover:bg-blue-200 aria-checked:bg-blue-400"
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={onChange}
      onKeyDown={handleKeyDown}
    >
      <input
        type="checkbox"
        className="absolute opacity-0 w-0 h-0 peer"
        checked={checked}
        onChange={onChange}
        readOnly={readOnly}
        aria-labelledby={labelledBy}
      />
      <FontAwesomeIcon className="hidden absolute text-white pl-0.5 peer-checked:block" icon={faCheck} />
    </div>
  );
};

export default CheckBox;
