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
  const lines = input.split("\n").filter((line) => line.length > 0);

  // signal type and their positions
  const rows = lines.length;
  const cols = lines[0].length;

  const antennas: Record<string, [number, number][]> = {};

  // Parse the grid and organize antenna positions
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const char = lines[r][c];
      if (char !== ".") {
        if (!antennas[char]) antennas[char] = [];
        antennas[char].push([r, c]);
      }
    }
  }

  const antinodes = new Set<string>();

  // Calculate antinodes for each antenna type
  Object.values(antennas).forEach((array) => {
    for (let i = 0; i < array.length; i++) {
      for (let j = i + 1; j < array.length; j++) {
        const [r1, c1] = array[i];
        const [r2, c2] = array[j];

        // Compute antinodes and add them as unique strings to the set
        const antinode1 = [2 * r1 - r2, 2 * c1 - c2];
        const antinode2 = [2 * r2 - r1, 2 * c2 - c1];

        antinodes.add(antinode1.join(","));
        antinodes.add(antinode2.join(","));
      }
    }
  });

  const validAntinodes = Array.from(antinodes).filter((coord) => {
    const [r, c] = coord.split(",").map(Number);
    return r >= 0 && r < rows && c >= 0 && c < cols;
  });

  return validAntinodes.length;
}

function part2(input: string) {
  const lines = input.split("\n").filter((line) => line.length > 0);

  // signal type and their positions
  const rows = lines.length;
  const cols = lines[0].length;

  const antennas: Record<string, [number, number][]> = {};

  // Parse the grid and organize antenna positions
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const char = lines[r][c];
      if (char !== ".") {
        if (!antennas[char]) antennas[char] = [];
        antennas[char].push([r, c]);
      }
    }
  }

  const antinodes = new Set<string>();

  // Calculate antinodes for each antenna type
  Object.values(antennas).forEach((array) => {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if (i === j) continue;

        const [r1, c1] = array[i];
        const [r2, c2] = array[j];
        const dr = r2 - r1;
        const dc = c2 - c1;

        let r = r1;
        let c = c1;

        // Traverse in the direction of (dr, dc)
        while (r >= 0 && r < rows && c >= 0 && c < cols) {
          antinodes.add(`${r},${c}`);
          r += dr;
          c += dc;
        }
      }
    }
  });

  return antinodes.size;
}
