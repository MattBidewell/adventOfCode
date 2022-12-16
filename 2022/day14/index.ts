import fs from "node:fs/promises";

console.log(`Day fourteen`);

// const data = await fs.readFile("day14/test-data.txt", {encoding: "utf8"});
const data = await fs.readFile("day14/data.txt", { encoding: "utf8" });
const lines = data.split("\n");

function partOne() {

  // we use the min and max to normalise the x,y to make them more manageable
  let maxY: number = 0; // test - 9
  let minY: number = -1;
  let maxX: number = 0; // test - 503
  let minX: number = -1;

  const rockFormations = lines.map((line) => {
    return line.split("->")
      .map((v) => v.trim())
      .map((step) => {
        const [x, y] = step.split(",").map((v) => parseInt(v));
        maxY = maxY < y ? y : maxY;
        maxX = maxX < x ? x : maxX;
        minY = minY > y || minY === -1 ? y : minY;
        minX = minX > x || minX === -1 ? x : minX;
        return [x, y];
      });
  });

  const grid = new Array(maxY + 1);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(maxX - minX + 1).fill(".");
  }

  for (const rockFormation of rockFormations) {
    const [startX, startY] = rockFormation.shift() as number[];
    grid[startY][startX - minX] = "#";
    let currX = startX;
    let currY = startY;
    for (const rock of rockFormation) {
      const [x, y] = rock;
      while (currX !== x) {
        if (currX > x) currX--;
        if (currX < x) currX++
        grid[y][currX - minX] = "#";
      }
      while (currY !== y) {
        if (currY > y) currY--;
        if (currY < y) currY++
        grid[currY][x - minX] = "#";
      }
    }
  }

  const sandStartPoint = 500 - minX;
  let grains = 0;
  while(true) {
    // grid[0][sandStartPoint] = "O";
    let nextX = sandStartPoint;
    let nextY = 0;
    let settled = false;

    while (!settled) {
      if (nextY < 0 || nextX < 0 || nextY > grid.length - 1 || nextX > grid[0].length - 1) {
        return grains;
      }
      if (grid[nextY][nextX] === ".") {
        nextY++;
        continue;
      }

      if (grid[nextY][nextX - 1] === ".") {
        nextX--;
        continue;
      } else if (grid[nextY][nextX + 1] === ".") {
        nextX++;
        continue
      } else {
        grid[nextY - 1][nextX] = "O";
        settled = true;
        grains++;
      }
    }
  }

  console.table(grid);
  return grains - 1;
}

function partTwo() {
  return 0;
}

console.log(partOne());
console.log(partTwo());