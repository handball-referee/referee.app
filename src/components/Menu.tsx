import React, { FunctionComponent, MouseEvent, useState } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleRight, faChartArea, faInfoCircle, faTasks,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../static/logo57.png";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface MenuItemProps {
  to: string;
  text: string;
  icon: IconProp;
}

const MenuItem: FunctionComponent<MenuItemProps> = ({icon ,text, to}) => {
  return (
    <NavLink to={to} className={({isActive}) => classNames("hover:bg-blue-200 text-white whitespace-nowrap flex flex-grow-0 basis-14 md:basis-9 overflow-hidden", {"bg-blue-100": isActive})}>
      <div className="min-w-14 w-14 text-center py-5 md:py-2.5"><FontAwesomeIcon icon={icon} size="lg" /></div>
      <div className="invisible md:visible text-sm py-2">{text}</div>
    </NavLink>
  )
}

const Menu: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleToggleOpen = (event: MouseEvent) => {
    event.preventDefault();

    setOpen(!open);
  };

  const className = classNames("flex flex-row md:flex-col bg-blue-500 w-full md:w-14 min-w-14 shadow transition-all transition-duration-300", {
    'min-w-48': open,
  });
  const rotation = open ? 180 : undefined;

  return (
    <div id="menu" className={className}>
      <div id="logo" className="flex flex-shrink-0 justify-end p-2 bg-blue-300 h-14">
        <img className="h-10 w-10" src={Logo} alt={t("app.title")} />
      </div>
      <nav className="flex flex-row md:flex-col text-xs">
        <MenuItem to="/" text={t("menu.test")} icon={faTasks} />
        {/* <MenuItem to="/rules" text={t("menu.rules")} icon={faBookOpen} /> */}
        <MenuItem to="/stats" text={t("menu.stats")} icon={faChartArea} />
        <MenuItem to="/about" text={t("menu.about")} icon={faInfoCircle} />
      </nav>
      <div className="hidden md:block flex-grow" />
      <div className="hidden md:block basis-9" id="menu-footer">
        <button type="button" onClick={handleToggleOpen} aria-pressed={open} aria-label={t("app.toggle-menu")}>
          <FontAwesomeIcon className="w-14 min-w-14 text-white duration-300" icon={faArrowAltCircleRight} size="lg" rotation={rotation} />
        </button>
      </div>
    </div>
  );
};

export default Menu;
