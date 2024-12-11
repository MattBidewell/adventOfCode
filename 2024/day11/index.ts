import { getInput } from "../support";

export function run() {
  const testInput = getInput(import.meta.url, "input1");
  const input = getInput(import.meta.url, "input2");

  for (const data of [testInput, input]) {
    console.log("---");
    // start timer
    console.time("part1");
    console.log(part1(data));
    console.timeEnd("part1");
    console.time("part2");
    console.log(part2(data));
    console.timeEnd("part2");
    console.log("---");
  }
}

function part1(input: string) {
  let stones = input.split(" ").map((x) => parseInt(x, 10));

  for (let i = 0; i < 25; i++) {
    const output: number[] = [];
    for (const stone of stones) {
      if (stone === 0) {
        output.push(1);
        continue;
      }

      const stringStone = stone.toString();
      const length = stringStone.length;

      if (length % 2 === 0) {
        output.push(parseInt(stringStone.slice(0, length / 2), 10));
        output.push(parseInt(stringStone.slice(length / 2), 10));
      } else {
        output.push(stone * 2024);
      }
    }
    stones = output;
  }

  return stones.length;
}

const cache = new Map<string, number>();
function part2(input: string) {
  const stones = input.split(" ").map((x) => parseInt(x, 10));
  const total = stones.reduce((sum, stone) => sum + count(stone, 75), 0);
  return total;
}

function count(stone: number, steps: number): number {
  const key = `${stone},${steps}`;
  if (cache.has(key)) {
    return cache.get(key)!;
  }

  if (steps === 0) {
    return 1;
  }

  let result: number;

  if (stone === 0) {
    result = count(1, steps - 1);
  } else {
    const stringStone = stone.toString();
    const length = stringStone.length;

    if (length % 2 === 0) {
      result =
        count(parseInt(stringStone.slice(0, length / 2), 10), steps - 1) +
        count(parseInt(stringStone.slice(length / 2), 10), steps - 1);
    } else {
      result = count(stone * 2024, steps - 1);
    }
  }

  cache.set(key, result);
  return result;
}
