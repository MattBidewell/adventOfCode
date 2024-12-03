import { getInput } from "../support";

export function run() {
  const testInput = getInput(import.meta.url, "input1");
  const input = getInput(import.meta.url, "input2");

  for (const data of [testInput, input]) {
    console.log("---");
    console.log(part1(data));
    console.log(part2(data));
    console.log("---");
  }
}

function part1(data: string) {
  const mulsRegex = /mul\((\d+),(\d+)\)/g;
  let total = 0;
  let match;
  while ((match = mulsRegex.exec(data)) !== null) {
    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    total += num1 * num2;
  }
  return total;
}

function part2(data: string) {
  const mulsRegex = /(do\(\)|don't\(\))|mul\((\d+),(\d+)\)/g;
  let isEnabled = true;
  let total = 0;
  let match;

  while ((match = mulsRegex.exec(data)) !== null) {
    if (match[1]) {
      isEnabled = match[1] === "do()";
    } else if (match[2] && match[3]) {
      // Match[2] and Match[3] capture the numbers in "mul(x,y)"
      const num1 = parseInt(match[2], 10);
      const num2 = parseInt(match[3], 10);
      if (isEnabled) {
        total += num1 * num2;
      }
    }
  }
  return total;
}
