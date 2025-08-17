#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Converts IHF answers text file to JSON format
 * @param {string} inputFilePath - Path to the input text file
 * @param {string} outputFilePath - Path to the output JSON file
 */
function convertAnswersToJson(inputFilePath, outputFilePath) {
  try {
    // Read the text file
    const content = fs.readFileSync(inputFilePath, 'utf8');

    // Split into lines and filter out empty lines and comments
    const lines = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('//'));

    const answers = [];

    for (const line of lines) {
      // Parse each line using regex to extract components
      // Format: "1.1)       a        1:1"
      // Format: "2.4)       a, c, e  2:5, 4:5, 16:3a"
      // Format: "SAR1)      d        Substitution Area Regulations 1"
      const match = line.match(/^((?:\d+\.\d+)|(?:SAR\d+))\)\s+([a-k,\s]+)\s+(.+)$/);

      if (match) {
        const [, id, correctAnswers, rules] = match;

        // Parse correct answers - split by comma and clean up
        const correct = correctAnswers
          .split(',')
          .map(answer => answer.trim())
          .filter(answer => answer.match(/^[a-k]$/));

        // Parse rules - split by comma and clean up
        const rule = rules
          .split(',')
          .map(r => r.trim())
          .filter(r => r);

        answers.push({
          id,
          correct,
          rule
        });
      }
    }

    // Write to JSON file with proper formatting
    fs.writeFileSync(outputFilePath, JSON.stringify(answers, null, 2), 'utf8');

    console.log(`✅ Successfully converted ${answers.length} answers from ${inputFilePath} to ${outputFilePath}`);

    // Display a preview of the converted data
    console.log('\n📋 Preview of converted data:');
    answers.slice(0, 3).forEach(answer => {
      console.log(`  ${answer.id}: ${answer.correct.join(', ')} -> ${answer.rule.join(', ')}`);
    });
    if (answers.length > 3) {
      console.log(`  ... and ${answers.length - 3} more`);
    }

  } catch (error) {
    console.error('❌ Error converting answers:', error.message);
    process.exit(1);
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('📖 Usage: node convert_answers_to_json.js <input-text-file> [output-json-file]');
    console.log('');
    console.log('Examples:');
    console.log('  node convert_answers_to_json.js "QCM IHF ENG July 2025 Answers.txt"');
    console.log('  node convert_answers_to_json.js "QCM IHF ENG July 2025 Answers.txt" answers.json');
    process.exit(1);
  }

  const inputFile = args[0];
  const outputFile = args[1] || 'answers.json';

  // Resolve paths
  const inputPath = path.resolve(inputFile);
  const outputPath = path.resolve(outputFile);

  // Check if input file exists
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Input file not found: ${inputPath}`);
    process.exit(1);
  }

  console.log(`🔄 Converting answers from text to JSON...`);
  console.log(`📄 Input:  ${inputPath}`);
  console.log(`📄 Output: ${outputPath}`);
  console.log('');

  convertAnswersToJson(inputPath, outputPath);
}

module.exports = { convertAnswersToJson };
