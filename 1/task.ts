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

// Part 2
function processLine(line: string): number {
  const regex = /(\d).*(\d)/;
  const res = regex.exec(line);
  if (res) {
    const [_, a, b] = res;
    const num = parseInt(`${a}${b}`);
    console.log(`${line} -> ${num}`);
    return num;
  }
  const backupRegex = /(\d)/;
  const backupRes = backupRegex.exec(line);
  if (backupRes) {
    const [_, a] = backupRes;
    const num = parseInt(`${a}${a}`);
    console.log(`${line} -> ${num}`);
    return num;
  }
  throw new Error(`Error processing line:` + line);
}

// Part 3
const lines = readFile(filePath);
const nums = lines.map(processLine);
const sum = nums.reduce((a, b) => a + b, 0);
console.log(`Sum: ${sum}`);
