const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

const regex = RegExp(/(\d+)/, "gd");

// const allNumbers =
type Result = [number, [number, number]];
const allNumbers: Result[][] = lines.map((line) =>
  Array.from(
    line.matchAll(regex),
    (match) =>
      [Number(match[0]), [
        match.indices![0][0],
        match.indices![0][1] - 1,
      ]] as Result,
  )
);
// result = [756, [0, 2]] (inclusive indices)

// anything not a number or a dot is a symbol
const isSymbol = (char: string) => char !== "." && isNaN(parseInt(char));

function process(lines: string[], allNumbers: Result[][], debug = false) {
  const partNumbers: number[] = [];

  for (let i = 0; i < allNumbers.length; i++) {
    for (let j = 0; j < allNumbers[i].length; j++) {
      const [possibleNumber, indices] = allNumbers[i][j];
      const [start, end] = indices;
      const adjustedStart = Math.max(start - 1, 0);
      const adjustedEnd = Math.min(end + 1, lines[i].length - 1);
      if (possibleNumber === 522 && debug) {
        console.log("==== 522 ==== " + end + "," + adjustedEnd);
        console.log("====" + lines[i][end] + "," + lines[i][adjustedEnd]);
      }
      const adjustedTop = Math.max(i - 1, 0);
      const adjustedBottom = Math.min(i + 1, lines.length - 1);
      if (debug) {
        console.log(
          `${lines[adjustedTop].slice(adjustedStart, adjustedEnd + 1)}\n${
            lines[i].slice(adjustedStart, adjustedEnd + 1)
          }\n${lines[adjustedBottom].slice(adjustedStart, adjustedEnd + 1)}`,
        );
      }
      //check left
      if (isSymbol(lines[i][adjustedStart])) {
        partNumbers.push(possibleNumber);
        debug && console.log("✅");
        continue;
      }
      // check right
      if (isSymbol(lines[i][adjustedEnd])) {
        partNumbers.push(possibleNumber);
        debug && console.log("✅");
        continue;
      }
      if (i !== 0) {
        // check start-1, end+1 on line above
        if (
          Array.from(lines[i - 1].slice(adjustedStart, adjustedEnd + 1)).some(
            isSymbol,
          )
        ) {
          partNumbers.push(possibleNumber);
          debug && console.log("✅");
          continue;
        }
      }

      if (i !== allNumbers.length - 1) {
        // check start-1, end+1 on line below
        if (
          Array.from(lines[i + 1].slice(adjustedStart, adjustedEnd + 1)).some(
            isSymbol,
          )
        ) {
          partNumbers.push(possibleNumber);
          debug && console.log("✅");
          continue;
        }
      }
      debug && console.log("❌");
    }
  }
  return partNumbers;
}

const result = process(lines, allNumbers);
console.log("sum " + result.reduce((a, b) => a + b, 0));

const gearRegex = RegExp(/\*/, "g");
const potentialGears = lines.map((line) =>
  Array.from(line.matchAll(gearRegex), (match) => match.index)
);
console.log(potentialGears);

// TODO finish step 2
