import React from "react";
import { useTranslation } from "react-i18next";
import useScrollToAnchor from "../../../hooks/useScrollToAnchor";

const Polish = () => {
  const { t } = useTranslation();
  useScrollToAnchor();

  const text = `
    <h1 id="rules-of-the-game">${t("rules.rules")}</h1>
    <h1 id="clarifications-to-the-rules-of-the-game">${t("rules.clarifications")}</h1>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: text }} />
  );
};

export default Polish;
