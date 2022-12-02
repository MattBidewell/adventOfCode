import fs from "node:fs/promises";

console.log(`Day two`);

// const data = await fs.readFile("day02/test-data.txt", {encoding: "utf8"});
const data = await fs.readFile("day02/data.txt", {encoding: "utf8"});

function partOne() {
  //first colmn what opponent is going to play
  // A = rock
  // B = paper
  // c = siz
  // second column,what I play
  // x = rock
  // y = paper
  // z = siz

  // score
  // 1 for rock
  // 2 for paper
  // 3 for siz
  // 0 for loss
  // 3 for draw
  // 7 for won
  let score = 0;
  const dataSet = data.split("\n")
  dataSet.forEach((val) => {
    const [opponent, self] = val.split(" ");
    if((opponent === "A" && self === "Y") || (opponent === "B" && self === "Z") || (opponent === "C" && self === "X")) {
      score += 6;
    } else if((opponent === "A" && self === "X") || (opponent === "B" && self === "Y") || (opponent === "C" && self === "Z")) {
      score += 3;
    }
    if(self === "X") {
      score += 1
    } else if(self === "Y") {
      score += 2
    } else {
      score += 3
    }
  });
  return score
}

function partTwo() {
  let score = 0;
  const dataSet = data.split("\n")
  dataSet.forEach((val) => {
    const [opponent, toWin] = val.split(" ");
    // second colum to be how round ends
    // x means i need to lose
    // y means i need to draw
    // z means i need to win

    // A = rock
    // B = paper
    // c = siz
    // second column,what I play
    // x = rock
    // y = paper
    // z = siz

    let self;
    if(toWin === "Z") {
      if(opponent === "A") self = "Y"
      if(opponent === "B") self = "Z"
      if(opponent === "C") self = "X"
    } else if (toWin === "Y") {
      if(opponent === "A") self = "X"
      if(opponent === "B") self = "Y"
      if(opponent === "C") self = "Z"
    } else {
      if(opponent === "A") self = "Z"
      if(opponent === "B") self = "X"
      if(opponent === "C") self = "Y"
    }

    if((opponent === "A" && self === "Y") || (opponent === "B" && self === "Z") || (opponent === "C" && self === "X")) {
      score += 6;
    } else if((opponent === "A" && self === "X") || (opponent === "B" && self === "Y") || (opponent === "C" && self === "Z")) {
      score += 3;
    }
    if(self === "X") {
      score += 1
    } else if(self === "Y") {
      score += 2
    } else {
      score += 3
    }
  });
  return score
}

const p1 = partOne();
console.log(`Part One: ${p1}`)

const p2 = partTwo();
console.log(`Part two: ${p2}`);