import fs from "node:fs/promises";

console.log(`Day six`);

// const data = await fs.readFile("day06/test-data.txt", {encoding: "utf8"});
const data = await fs.readFile("day06/data.txt", { encoding: "utf8" });

// implement a moving window algorithm
function partOne() {
  const packetWindowSize = 4;
  const messageWindowSize = 14;
  let packetWindow = "";
  let messageWindow = "";
  const result: any = {};

  for(let i = 0; i < data.length; i++) {
    packetWindow += data[i];
    messageWindow += data[i]
    if(packetWindow.length === packetWindowSize && !result.packet) {
      // logic to check each character is unique
      const set = new Set(packetWindow);
      if(set.size === 4) {
        console.log(packetWindow);
        result.packet = i + 1;
      } else {
        packetWindow = packetWindow.slice(1);
      }
    }
    if(messageWindow.length === messageWindowSize && !result.window) {
      // logic to check each character is unique
      const set = new Set(messageWindow);
      if(set.size === 14) {
        console.log(messageWindow);
        result.window = i + 1;
        return result;
      } else {
        messageWindow = messageWindow.slice(1);
      }
    }
  }
}

console.log(`partOne: ${JSON.stringify(partOne())}`);
