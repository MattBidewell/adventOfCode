import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

export function getInput(currentFileName: string, targetFileName: string): string {
  const __filename = fileURLToPath(currentFileName);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, `${targetFileName}.txt`);

  return fs.readFileSync(filePath, "utf-8");
}