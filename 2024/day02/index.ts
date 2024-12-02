import { error } from "console";
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

function checkReport(levels: number[]) {
  const increasing = levels[0] < levels[1];
  return levels.every((level, i) => {
    if (i === levels.length - 1) return true;
    const delta = Math.abs(level - levels[i + 1]);
    const stillIncreasing = level < levels[i + 1];
    return delta >= 1 && delta <= 3 && increasing === stillIncreasing;
  });
};

function part1(data: string) {
  const lines = data.split("\n");
  const levels = lines.map((val) =>
    val
      .split(" ")
      .map((num) => (num ? Number(num) : null))
      .filter((val) => Number.isInteger(val))
  );

  const safe = levels.filter((val) => checkReport(val as number[])).length;

  return safe;
}

function part2(data: string) {
  const lines = data.split("\n");
  const levels = lines.map((val) =>
    val
      .split(" ")
      .map((num) => (num ? Number(num) : null))
      .filter((val) => Number.isInteger(val))
  );

  const safe = levels.filter(
    (report) =>
      checkReport(report as number[]) ||
      report.some((_, i) => {
        const copy = [...report];
        return checkReport(
          copy.slice(0, i).concat(copy.slice(i + 1)) as number[]
        );
      })
  ).length;

  return safe;
}
