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

function part1(input: string) {
  const disk: number[] = [];
  let fileId = 0;

  for (const [index, letter] of input.split("").entries()) {
    const dig = parseInt(letter);

    if (isNaN(dig)) {
      // fu line endings
      continue;
    }

    if (index % 2 === 0) {
      disk.push(...Array(dig).fill(fileId));
      fileId++;
    } else {
      disk.push(...Array(dig).fill(-1));
    }
  }

  const blanks: number[] = [];
  for (const [index, value] of disk.entries()) {
    if (value === -1) {
      blanks.push(index);
    }
  }

  for (const blank of blanks) {
    while (disk[disk.length - 1] === -1) {
      disk.pop();
    }
    if (disk.length <= blank) {
      break;
    }
    disk[blank] = disk.pop()!;
  }

  const result = disk.reduce((sum, x, i) => sum + i * x, 0);
  return result;
}
function part2(input: string) {
  return "";
}
