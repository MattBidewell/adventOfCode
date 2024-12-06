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

function generateRules(instructions: string[][]) {
  const rules = new Map<string, boolean>();

  for (const [key, value] of instructions) {
    rules.set(`${key},${value}`, true); // used in part 2
    rules.set(`${value},${key}`, false);
  }

  return rules;
}

function isOrdered(pages: string[], rules: Map<string, boolean>) {
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const page = pages[i];
      const next = pages[j];

      // the rule is in map and returns false (means they're out of sync)
      if (rules.has(`${page},${next}`) && !rules.get(`${page},${next}`)) {
        return false;
      }
    }
  }

  return true;
}

function part1(input: string) {
  const [i, p] = input.split("\n\n").map((x) => x.split("\n"));

  const files = p.map((x) => x.split(",")).filter((x) => x[0] !== ""); // fu line ending

  const rules = generateRules(i.map((x) => x.split("|")));

  let result = 0;

  for (const pages of files) {
    // iterate through each page
    if (isOrdered(pages, rules)) {
      const middle = pages[Math.floor(pages.length / 2)];
      result = result + parseInt(middle);
    }
  }

  return result;
}

function part2(input: string) {
  const [i, p] = input.split("\n\n").map((x) => x.split("\n"));

  const files = p.map((x) => x.split(",")).filter((x) => x[0] !== ""); // fu line ending

  const rules = generateRules(i.map((x) => x.split("|")));

  let result = 0;

  for (const pages of files) {
    // iterate through each page
    if (isOrdered(pages, rules)) continue;

    // sort the unordered pages by using the rule set above
    const sortedPages = pages.sort((a, b) => {
      const ruleA = rules.get(`${a},${b}`);
      if (ruleA === undefined) return 0;
      return ruleA ? -1 : 1;
    });

    const middle = sortedPages[Math.floor(sortedPages.length / 2)];
    result = result + parseInt(middle);
  }

  return result;
}
