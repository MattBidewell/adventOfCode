import fs from 'fs/promises';

console.log('Day one');

// const data = await fs.readFile('day01/data.test.txt', { encoding: 'utf8' });
const data = await fs.readFile('day01/data.txt', { encoding: 'utf8' });

const lines = data.split('\n');

const sum1 = lines.map((line) => {
  const digits = line.replace(/\D/g, "");
  return digits[0] + digits[digits.length - 1];
}).reduce((a, b) => a + +b, 0);

console.log(`part one: ${sum1}`);

/// part two
const data2 = await fs.readFile('day01/data.txt', { encoding: 'utf8' });

const lines2 = sanitize(data2).split('\n');

const sum2 = lines2.map((line) => {
  const digits = line.replace(/\D/g, "");
  return digits[0] + digits[digits.length - 1];
}).reduce((a, b) => a + +b, 0);

console.log(`part two: ${sum2}`);

function sanitize(str: string): string {
  return str
    .replace(/one/g, "o1e")
    .replace(/two/g, "t2o")
    .replace(/three/g, "th3ee")
    .replace(/four/g, "fo4ur")
    .replace(/five/g, "fi5ve")
    .replace(/six/g, "s6x")
    .replace(/seven/g, "se7en")
    .replace(/eight/g, "ei8th")
    .replace(/nine/g, "ni9ne");
}