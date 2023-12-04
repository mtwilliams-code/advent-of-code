const filePath = "/Users/mtwilliams/Codebase/advent-of-code/1/input.txt";

// Part 1
function readFile(filePath: string): string[] {
  let lines: string[] = [];
  try {
    const data = Deno.readTextFileSync(filePath);
    lines = lines.concat(data.split("\n"));
  } catch (error) {
    console.error("Error reading file:", error);
  }
  return lines;
}

// Mapping of spelled-out numbers to numeric equivalents
const numberWords: { [key: string]: number } = {
  "zero": 0,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
};

// Convert a word or digit to a number
function wordToNumber(word: string): number {
  if (!isNaN(Number(word))) {
    return Number(word);
  } else if (numberWords[word.toLowerCase()] !== undefined) {
    return numberWords[word.toLowerCase()];
  }
  throw new Error(`Unrecognized number: ${word}`);
}

// Updated processLine function
function processLine(line: string): number {
  // Regex to match a digit or any of the spelled-out numbers
  const regex = new RegExp(
    `(\\d|${Object.keys(numberWords).join("|")}).*(\\d|${
      Object.keys(numberWords).join("|")
    })`,
    "i",
  );
  const res = regex.exec(line);
  if (res) {
    const [_, a, b] = res;
    const numA = wordToNumber(a);
    const numB = wordToNumber(b);
    const num = parseInt(`${numA}${numB}`);
    console.log(`${line} -> ${num}`);
    return num;
  }
  const backupRegex = new RegExp(
    `(\\d|${Object.keys(numberWords).join("|")})`,
    "i",
  );
  const backupRes = backupRegex.exec(line);
  if (backupRes) {
    const [_, a] = backupRes;
    const numA = wordToNumber(a);
    const num = parseInt(`${numA}${numA}`);
    console.log(`${line} -> ${num}`);
    return num;
  }
  throw new Error(`Error processing line:` + line);
}

// Reading and processing the file
const lines = readFile(filePath);
const nums = lines.map(processLine);
const sum = nums.reduce((a, b) => a + b, 0);
console.log(`Sum: ${sum}`);
