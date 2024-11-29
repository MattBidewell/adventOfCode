import fs from "fs";

// read CLI arguments and create a new directory and three files - one TS file called index and two input files called input1 and input2

const args = process.argv.slice(2);
const dayId = (() => {
  // use the first argument as the day id or get the next day based on previous days
  const day = args[0] ?? extractDay();

  if (isNaN(parseInt(day))) {
    throw new Error("Day id must be a number");
  }

  if (parseInt(day) < 1 || parseInt(day) > 25) {
    throw new Error("Day id must be between 1 and 25");
  }

  if (parseInt(day) < 10) {
    return `0${parseInt(day)}`;
  }

  return day;
})();

console.log(`Creating day${dayId} directory`);

const dir = `./day${dayId}`;``

// check if directory exists
// if it does, throw an error
// if it doesn't, create the directory

if (fs.existsSync(dir)) {
  throw new Error("Directory already exists");
}

fs.mkdirSync(dir);

console.log(`Creating files in ${dir}...`);
console.log('Creating index.ts file');
fs.writeFileSync(`${dir}/index.ts`, indexTsTemplate());

console.log('Creating input1.txt file');
fs.writeFileSync(`${dir}/input1.txt`, "");

console.log('Creating input2.txt file');
fs.writeFileSync(`${dir}/input2.txt`, "");


function indexTsTemplate() {
  return `
import { getInput } from "../support";


export function run() {
  const input1 = getInput(import.meta.url, 'input1');
  const input2 = getInput(import.meta.url, 'input2');
}
  `
}

function extractDay() {
  const entries = fs.readdirSync('./');
  const dayDirs = entries.filter((entry) => /^day\d{2}$/.test(entry));
  const dayNumbers = dayDirs.map((dir) => parseInt(dir.replace("day", ""), 10));
  const maxDay = dayNumbers.length > 0 ? Math.max(...dayNumbers) : 0;
  const nextDay = maxDay + 1;
  return nextDay;
}