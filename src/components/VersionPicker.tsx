import React, {
  FunctionComponent, ReactElement,
} from "react";
import { ItemProps } from "./Item";
import { useRulesTestData } from "../context/TestDataContext";
import { AVAILABLE_LANGUAGES } from "../model/TestDataManager";
import Dropdown from "./Dropdown";

interface Props {
  children: Array<ReactElement<ItemProps<keyof typeof AVAILABLE_LANGUAGES>>>;
}

const VersionPicker: FunctionComponent<Props> = ({ children }) => {
  const { version, setVersion } = useRulesTestData();

  return (
    <Dropdown<keyof typeof AVAILABLE_LANGUAGES>
      selected={version}
      onSelect={(newVersion) => setVersion!(newVersion)}
    >
      {children}
    </Dropdown>
  );
};

export default VersionPicker;
