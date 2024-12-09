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
    const digit = parseInt(letter);

    if (isNaN(digit)) {
      // fu line endings
      continue;
    }

    if (index % 2 === 0) {
      disk.push(...Array(digit).fill(fileId));
      fileId++;
    } else {
      disk.push(...Array(digit).fill(-1));
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

export function part2(input: string): number {
  const files: Record<number, [number, number]> = {}; // Map of file ID to [start position, size]
  let blanks: [number, number][] = []; // List of blanks as [start position, length]
  let fid = 0;
  let pos = 0;

  for (const [index, letter] of input.split("").entries()) {
    const digit = parseInt(letter, 10);

    if (isNaN(digit)) {
      //fu line endings
      continue;
    }

    if (index % 2 === 0) {
      files[fid] = [pos, digit];
      fid++;
    } else {
      if (digit !== 0) {
        blanks.push([pos, digit]);
      }
    }

    pos += digit;
  }

  while (fid > 0) {
    fid--;
    const [filePos, fileSize] = files[fid];

    for (let i = 0; i < blanks.length; i++) {
      const [blankStart, blankLength] = blanks[i];

      if (blankStart >= filePos) {
        // Remove blanks that occur after the file position
        blanks = blanks.slice(0, i);
        break;
      }

      if (fileSize <= blankLength) {
        files[fid] = [blankStart, fileSize];

        if (fileSize === blankLength) {
          blanks.splice(i, 1);
        } else {
          blanks[i] = [blankStart + fileSize, blankLength - fileSize];
        }
        break;
      }
    }
  }

  let total = 0;
  for (const fid in files) {
    const [filePos, fileSize] = files[parseInt(fid, 10)];
    for (let x = filePos; x < filePos + fileSize; x++) {
      total += parseInt(fid, 10) * x;
    }
  }

  return total;
}
