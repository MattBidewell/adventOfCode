import fs from "node:fs/promises";

console.log(`Day twelve`);

// const data = await fs.readFile("day12/test-data.txt", {encoding: "utf8"});
const data = await fs.readFile("day12/data.txt", { encoding: "utf8" });
const lines = data.split("\n");

type Point = {
  x:number,
  y:number
}

function partOne() {
  const input = lines.map((line) => line.split(""));
  let startPoint: any = {}, endPoint: any = {};

  const values = input.map((row, yIndex) => {
    return row.map((val, xIndex) => {
      if(val === "S") {
        startPoint = {x: xIndex, y:yIndex};
        return 0; // start val
      } else if(val === "E") {
        endPoint = {x: xIndex, y: yIndex};
        return 26 // end val
      }
      // console.log(`val: ${val} charCode: ${val.charCodeAt(0)-96}`);
      // get char code and set to 1.
      return val.charCodeAt(0) - 96;
    });
  });

  const {dist, prev} = dijkstraAlgo(values, startPoint as Point, endPoint as Point);
  const distance = dist[pointToUid(endPoint)];
  return distance;
}

function partTwo() {
  const input = lines.map((line) => line.split(""));
  let endPoint: any = {};
  const values = input.map((row, yIndex) => {
    return row.map((val, xIndex) => {
      if (val === "S" || val === "a") {
        return 0; // start val
      } else if (val === "E") {
        endPoint = { x: xIndex, y: yIndex };
        return 26; // end val
      }
      // console.log(`val: ${val} charCode: ${val.charCodeAt(0)-96}`);
      // get char code and set to 1.
      return val.charCodeAt(0) - "a".charCodeAt(0);
    });
  });

  const {dist, prev} = dijkstraAlgo2(values, endPoint as Point);
  return dist;
}

function dijkstraAlgo(vals: number[][], startPoint:{x:number,y:number}, endPoint:{x:number,y:number}) {
  const dist:any = {};
  const prev:any = {};
  const queue: number[] = [];
  for (let y = 0; y < vals.length; y++) {
    for(let x = 0; x < vals[y].length; x++) {
      const pointUid = pointToUid({y,x})
      dist[pointUid] = Infinity;
      queue.push(pointUid)
    }
  }
  dist[pointToUid(startPoint)] = 0; // add start point to distances as a value of 0;

  while(queue.length) {
    let u:any = null;
    let i:any;
    for(const [index, val] of Object.entries(queue)) {
    // if min is null or the val is closer than min swap
      if(u === null || dist[val] < dist[u]) {
        u = val
        i = index;
      }
    }

    if(u === pointToUid(endPoint)) {
      break;
    }

    queue.splice(parseInt(i),1) // I hate splice.

    const point = uidToPoint(u);
    const neighbors = getNeighbors(point, vals);
      for(const neighbor of neighbors) {
        if(queue.includes(neighbor)) {
          const alt = dist[u] + 1;
          if(alt < dist[neighbor]) {
            dist[neighbor] = alt;
            prev[neighbor] = u;
          }
        }
    }
  }
  return {dist, prev}
}

function dijkstraAlgo2(vals: number[][], startPoint:{x:number,y:number}) {
  const dist:any = {};
  const prev:any = {};
  const queue: number[] = [];
  for (let y = 0; y < vals.length; y++) {
    for(let x = 0; x < vals[y].length; x++) {
      const pointUid = pointToUid({y,x})
      dist[pointUid] = Infinity;
      queue.push(pointUid)
    }
  }
  dist[pointToUid(startPoint)] = 0; // add start point to distances as a value of 0;

  while(queue.length) {
    let u:any = null;
    let i: any;

    // this is to remove the next shortest one to figure out what neighbours to check next.
    for(const [index, val] of Object.entries(queue)) {
    // if min is null or the val is closer than min swap
      if(u === null || dist[val] < dist[u]) {
        u = val
        i = index;
      }
    }

    const point = uidToPoint(u);

    if(vals[point.y][point.x] === 0) {
      return {dist:dist[u]};
    }

    queue.splice(parseInt(i),1) // I hate splice.

    const neighbors = getNeighbors2(point, vals);
    for(const neighbor of neighbors) {
      if(queue.includes(neighbor)) {
        const alt = dist[u] + 1;
        if(alt < dist[neighbor]) {
          dist[neighbor] = alt;
          prev[neighbor] = u;
        }
      }
    }
  }
  return {dist, prev}
}

function getNeighbors(p: Point, data:number[][]) {
  // move up    = x = x + 1
  // move down  = x = x + -1
  // move left  = x = x + -1
  // move right = x = x + 1
  const {x,y} = {...p}
  const neighbors = [];

  // if(!false) {
    if(y+1 < data.length && data[y+1][x] <= data[y][x]+1) {
      neighbors.push(pointToUid({x,y:y+1}))
    }
    if(y-1 >= 0 && data[y-1][x] <= data[y][x]+1) {
      neighbors.push(pointToUid({x,y:y-1}));
    }
    if(x+1 < data[y].length && data[y][x+1] <= data[y][x]+1) {
      neighbors.push(pointToUid({x:x+1,y}));
    }
    if(x-1 >= 0 && data[y][x-1] <= data[y][x]+1) {
      neighbors.push(pointToUid({x:x-1,y}));
    }
  return neighbors;
}

function getNeighbors2(p: Point, data:number[][]) {
  // move up    = x = x + 1
  // move down  = x = x + -1
  // move left  = x = x + -1
  // move right = x = x + 1
  const {x,y} = {...p}
  const neighbors = [];

  // if(!false) {
    if(y+1 < data.length && data[y+1][x] >= data[y][x]-1) {
      neighbors.push(pointToUid({x,y:y+1}))
    }
    if(y-1 >= 0 && data[y-1][x] >= data[y][x]-1) {
      neighbors.push(pointToUid({x,y:y-1}));
    }
    if(x+1 < data[y].length && data[y][x+1] >= data[y][x]-1) {
      neighbors.push(pointToUid({x:x+1,y}));
    }
    if(x-1 >= 0 && data[y][x-1] >= data[y][x]-1) {
      neighbors.push(pointToUid({x:x-1,y}));
    }
  return neighbors;
}
// create a unique reversable uid of the coordinates..
function pointToUid(point: Point): number {
  return point.y * 1e3 + point.x;
}
function uidToPoint(int: number): Point {
  return {
    x: int % 1e3,
    y: Math.floor(int / 1e3)
  }
}

/** Dijkstra
 * function Dijkstra(Graph, source):
 2
 3      for each vertex v in Graph.Vertices:
 4          dist[v] ← INFINITY
 5          prev[v] ← UNDEFINED
 6          add v to Q
 7      dist[source] ← 0
 8
 9      while Q is not empty:
10          u ← vertex in Q with min dist[u]
11          remove u from Q
12
13          for each neighbor v of u still in Q:
14              alt ← dist[u] + Graph.Edges(u, v)
15              if alt < dist[v]:
16                  dist[v] ← alt
17                  prev[v] ← u
18
19      return dist[], prev[]
 */

console.log(partOne());
console.log(partTwo());