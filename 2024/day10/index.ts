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
  const grid = input
    .split("\n")
    .map((line) => line.split("").map((char) => parseInt(char, 10)));

  const rows = grid.length;
  const cols = grid[0].length;

  // get all start points
  const startPoints: number[][] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 0) {
        startPoints.push([i, j]);
      }
    }
  }

  const total = startPoints.reduce(
    (sum, [r, c]) => sum + search(grid, r, c),
    0
  );

  return total;
}

function search(grid: number[][], x: number, y: number): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const q: [number, number][] = [[x, y]];
  const seen = new Set<string>();
  seen.add(`${x},${y}`);
  let total = 0;

  while (q.length > 0) {
    const [cr, cc] = q.shift()!;
    for (const [dr, dc] of [
      [-1, 0], // left
      [0, 1], // up
      [1, 0], // right
      [0, -1], // down
    ]) {
      const nr = cr + dr;
      const nc = cc + dc;

      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (grid[nr][nc] !== grid[cr][cc] + 1) continue;

      const key = `${nr},${nc}`;

      if (seen.has(key)) {
        continue;
      }

      seen.add(key);

      if (grid[nr][nc] === 9) {
        total++;
      } else {
        q.push([nr, nc]);
      }
    }
  }
  return total;
}

function part2(input: string) {
  const grid = input
    .split("\n")
    .map((line) => line.split("").map((char) => parseInt(char, 10)));

  const rows = grid.length;
  const cols = grid[0].length;

  // get all start points
  const startPoints: number[][] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 0) {
        startPoints.push([i, j]);
      }
    }
  }

  const total = startPoints.reduce(
    (sum, [r, c]) => sum + searchP2(grid, r, c),
    0
  );

  return total;
}

function searchP2(grid: number[][], x: number, y: number): number {
  const rows = grid.length;
  const cols = grid[0].length;

  const q: [number, number][] = [[x, y]];
  const seen: Map<string, number> = new Map();

  seen.set(`${x},${y}`, 1);
  let total = 0;

  while (q.length > 0) {
    const [cr, cc] = q.shift()!;

    if (grid[cr][cc] === 9) {
      total += seen.get(`${cr},${cc}`)!;
    }

    for (const [dr, dc] of [
      [-1, 0], // left
      [0, 1], // up
      [1, 0], // right
      [0, -1], // down
    ]) {
      const nr = cr + dr;
      const nc = cc + dc;

      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (grid[nr][nc] !== grid[cr][cc] + 1) continue;

      const key = `${nr},${nc}`;
      if (seen.has(key)) {
        seen.set(key, seen.get(key)! + seen.get(`${cr},${cc}`)!);
        continue;
      }

      seen.set(key, seen.get(`${cr},${cc}`)!);
      q.push([nr, nc]);
    }
  }
  return total;
}
