import fs from "node:fs/promises";

console.log(`Day four`);

// const data = await fs.readFile("day04/test-data.txt", {encoding: "utf8"});
const data = await fs.readFile("day04/data.txt", { encoding: "utf8" });


function dayOneAndTwo() {
  let overlaps = 0;
  let partialOverlaps = 0;
  const d = data.split("\n");
  for (const dataSet of d) {
    const [elf1, elf2] = dataSet.split(",");
    const [start1, end1] = elf1.split("-").map((val) => Number(val));
    const [start2, end2] = elf2.split("-").map((val) => Number(val));

    if ((start1 >= start2 && end1 <= end2) || (start1 <= start2 && end1 >= end2)) overlaps++;
    if (end1 >= start2 && end2 >= start1) partialOverlaps++
  }
  return { overlaps, partialOverlaps };
}


const res = dayOneAndTwo();
console.log("Overlaps: " + res.overlaps)
console.log("Partial: " + res.partialOverlaps)
