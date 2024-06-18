import React, {FunctionComponent, PropsWithChildren} from "react";
import classnames from "classnames";

interface Props {
  className?: string;
}

const Box: FunctionComponent<PropsWithChildren<Props>> = ({ className, children}) => {
  const classNames = classnames("bg-white shadow p-4 mt-4 mx-4", className);
  return (
    <div className={classNames}>{children}</div>
  );
}

export default Box;
