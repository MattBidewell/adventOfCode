
import fs from "node:fs/promises";

console.log(`Day ten`);

// const data = await fs.readFile("day10/test-data.txt", {encoding: "utf8"});
const data = await fs.readFile("day10/data.txt", { encoding: "utf8" });

const lines = data.split("\n");

const keyCyclePoints = [
  {value:0, cycle:20},
  {value:0, cycle:60},
  {value:0, cycle:100},
  {value:0, cycle:140},
  {value:0, cycle:180},
  {value:0, cycle:220}
];

const crtScreen = new Array(keyCyclePoints.length);
crtScreen.forEach((line) => line=new Array(40).fill("."));

let cycle = 0;
let x = 1;
// const queuedInstructions = [];
function partOne() {
  // 20th, 60th, 100th, 140th, 180th, and 220th cycles

  while(lines.length > 0) {
    const instruction = `${lines.shift()}`.split(" ");
    if(instruction[0] === "noop") {
      incrementCycle();
      continue;
    } else if(instruction[0] === "addx") {
      incrementCycle();
      incrementCycle();
      x = x + parseInt(instruction[1])
    }
  }
  return keyCyclePoints.reduce((prev, curr) => prev + curr.value, 0);
}

function incrementCycle() {
  cycle++;

  const cycleIndex = keyCyclePoints.findIndex((kcp: any) => kcp.cycle === cycle);
  const crtIndex = keyCyclePoints.findIndex((kcp: any) => kcp.cycle-1 === cycle);

  renderSprite(crtIndex);


  if(cycleIndex !== -1) {
    keyCyclePoints[cycleIndex].value = cycle * x;
  }
}

function renderSprite(index: number) {
  const litPixel = "#";
  crtScreen[index][x] = litPixel;
  // pixels[x] = litPixel;
  // console.log(pixels.join(""));
}

console.log(crtScreen.map((line) => line.join("")).join("\n"));

console.log(partOne());