import fs from "node:fs/promises";

console.log(`Day one`);

// const data = await fs.readFile("day01/test-data.txt", {encoding: "utf8"});
const data = await fs.readFile("day01/data.txt", {encoding: "utf8"});

function partOne() {
  const dataSet = data.split("\n\n").map((set) => {
    const vals = set.split("\n");
    const total = vals.reduce((acc, val) => Number(acc) + Number(val), 0)
    return total;
  });
  return dataSet;
}
const p1 = partOne();
console.log(`Max Value - ${Math.max(...p1)}`);

function partTwo(): number[] {
  const sortedData = mergeSort(p1);
  return sortedData;
}


function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const sorted = merge(left, right);
  return sorted;
}


function merge(left: number[], right: number[]): number[] {
  let sortedArr: number[] = []; // sorted items here.

  while(left.length && right.length) {
    if(left[0] < right[0]) {
      sortedArr.push(left.shift() as number)
    } else {
      sortedArr.push(right.shift() as number)
    }
  }
  return [...sortedArr, ...left, ...right]
}

const p2 = partTwo();
console.log(`Max Values - ${p2.slice(p2.length - 3).reduce((acc, val) => acc+val, 0)}`);