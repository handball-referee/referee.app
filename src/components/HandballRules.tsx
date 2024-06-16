import React from "react";
import RulesSelector from "./RulesSelector";
import RulesText from "./rules/RulesText";

const HandballRules = () => (
  <div id="rules" className="flex h-full overflow-auto flex-col md:flex-row">
    <RulesSelector />
    <RulesText />
  </div>
);

export default HandballRules;
