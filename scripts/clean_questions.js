const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '2025_07_DHB_Regelfragenkatalog_Fragen.txt');
const outputPath = path.join(__dirname, 'questions_clean.txt');
const jsonPath = path.join(__dirname, 'de.json');

function isSectionTitle(line) {
  return /^\s*Rule \d+\s*$/.test(line);
}

function isPageNumber(line) {
  // Remove lines that only contain a number (possibly with spaces)
  return /^\s*\d+\s*$/.test(line);
}

function isBlankOrNonPrintable(line) {
  // Remove form feed and other non-printable characters
  const cleaned = line.replace(/[\f\r\v\0-\x1F\x7F]+/g, '').trim();
  return cleaned.length === 0;
}

function isSubstitutionAreaRegulation(line) {
  return /^\s*Substitution Area Regulation\s*$/i.test(line);
}

function cleanFile() {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const cleanedLines = lines.filter(line => {
    if (isSectionTitle(line)) return false;
    if (isPageNumber(line)) return false;
    if (isBlankOrNonPrintable(line)) return false;
    if (isSubstitutionAreaRegulation(line)) return false;
    return true;
  });
  fs.writeFileSync(outputPath, cleanedLines.join('\n'), 'utf8');
  console.log('File cleaned and overwritten.');
}

function parseQuestionsAndAnswers(lines) {
  const questions = [];
  let currentQuestion = null;
  let currentAnswer = null;
  let currentAnswerId = null;

  const questionRegex = /^\s*((?:SAR1|SAR2|\d+\.\d+))\s*(.*)$/;
  const answerRegex = /^\s*([a-z])\)\s*(.*)$/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const questionMatch = questionRegex.exec(line);
    const answerMatch = answerRegex.exec(line);

    if (questionMatch) {
      // Save previous answer if exists
      if (currentAnswerId && currentQuestion) {
        currentQuestion.answers[currentAnswerId] = currentAnswer;
        currentAnswer = null;
        currentAnswerId = null;
      }
      // Save previous question
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      currentQuestion = {
        id: questionMatch[1],
        question: questionMatch[2],
        answers: {}
      };
      currentAnswer = null;
      currentAnswerId = null;
    } else if (answerMatch && currentQuestion) {
      // Save previous answer
      if (currentAnswerId) {
        currentQuestion.answers[currentAnswerId] = currentAnswer;
      }
      currentAnswerId = answerMatch[1];
      currentAnswer = answerMatch[2];
    } else if (currentAnswerId && line.trim() !== '') {
      // Multiline answer
      currentAnswer += ' ' + line.trim();
    } else if (currentQuestion && line.trim() !== '') {
      // Multiline question
      currentQuestion.question += ' ' + line.trim();
    }
  }
  // Push last answer and question
  if (currentAnswerId && currentQuestion) {
    currentQuestion.answers[currentAnswerId] = currentAnswer;
  }
  if (currentQuestion) {
    questions.push(currentQuestion);
  }
  return questions;
}

function convertToJson() {
  let content = fs.readFileSync(outputPath, 'utf8');
  const lines = content.split(/\r?\n/);
  const questions = parseQuestionsAndAnswers(lines);
  fs.writeFileSync(jsonPath, JSON.stringify(questions, null, 2), 'utf8');
  console.log('File converted to JSON and overwritten.');
}

cleanFile();
convertToJson();
