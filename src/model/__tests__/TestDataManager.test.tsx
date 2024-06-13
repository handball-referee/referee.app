import TestDataManager from "../TestDataManager";
import { loadQuestions } from "../../utils/loadTestData";
import { IQuestion } from "../index";

jest.mock("../../utils/loadTestData");

const testQuestionEN: IQuestion = {
  id: "1.1",
  question: "English",
  answers: {
    a: "Option A",
    b: "Option B",
    c: "Option C",
    d: "Option D",
  },
};

const testQuestionDE: IQuestion = {
  id: "1.1",
  question: "Deutsch",
  answers: {
    a: "Option A",
    b: "Option B",
    c: "Option C",
    d: "Option D",
  },
};

describe("TestDataManager", () => {
  let manager: TestDataManager;

  beforeEach(() => {
    manager = new TestDataManager();
  });

  it("should load data correctly", async () => {
    (loadQuestions as jest.Mock).mockResolvedValueOnce({
      questions: [testQuestionEN],
      answers: [{
        id: "1.1",
        correct: [
          "b",
          "d",
        ],
        rule: [
          "1:1",
        ],
      }],
    });

    await manager.initialize("en", "ihf_08_2019");

    expect(loadQuestions).toHaveBeenCalledWith("en", "ihf_08_2019");
    expect(manager.data["1.1"]).toBeTruthy();
    expect(manager.data["1.1"].question).toEqual({ en: "English" });

    // switch language, same version

    (loadQuestions as jest.Mock).mockResolvedValueOnce({
      questions: [testQuestionDE],
      answers: [{
        id: "1.1",
        correct: [
          "b",
          "d",
        ],
        rule: [
          "1:1",
        ],
      }],
    });

    await manager.initialize("de", "ihf_08_2019");

    expect(manager.data["1.1"].question).toEqual({ en: "English", de: "Deutsch" });

    // switch version, same language

    (loadQuestions as jest.Mock).mockResolvedValueOnce({
      questions: [testQuestionEN],
      answers: [{
        id: "1.1",
        correct: [
          "b",
          "d",
        ],
        rule: [
          "1:1",
        ],
      }],
    });

    await manager.initialize("en", "ihf_05_2024");

    expect(manager.data["1.1"].question).toEqual({ en: "English" });
    expect(manager.languageMissing).toBeFalsy();

    // switch to missing language

    await manager.initialize("fr", "ihf_05_2024");

    expect(manager.data["1.1"].question).toEqual({ en: "English" });
    expect(manager.languageMissing).toBeTruthy();
  });
});
