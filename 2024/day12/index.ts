import { getInput } from "../support";

export function run() {
  const testInput = getInput(import.meta.url, "input1");
  const input = getInput(import.meta.url, "input2");

  for (const data of [testInput, input]) {
    console.log("---");
    console.time("part1");
    console.log(part1(data));
    console.timeEnd("part1");
    console.time("part2");
    console.log(part2(data));
    console.timeEnd("part2");
    console.log("---");
  }
}

type Coordinate = [number, number];

function serialize(r: number, c: number): string {
  return `${r},${c}`;
}

function deserialize(coord: string): Coordinate {
  return coord.split(",").map(Number) as Coordinate;
}

function part1(input: string) {
  const grid: string[][] = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  const rows = grid.length;
  const cols = grid[0].length;

  const regions: Set<string>[] = [];
  const seen = new Set<string>();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = serialize(r, c);
      if (seen.has(key)) continue;

      seen.add(key);

      const region = new Set<string>([key]);
      const queue: Coordinate[] = [[r, c]];
      const crop = grid[r][c];

      while (queue.length > 0) {
        const [curRow, curCol] = queue.shift()!;
        const neighbors: Coordinate[] = [
          [curRow - 1, curCol],
          [curRow + 1, curCol],
          [curRow, curCol - 1],
          [curRow, curCol + 1],
        ];

        for (const [neighbourRow, neighbourCol] of neighbors) {
          if (
            neighbourRow < 0 ||
            neighbourCol < 0 ||
            neighbourRow >= rows ||
            neighbourCol >= cols
          )
            continue;
          if (grid[neighbourRow][neighbourCol] !== crop) continue;

          const neighborKey = serialize(neighbourRow, neighbourCol);
          if (region.has(neighborKey)) continue;

          region.add(neighborKey);
          queue.push([neighbourRow, neighbourCol]);
        }
      }

      for (const coord of region) {
        seen.add(coord);
      }
      regions.push(region);
    }
  }

  const result = regions.reduce((sum, region) => {
    return sum + region.size * perimeter(region);
  }, 0);

  return result;
}

function perimeter(region: Set<string>): number {
  let output = 0;

  for (const coord of region) {
    const [r, c] = deserialize(coord);
    output += 4;

    const neighbors: Coordinate[] = [
      [r + 1, c],
      [r - 1, c],
      [r, c - 1],
      [r, c + 1],
    ];

    for (const [nr, nc] of neighbors) {
      if (region.has(serialize(nr, nc))) {
        output -= 1;
      }
    }
  }

  return output;
}

function sides(region: Set<string>): number {
  const cornerCandidates = new Set<string>();

  for (const coord of region) {
    const [r, c] = deserialize(coord);
    const corners = [
      [r - 0.5, c - 0.5],
      [r + 0.5, c - 0.5],
      [r + 0.5, c + 0.5],
      [r - 0.5, c + 0.5],
    ];

    for (const [cr, cc] of corners) {
      cornerCandidates.add(serialize(cr, cc));
    }
  }

  let cornersCount = 0;
  for (const candidate of cornerCandidates) {
    const [cr, cc] = deserialize(candidate);

    const config = [
      serialize(cr - 0.5, cc - 0.5),
      serialize(cr + 0.5, cc - 0.5),
      serialize(cr + 0.5, cc + 0.5),
      serialize(cr - 0.5, cc + 0.5),
    ].map((coord) => region.has(coord));

    const number = config.filter(Boolean).length;

    if (number === 1) {
      cornersCount += 1;
    } else if (number === 2) {
      if (
        (config[0] && config[2] && !config[1] && !config[3]) ||
        (config[1] && config[3] && !config[0] && !config[2])
      ) {
        cornersCount += 2;
      }
    } else if (number === 3) {
      cornersCount += 1;
    }
  }

  return cornersCount;
}

function part2(input: string) {
  const grid: string[][] = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  const rows = grid.length;
  const cols = grid[0].length;

  type Coordinate = [number, number];
  const regions: Set<string>[] = [];
  const seen = new Set<string>();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = serialize(r, c);
      if (seen.has(key)) continue;

      seen.add(key);
      const region = new Set<string>([key]);
      const queue: Coordinate[] = [[r, c]];
      const crop = grid[r][c];

      while (queue.length > 0) {
        const [cr, cc] = queue.shift()!;
        const neighbors: Coordinate[] = [
          [cr - 1, cc],
          [cr + 1, cc],
          [cr, cc - 1],
          [cr, cc + 1],
        ];

        for (const [nr, nc] of neighbors) {
          if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
          if (grid[nr][nc] !== crop) continue;
          const neighborKey = serialize(nr, nc);
          if (region.has(neighborKey)) continue;

          region.add(neighborKey);
          queue.push([nr, nc]);
        }
      }

      for (const coord of region) {
        seen.add(coord);
      }
      regions.push(region);
    }
  }

  const result = regions.reduce((sum, region) => {
    return sum + region.size * sides(region);
  }, 0);
  return result;
}
