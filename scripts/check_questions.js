const fs = require('fs');
const path = require('path');

const dePath = path.join(process.cwd(), 'de.json');
const enPath = path.join(process.cwd(), 'en.json');
const answersPath = path.join(process.cwd(), 'answers.json');

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function checkQuestions(deQuestions, enQuestions) {
  let success = true;
  if (deQuestions.length !== enQuestions.length) {
    console.error(`Mismatch: de.json has ${deQuestions.length} questions, en.json has ${enQuestions.length}`);
    // Find missing or extra questions by id
    const deIds = new Set(deQuestions.map(q => q.id));
    const enIds = new Set(enQuestions.map(q => q.id));
    const missingInEn = [...deIds].filter(id => !enIds.has(id));
    const missingInDe = [...enIds].filter(id => !deIds.has(id));
    if (missingInEn.length > 0) {
      console.error(`Questions in de.json but not in en.json: ${missingInEn.join(', ')}`);
    }
    if (missingInDe.length > 0) {
      console.error(`Questions in en.json but not in de.json: ${missingInDe.join(', ')}`);
    }
    success = false;
  }
  const minLen = Math.min(deQuestions.length, enQuestions.length);
  for (let i = 0; i < minLen; i++) {
    const deQ = deQuestions[i];
    const enQ = enQuestions[i];
    const deAnswers = Object.keys(deQ.answers || {});
    const enAnswers = Object.keys(enQ.answers || {});
    if (deAnswers.length !== enAnswers.length) {
      console.error(`Mismatch in answers for question index ${i} (id: ${deQ.id}): de.json has ${deAnswers.length}, en.json has ${enAnswers.length}`);
      success = false;
    }
  }
  if (success) {
    console.log('de.json and en.json have the same number of questions and each question has the same number of answers.');
  }
}

function checkAnswers(questions, answers) {
  const answerIds = new Set(answers.map(a => a.id));
  let missing = [];
  for (const q of questions) {
    if (!answerIds.has(q.id)) {
      missing.push(q.id);
    }
  }
  if (missing.length > 0) {
    console.error(`Missing answers for question ids: ${missing.join(', ')}`);
    return false;
  }
  return true;
}

function main() {
  const deQuestions = loadJson(dePath);
  const enQuestions = loadJson(enPath);
  const answers = loadJson(answersPath);
  checkQuestions(deQuestions, enQuestions);
  const deOk = checkAnswers(deQuestions, answers);
  const enOk = checkAnswers(enQuestions, answers);
  if (deOk && enOk) {
    console.log('All questions have corresponding answers in answers.json');
  }
}

main();
