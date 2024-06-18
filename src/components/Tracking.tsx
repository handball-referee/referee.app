import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import usePrivacySettings from "../hooks/usePrivacySettings";
import { Decision } from "../context/PrivacyContext";

const Tracking: FunctionComponent = () => {
  const { t } = useTranslation();
  const {
    allowReporting,
    allowTracking,
    updateReportingDecision,
    updateTrackingDecision,
  } = usePrivacySettings();

  if (allowReporting !== undefined || allowTracking !== undefined) {
    return null;
  }

  const handleAccept = () => {
    updateReportingDecision(Decision.ACCEPTED);
    updateTrackingDecision(Decision.ACCEPTED);
  };

  const handleDecline = () => {
    updateReportingDecision(Decision.DECLINED);
    updateTrackingDecision(Decision.DECLINED);
  };

  return (
    <div className="flex bg-blue-100 border-b border-blue-500 flex-col md:flex-row">
      <div className="p-2 text-xs">
        We use cookies to analyse our traffic. We may also use features such as offline data,
        browser storage and error reporting to help improve our service. By clicking &quot;
        {t("privacy.accept")}
        &quot; you will allow the use of cookies.
        {" "}
        <Link to="/about" className="text-white">More information</Link>
      </div>
      <div id="tracking-buttons" className="flex p-2">
        <button type="button" onClick={handleAccept} className="text-base rounded-lg h-8 box-border w-1/2 md:w-28 bg-green-100 border border-green-300 text-black mr-2">{t("privacy.accept")}</button>
        <button type="button" onClick={handleDecline} className="text-base rounded-lg h-8 box-border w-1/2 md:w-28 bg-blue-400 border border-blue-500 text-white">{t("privacy.decline")}</button>
      </div>
    </div>
  );
};

export default Tracking;
