import { IAnswer } from "../../model";
import mapRuleToAnchor from "../mapRuleToAnchor";
import * as Answers from "../../data/questions/ihf_08_2019/answers.json";

describe("mapRuleToAnchor", () => {
  it("should map all available rules to the correct anchor", () => {
    const texts: string[] = Array.from(
      new Set(Answers.reduce((all: string[], answer: IAnswer) => all.concat(answer.rule), [])),
    );
    texts.sort();

    const en = texts.map((text) => mapRuleToAnchor(text, "en"));
    const de = texts.map((text) => mapRuleToAnchor(text, "de"));
    const es = texts.map((text) => mapRuleToAnchor(text, "es"));

    expect(en).toMatchSnapshot();
    expect(de).toMatchSnapshot();
    expect(es).toMatchSnapshot();
  });
});
