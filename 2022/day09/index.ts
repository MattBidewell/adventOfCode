
import fs from "node:fs/promises";

console.log(`Day eight`);

type Cord = {
  x: number
  y: number
}

const data = await fs.readFile("day09/test-data.txt", {encoding: "utf8"});
// const data = await fs.readFile("day09/data.txt", { encoding: "utf8" });

const lines = data.split("\n");

/**
 *
....
.TH.
....

....
.H..
..T.
....

...
.H. (H covers T)
...
 *
 */

function partOne() {
  let tailVisited: Set<Cord> = new Set();

  const head = {x:0, y:0};
  const tail = {x:0, y:0};

  tailVisited.add(Object.assign({},tail))

  let line = lines.shift();
  printCoordinates(head, tail, tailVisited);

  while(line) {

    let commands = line.split(" ");
    const direction = commands[0];
    let distance = parseInt(commands[1]);

    while(distance > 0) {
      switch (direction) {
        case "U": head.y++; break;
        case "R": head.x++; break;
        case "D": head.y--; break;
        case "L": head.x--; break;
      }

      if(distance === 1) break;

      if((Math.abs(head.x - tail.x) < 2) && Math.abs(head.y - tail.y) <  2) {
        continue
      }
      if(head.y > tail.y) {
        tail.y++;
      } else if(tail.y > head.y) {
        tail.y--;
      }

      if(head.x> tail.x) {
        tail.x++;
      } else if(tail.x > head.x) {
        tail.x--;
      }

      tailVisited.add(Object.assign({},tail));
      printCoordinates(head, tail, tailVisited);
      distance--;
    }
    line = lines.shift();
  }

  return tailVisited.size; // should be all the unique tail positions
}

function partTwo() {
  return 0;
}

function printCoordinates(head: Cord, tail: Cord, tailVisited: Set<Cord>, onlyVisited?:boolean) {
  const board = new Array(10);
  for(let i = 0; i < board.length; i++) {
    board[i] = new Array(10).fill(".");
  }

  for(const cords of tailVisited.values()) {
    board[cords.x][cords.y] = "#";
  }
  if(!onlyVisited) {
    board[tail.x][tail.y] = "T";
    board[head.x][head.y] = "H";
  }
  console.table(board)
}

console.log(partOne());
console.log(partTwo());
