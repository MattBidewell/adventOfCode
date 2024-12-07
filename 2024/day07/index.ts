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

function evaluateP1(target: number, nums: number[]): any {
  // final number fits into target.
  if (nums.length === 1) return target === nums[0];

  const lastElement = nums[nums.length - 1];
  const restArray = nums.slice(0, -1);

  // Check division condition (we can still multiple into the total)
  if (
    target % lastElement === 0 &&
    evaluateP1(target / lastElement, restArray)
  ) {
    return true;
  }

  // Check subtraction condition (we can still add into the total)
  if (target > lastElement && evaluateP1(target - lastElement, restArray)) {
    return true;
  }

  return false;
}

function part1(input: string) {
  const data = input
    .split("\n")
    .filter((x) => x.length > 0)
    .map((line) => {
      const [total, rest] = line.split(": ");
      const nums = rest.split(" ");
      return {
        total: parseInt(total),
        nums: nums.map((x) => parseInt(x)),
      };
    });

  const validEquations = data.filter((eq) => evaluateP1(eq.total, eq.nums));
  const total = validEquations.reduce((acc, eq) => acc + eq.total, 0);
  return total;
}

function evaluatp2(target: number, array: number[]): boolean {
  if (array.length === 1) return target === array[0];

  const lastElement = array[array.length - 1];
  const restArray = array.slice(0, -1);

  // Check *
  if (
    target % lastElement === 0 &&
    evaluatp2(Math.floor(target / lastElement), restArray)
  ) {
    return true;
  }

  // Check +
  if (target > lastElement && evaluatp2(target - lastElement, restArray)) {
    return true;
  }

  // Check ||
  const sTarget = target.toString();
  const sLast = lastElement.toString();
  if (
    sTarget.endsWith(sLast) &&
    sTarget.length > sLast.length &&
    p2(parseInt(sTarget.slice(0, -sLast.length), 10), restArray)
  ) {
    return true;
  }

  return false;
}

function part2(input: string) {
  const data = input
    .split("\n")
    .filter((x) => x.length > 0)
    .map((line) => {
      const [total, rest] = line.split(": ");
      const nums = rest.split(" ");
      return {
        total: parseInt(total),
        nums: nums.map((x) => parseInt(x)),
      };
    });

  const validEquations = data.filter((eq) => evaluatp2(eq.total, eq.nums));
  const total = validEquations.reduce((acc, eq) => acc + eq.total, 0);
  return total;
}
