import fs from "node:fs/promises";

console.log(`Day five`);

// const data = await fs.readFile("day05/test-data.txt", {encoding: "utf8"});
const data = await fs.readFile("day05/data.txt", { encoding: "utf8" });

// const stackLength = Number((dataSet.pop() as string).split("   ").length);
// const stacks = new Array(stackLength);
// for(let i = 0; i < stacks.length; i++) {
//   stacks[i] = new Array(0);
// }
// while(dataSet.length > 0) {
//   const line = dataSet.pop();
//   const letters = line?.split(" ");
//   letters?.forEach((letter, index) => {
//     stacks[index].push(letter);
//   })
// }
// console.log(dataSet, instructions);
// return ""


const input = data.split("\n");
function run() {
  const splitIndex = input.indexOf("");
  const [dataSet, instructions] = [input.slice(0,splitIndex), input.slice(splitIndex)];

  // const stacks = [
  //   ["Z","N"],
  //   ["M","C","D"],
  //   ["P"],
  // ]

  const stacks = [
    ["W","D","G","B","H","R","V"],
    ["J","N","G","C","R","F"],
    ["L","S","F","H","D","N","J"],
    ["J","D","S","V"],
    ["S","H","D","R","Q","W","N","V"],
    ["P","G","H","C","M"],
    ["F","J","B","G","L","Z","H","C"],
    ["S","J","R"],
    ["L","G","S","R","B","N","V","M",],
  ];

  instructions.shift();
  for(const instruction of instructions) {
    const [_, quantity, __, location, ___, destination] = instruction.split(" ");
    // part one - one at a time..
    // for(let i = 0; i < Number(quantity); i++) {
    //   console.log(`Moving ${i+1} from ${location} to ${destination}.`)
    //   const val = stacks[Number(location) - 1].pop() as string;
    //   stacks[Number(destination) - 1].push(val);
    // }

    // part two
    const removeIndex = stacks[Number(location) - 1].length - Number(quantity);
    const crates = stacks[Number(location) - 1].splice(removeIndex);
    stacks[Number(destination) - 1].push(...crates);

  }

  let str = "";
  for(const stack of stacks) {
    const val = stack[stack.length - 1]
    str = str.concat(val)
  }
  return str;
}

console.log(`Top stack: ${run()}`);
