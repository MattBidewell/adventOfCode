import fs from "node:fs/promises";

console.log(`Day three`);

// const data = await fs.readFile("day03/test-data.txt", {encoding: "utf8"});
const data = await fs.readFile("day03/data.txt", { encoding: "utf8" });

const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function partOne() {
  let total = 0;
  const dataSet = data.split("\n")
  for (const line of dataSet) {
    const mid = line.length / 2;
    const [s1, s2] = [line.slice(0, mid), line.slice(mid)];
    for (const letter of s1) {
      if (s2.indexOf(letter) !== -1) {
        total = total + characters.indexOf(letter) + 1;
        break;
      }
    }
  }
  return total;
}

function partTwo() {
  let total = 0;
  const dataSet = data.split("\n");
  for (let i = 0; i < dataSet.length; i = i + 3) {
    const line1 = dataSet[i];
    const line2 = dataSet[i + 1];
    const line3 = dataSet[i + 2];

    for (const l of line1) {
      if (line2.includes(l) && line3.includes(l)) {
        total = total + characters.indexOf(l) + 1;
        break;
      }
    }
  }
  return total;
}

const p1 = partOne();
console.log(`Part one: ${p1}`);
const p2 = partTwo();
console.log(`Part two: ${p2}`);

