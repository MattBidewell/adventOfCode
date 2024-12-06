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
// If there is something directly in front of you, turn right 90 degrees.
// Otherwise, take a step forward.

const directionMap = {
  "^": {
    move: [-1, 0],
    newDirection: ">",
  },
  ">": {
    move: [0, 1],
    newDirection: "v",
  },
  v: {
    move: [1, 0],
    newDirection: "<",
  },
  "<": {
    move: [0, -1],
    newDirection: "^",
  },
} as const;

function nextPosition(
  curr: number[],
  map: string[],
  direction: keyof typeof directionMap
) {
  // const direction = map[curr[0]][curr[1]] as keyof typeof directionMap; // TS can be a pain sometimes
  const newx = curr[0] + directionMap[direction].move[0];
  const newy = curr[1] + directionMap[direction].move[1];
  if (newx < 0 || newx >= map.length || newy < 0 || newy >= map[0].length) {
    return null;
  }
  return [newx, newy];
}

function part1(input: string) {
  const grid = input.split("\n").filter((x) => x.length > 0);

  let currentPosition = [];
  let currentDirection = "^" as keyof typeof directionMap;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === currentDirection) {
        currentPosition.push(i, j);
      }
    }
  }

  let steps = 1;

  while (nextPosition(currentPosition, grid, currentDirection) !== null) {
    let [newx, newy] = nextPosition(
      currentPosition,
      grid,
      currentDirection
    ) as number[];

    if (grid[newx][newy] === "#") {
      currentDirection =
        directionMap[currentDirection as keyof typeof directionMap]
          .newDirection;

      [newx, newy] = nextPosition(
        currentPosition,
        grid,
        currentDirection
      ) as number[];
    }

    if (grid[newx][newy] !== "X") steps++;

    // mark as visited
    grid[newx] = grid[newx].slice(0, newy) + "X" + grid[newx].slice(newy + 1);

    // console.log(grid.join("\n"));
    // console.log("\n");

    currentPosition = [newx, newy];
  }

  return steps;
}

function part2(input: string[]) {
  return "";
}
