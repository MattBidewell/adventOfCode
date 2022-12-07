// { part1: 1770595, part2: 2195372 }
// 95437
import fs from "node:fs/promises";

console.log(`Day seven`);
const data = await fs.readFile("day07/data.txt", {encoding: "utf8"});
// const data = await fs.readFile("day07/test-data.txt", {encoding: "utf8"});

class Dir {
    size: number
    subDirectories: Dir[]
    dirName: string;
    parentDir: Dir | null;
    files: {name:string, size:number}[]

    constructor(dirName: string, parentDir?: Dir) {
      this.size = 0;
      this.dirName = dirName
      this.parentDir = parentDir ?? null;
      this.subDirectories = []
      this.files = [];
    }

    addFile(name:string, size:number) {
      this.files.push({name, size});
      this.size += size;
    }
}

class Fs {
  root: Dir;
  constructor(dirName: string) {
    this.root = new Dir(dirName)
  }

  addDir(parent:Dir, dirName:string) {
    const dir = new Dir(dirName, parent);
    parent.subDirectories.push(dir);
    return dir;
  }
}

function partOne() {
  const lines = data.split("\n");

  const fileSystem = new Fs("/");
  let currentDirectory: Dir = fileSystem.root;
  lines.shift();

  while(lines.length > 0) {
    const line = lines.shift() as string;

    if(line[0] === "$") {
      const args = line.split(" ")

      if(args[1] === "cd") {
        if(args[2] === "..") {
          currentDirectory = currentDirectory.parentDir as Dir;
        } else {
          const dir = fileSystem.addDir(currentDirectory, args[2])
          currentDirectory = dir;
        }

      } else if(args[1] === "ls") {

        while(lines.length > 0 && lines[0][0] !== "$") {
          let currLine = lines.shift() as string;

          // whilst the next line isnt a command...
          const lineItem = currLine?.split(" ");
          if(lineItem[0] !== "dir") {
            currentDirectory.addFile(lineItem[1], Number(lineItem[0]))
          }
        }
      } else {
        console.log("missing command " + args[1]);
      }
    }
  }

  let tt = 0;
  const dirs = [];
  dirs.push(...fileSystem.root.subDirectories);
  while(dirs.length > 0) {
    const curr  = dirs.shift() as Dir;
    if(curr?.size as number < 100000) {
      tt = tt + curr?.size as number;
    }
    dirs.push(...curr?.subDirectories);
  }
  return tt;
}

console.log(partOne());

// // const lines = String(data).split(/\r?\n/);
// // const dirs: any = {};
// // const parserPath = [];

// //    for (const line of lines) {
// //      if (/\d+\s\w+/.test(line)) {
// //        const path: string[] = [];
// //        const fileSize = Number((line.match(/\d+/) as RegExpMatchArray)[0]);

// //       parserPath.forEach((dir) => {
// //         path.push(dir);

// //         const dirTotal = dirs[path.join('/')] ?? 0;
// //         dirs[path.join('/')] = dirTotal + fileSize;
// //       });
// //     } else if (/\$ cd/.test(line)) {
// //       const [_, _command, param] = line.split(' ');
// //       param === '..' ? parserPath.pop() : parserPath.push(param);
// //     }
// //   }

// //   // const part1 = Object.values(dirs).reduce((total:number, dirSize:number) => ( {
// //   //     return dirSize <= 100000 ? total + dirSize : total
// //   //   },0));
// //   // );

// //   const part1 = Object.values(dirs).reduce((prev, curr) => {
// //     return Number(curr) <= 100000 ? Number(prev) + Number(curr) : prev
// //   },0);

// //   const part2 = Object.values(dirs).sort((a,b) => Number(a)-Number(b)).find((dirSize) => {
// //     return 70000000 - dirs["/"] + Number(dirSize) >= 30000000
// //   })
//   // const part2 = Object.values(dirs)
//   //   .sort((a, b) => a - b)
//   //   .find((dirSize) => 70000000 - dirs['/'] + dirSize >= 30000000);

//   // console.log({part1, part2});
// /***********************************************/

// ///&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
