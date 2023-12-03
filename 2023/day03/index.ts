import fs from 'fs/promises';

console.log('Day three');

const scMatch = /[!@#$%^&*()_+={}\[\]:;<>,?~\\/\|`'"-]/
const dMatch = /\d+/

// const data = await fs.readFile('day03/data.test.txt', { encoding: 'utf8' });
const data = await fs.readFile('day03/data.txt', { encoding: 'utf8' });

const coord = new Map();

function checkMap(y: number, x:number) {
  return coord.get(`${y}.${x}`);
}

function run() {
  const lines = data.split('\n');

  let total = 0;
  let digitVal = ''
  let validDigit = false

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const isDig = !!lines[y][x].match(dMatch);
      if (isDig) {
        digitVal += lines[y][x];

        // check neighbours for special characters
        if (
          lines[y]?.[x + 1]?.match(scMatch) ||
          lines[y]?.[x - 1]?.match(scMatch) ||
          lines[y + 1]?.[x]?.match(scMatch) ||
          lines[y - 1]?.[x]?.match(scMatch) ||
          lines[y + 1]?.[x + 1]?.match(scMatch) ||
          lines[y + 1]?.[x - 1]?.match(scMatch) ||
          lines[y - 1]?.[x + 1]?.match(scMatch) ||
          lines[y - 1]?.[x - 1]?.match(scMatch)) {
            validDigit = true
        }
      } else if (validDigit === true && digitVal !== '') {
        total += parseInt(digitVal)
        validDigit = false;
        digitVal = ''
      } else if (validDigit === false) {
        digitVal = ''
      }
    }
  }

  console.log(`Part one: ${total}`);

  // type validcord = { xyStart: number, value: number };
  // let validCoordiates = []


  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {

      // map together all instances of coordinates and total value = eg: {1.3} = 241 | {1.4} = 241
      // will make it easier to extract the value associated with the * next...
      const c = lines[y][x];
      const isDig = !!lines[y][x].match(dMatch);
      if (isDig) {
        let startPoint = `${y}.${x}`;
        let keys = [];
        keys.push(`${y}.${x}`);
        let value = `${lines[y][x]}`
        while (!!lines[y][x + 1]?.match(dMatch)) {
          x++;
          value += lines[y][x]
          keys.push(`${y}.${x}`);
        }
        for (const key of keys) {
          const data = {
            value,
            startPoint
          }
          coord.set(key, data);
        }
      }
    }
  }

  let total2 = 0;

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const c = lines[y][x];
      // we must only see 2 start points, indicative of two adjacent values...
      let points: {value: number | string, startPoint: string}[] = [];

      if (c === "*") {
        // check all adjacent coords for values in map.
        if (lines[y]?.[x + 1]?.match(dMatch)) {
          const val = checkMap(y, x + 1);
          const spSeen = points.findIndex((sp) => {
            return sp.startPoint === val.startPoint
          });
          if (spSeen === -1) {
            points.push(val);
          }
        }

        if (lines[y]?.[x - 1]?.match(dMatch)) {
          const val = checkMap(y, x - 1);
          const spSeen = points.findIndex((sp) => {
            return sp.startPoint === val.startPoint
          });
          if (spSeen === -1) {
            points.push(val);
          }
        }

        if (lines[y + 1]?.[x]?.match(dMatch)) {
          const val = checkMap(y + 1, x);
          const spSeen = points.findIndex((sp) => {
            return sp.startPoint === val.startPoint
          });
          if (spSeen === -1) {
            points.push(val);
          }
        }

        if (lines[y - 1]?.[x]?.match(dMatch)) {
          const val = checkMap(y - 1, x);
          const spSeen = points.findIndex((sp) => {
            return sp.startPoint === val.startPoint
          });
          if (spSeen === -1) {
            points.push(val);
          }
        }

        if (lines[y + 1]?.[x + 1]?.match(dMatch)) {
          const val = checkMap(y + 1, x + 1);
          const spSeen = points.findIndex((sp) => {
            return sp.startPoint === val.startPoint
          });
          if (spSeen === -1) {
            points.push(val);
          }
        }

        if (lines[y + 1]?.[x - 1]?.match(dMatch)) {
          const val = checkMap(y + 1, x - 1);
          const spSeen = points.findIndex((sp) => {
            return sp.startPoint === val.startPoint
          });
          if (spSeen === -1) {
            points.push(val);
          }
        }

        if (lines[y - 1]?.[x + 1]?.match(dMatch)) {
          const val = checkMap(y - 1, x + 1);
          const spSeen = points.findIndex((sp) => {
            return sp.startPoint === val.startPoint
          });
          if (spSeen === -1) {
            points.push(val);
          }
        }

        if (lines[y - 1]?.[x - 1]?.match(dMatch)) {
          const val = checkMap(y - 1, x - 1);
          const spSeen = points.findIndex((sp) => {
            return sp.startPoint === val.startPoint
          });
          if (spSeen === -1) {
            points.push(val);
          }
        }

        if (points.length === 2) {
          total2 += parseInt(points[0].value as string) * parseInt(points[1].value as string);
        }
      }
    }
  }

  console.log(`part two: ${ total2 }`);

}

run();

//546563