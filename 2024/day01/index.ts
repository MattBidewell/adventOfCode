
import { getInput } from "../support";


export function run() {
  const testInput = getInput(import.meta.url, 'test-input');
  const input = getInput(import.meta.url, 'input');

  for (const data of [testInput, input]) {
    console.log('---');
    console.log(part1(data));
    console.log(part2(data));
    console.log('---');
  }
}

function part1(data: string) {
  const lines = data.split('\n');
  const numbers = lines.map((val) => val.split('   ').map((num) => Number(num)));
  const left: number[] = [], right: number[] = [];
  numbers.forEach((line) => {
    left.push(line[0]);
    right.push(line[1]);
  });

  left.sort();
  right.sort();

  const totalDifference = left.reduce((acc, val, index) => {
    return acc + Math.abs((val - right[index]));
  }, 0);

  return totalDifference;
}

function part2(data: string) {
  const lines = data.split('\n');
  const numbers = lines.map((val) => val.split('   ').map((num) => Number(num)));
  const left: number[] = [], right: number[] = [];
  numbers.forEach((line) => {
    left.push(line[0]);
    right.push(line[1]);
  });

  const totalSimilar = left.reduce((acc, val) => {
    const count = right.filter((num) => num === val).length;
    const simVal = val * count;
    return acc += simVal;
  }, 0);

  return totalSimilar;
}
