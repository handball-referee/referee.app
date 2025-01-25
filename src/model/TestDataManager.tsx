/* eslint-disable no-underscore-dangle */
import { IDBPDatabase, openDB } from "idb";
import {
  IAnswer, IQuestion, ITestData, RefereeDB,
} from "./index";
import Question from "./Question";
import { loadQuestions } from "../utils/loadTestData";

export const AVAILABLE_LANGUAGES = {
  ihf_05_2024: ["en","pl"],
  ihf_08_2019: ["en", "de", "fr", "es"],
};

export default class TestDataManager {
  private db: IDBPDatabase<RefereeDB>|null = null;

  private _data: {[id: string]: Question } = {};

  private loadedLanguages: Map<string, string[]> = new Map();

  private todo: string[] = [];

  private initialized = false;

  private _version: string = "";

  private currentId = "";

  private _asked = 0;

  private _correct = 0;

  private _wrong = 0;

  private _languageMissing: boolean = false;

  public async initialize(lang: string, version: keyof typeof AVAILABLE_LANGUAGES = "ihf_05_2024") {
    let language = lang;
    if (!AVAILABLE_LANGUAGES[version].includes(language)) {
      this._languageMissing = true;
      language = "en";
    } else {
      this._languageMissing = false;
    }

    if (this.initialized && this._version === version) {
      await this.switchLanguage(language);
      return this._data[this.currentId];
    }

    const data = await loadQuestions(language, version);

    this.loadedLanguages.set(version, [language]);

    const mappedAnswers = data.answers.reduce<{[id: string]: IAnswer}>((prev, curr) => ({
      ...prev,
      [curr.id]: curr,
    }), {});

    const mappedQuestions = data.questions.reduce<{[id: string]: IQuestion}>((prev, curr) => ({
      ...prev,
      [curr.id]: curr,
    }), {});

    const mappedTestData: {[id: string]: ITestData} = {};

    let db;

    try {
      db = await openDB<RefereeDB>(version, 1, {
        async upgrade(currentDB, oldVersion) {
          if (oldVersion < 1) {
            currentDB.createObjectStore("questions");
          }
        },
      });
    } catch (err) {
      // silently fail
    }

    const ids = Object.keys(mappedAnswers);
    this.todo = [...ids];

    if (db) {
      const tx = db.transaction("questions", "readwrite");

      const currentDate = new Date();

      let cursor = await tx.store.openCursor();

      while (cursor) {
        mappedTestData[cursor.key] = cursor.value;

        const testData = cursor.value;

        this._asked += testData.asked;
        this._correct += testData.correct;
        this._wrong += testData.wrong;

        if (testData.lastAsked) {
          let remove = false;
          const diffTime = Math.abs(+testData.lastAsked - +currentDate);
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

          // remove if needed
          if (
            (testData.box === 2 && diffDays < 1)
            || (testData.box === 3 && diffDays < 3)
            || (testData.box === 4 && diffDays < 7)
            || (testData.box === 5 && diffDays < 30)
          ) {
            remove = true;
          }

          if (remove) {
            // eslint-disable-next-line no-loop-func
            const index = this.todo.findIndex((val) => val === cursor?.key);
            if (index > -1) {
              this.todo.splice(index, 1);
            }
          }
        }

        // eslint-disable-next-line no-await-in-loop
        cursor = await cursor.continue();
      }

      await tx.done;

      this.db = db;
    }

    for (let i = 0; i < ids.length; i += 1) {
      const id = ids[i];
      this._data[id] = new Question(
        language,
        mappedQuestions[id],
        mappedAnswers[id],
        mappedTestData[id],
      );
    }

    this.initialized = true;
    this._version = version;

    return this.next();
  }

  get wrong(): number {
    return this._wrong;
  }

  get correct(): number {
    return this._correct;
  }

  get asked(): number {
    return this._asked;
  }

  get data(): { [p: string]: Question } {
    return this._data;
  }

  get languageMissing(): boolean {
    return this._languageMissing;
  }

  public async checkAnswer(answers: string[]) {
    if (!this.currentId) {
      return {
        correct: [],
        rules: [],
      };
    }

    // persist test data

    const question = this._data[this.currentId];

    const result = question.checkAnswer(answers);

    this._asked += 1;
    if (result.answeredCorrect) {
      this._correct += 1;
    } else {
      this._wrong += 1;
    }

    if (this.db) {
      await question.persist(this.db);
    }

    if (question.box > 1) {
      const index = this.todo.findIndex((val) => val === question.id);
      this.todo.splice(index, 1);
    }

    return result;
  }

  public next() {
    this.currentId = this.todo[Math.floor(Math.random() * this.todo.length)];
    return this._data[this.currentId];
  }

  private async switchLanguage(language: string) {
    const languages = this.loadedLanguages.get(this._version);
    if (languages && languages.includes(language)) {
      return;
    }

    const data = await loadQuestions(language, this._version);
    for (let i = 0; i < data.questions.length; i += 1) {
      const question = data.questions[i];
      this._data[question.id].updateData(language, question);
    }

    this.loadedLanguages.set(this._version, [...languages || [], language]);
  }

  public async reset() {
    this._asked = 0;
    this._correct = 0;
    this._wrong = 0;
    if (this.db) {
      await Promise.all(Object.keys(this._data).map(async (id) => {
        const question = this._data[id];
        await question.reset(this.db);
      }));
    }
  }
}
