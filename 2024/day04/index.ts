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
  const data = input.split("\n").filter((x) => x);

  let count = 0;
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[row].length; col++) {
      if (data[row][col] !== "X") continue;
      // const directions = [
      // [-1, 0], // left
      // [0, 1], // right
      // [1, 1], // right down
      // [1, 0], // down
      // [1, -1], // left down
      // [0, -1], // left
      // [-1, -1], // left up
      // ];
      // for (const [dr, dc] of directions) {
      for (const dr of [-1, 0, 1]) {
        for (const dc of [-1, 0, 1]) {
          if (dr === 0 && dc === 0) continue; // skip the current cell
          const maxX = row + 3 * dr;
          const maxY = col + 3 * dc;
          if (maxX < 0 || maxX >= data.length) continue;
          if (maxY < 0 || maxY >= data[row].length) continue;
          if (
            data[row + dr][col + dc] === "M" &&
            data[row + 2 * dr][col + 2 * dc] === "A" &&
            data[row + 3 * dr][col + 3 * dc] === "S"
          ) {
            count++;
          }
        }
      }
    }
  }

  return count;
}

function part2(input: string) {
  const data = input.split("\n").filter((x) => x);

  let count = 0;
  for (let row = 1; row < data.length - 1; row++) {
    for (let col = 1; col < data[row].length - 1; col++) {
      if (data[row][col] !== "A") continue;
      // top left clockwise round the X
      // means the letters can only ever be mmss,mssm,ssmm, smms
      const edges = [
        data[row - 1][col - 1],
        data[row - 1][col + 1],
        data[row + 1][col + 1],
        data[row + 1][col - 1],
      ];

      const valid = ["MMSS", "MSSM", "SSMM", "SMMS"];
      const edgeStr = edges.join("");
      if (!valid.includes(edgeStr)) continue;
      count++;
    }
  }

  return count;
}
