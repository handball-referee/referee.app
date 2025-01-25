import React, {
  FunctionComponent,
} from "react";
import { useTranslation } from "react-i18next";
import Item from "./Item";
import useAnalytics from "../hooks/useAnalytics";
import Dropdown from "./Dropdown";
import us from "../img/us.svg";
import de from "../img/de.svg";
import fr from "../img/fr.svg";
import es from "../img/es.svg";
import pl from "../img/pl.svg";

const LanguagePicker: FunctionComponent = () => {
  const { i18n } = useTranslation();
  const { trackEvent } = useAnalytics();

  const handleLanguageChange = async (lang: string) => {
    await i18n.changeLanguage(lang);
    trackEvent("language_change", {
      event_category: "engagement",
      event_label: lang,
    });
  };

  const currentLanguage = i18n.language || 'en';

  return (
    <Dropdown<string>
      selected={currentLanguage}
      onSelect={(newLang) => handleLanguageChange(newLang)}
      type="header"
    >
      <Item code="en">
        <img src={us} alt="English" className="rounded mr-1 h-5" />
        <span>English</span>
      </Item>
      <Item code="de">
        <img src={de} alt="Deutsch" className="rounded mr-1 h-5" />
        <span>Deutsch</span>
      </Item>
      <Item code="fr">
        <img src={fr} alt="Français" className="rounded mr-1 h-5" />
        <span>Français</span>
      </Item>
      <Item code="es">
        <img src={es} alt="Español" className="rounded mr-1 h-5" />
        <span>Español</span>
      </Item>
      <Item code="pl">
        <img src={pl} alt="Polski" className="rounded mr-1 h-5" />
        <span>Polski</span>
      </Item>
    </Dropdown>
  );
};

export default LanguagePicker;
