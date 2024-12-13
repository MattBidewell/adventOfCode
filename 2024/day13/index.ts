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

function part1(input: string) {
  const groups = input.trim().split("\n\n");
  let total = 0;

  for (const group of groups) {
    const matches = group.match(/\d+/g)?.map(Number);

    if (!matches) continue;

    const [ax, ay, bx, by, px, py] = matches;

    const denominator = ax * by - ay * bx;
    if (denominator === 0) continue;

    const ca = (px * by - py * bx) / denominator;
    const cb = (px - ax * ca) / bx;

    if (
      Number.isInteger(ca) &&
      Number.isInteger(cb) &&
      ca <= 100 &&
      cb <= 100
    ) {
      total += ca * 3 + cb;
    }
  }

  return total;
}

function part2(input: string) {
  const groups = input.trim().split("\n\n");
  let total = 0;

  for (const group of groups) {
    const matches = group.match(/\d+/g)?.map(Number);

    if (!matches) continue;

    let [ax, ay, bx, by, px, py] = matches;

    px += 10000000000000;
    py += 10000000000000;

    const ca = (px * by - py * bx) / (ax * by - ay * bx);
    const cb = (px - ax * ca) / bx;

    if (ca % 1 === 0 && cb % 1 === 0) {
      total += ca * 3 + cb;
    }
  }

  return total;
}
