import fs from "node:fs/promises"


export async function readFile(fileName) {
  const data = await fs.readFile(fileName, {encoding: "utf8"});
  return data;
}