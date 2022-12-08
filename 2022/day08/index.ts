import { Console } from "node:console";
import fs from "node:fs/promises";

console.log(`Day eight`);

// const data = await fs.readFile("day08/test-data.txt", {encoding: "utf8"});
const data = await fs.readFile("day08/data.txt", { encoding: "utf8" });

const lines = data.split("\n");

function partOne() {
  /**
   * 30373
   * 25512
   * 65332
   * 33549
   * 35390
   */

  // constants of trees
  const width = lines[0].length * 2 - 4;
  const depth = lines.length * 2;
  let visible = 0;

  for(const [lineIndex, line] of lines.entries()) {
    const trees = line.split("");
    if(lineIndex === 0 || lineIndex === lines.length - 1) continue;
    for(const [treeIndex, tree] of trees.entries()) {
      if(treeIndex === 0 || treeIndex === trees.length - 1) continue;
      if(checkLine(lineIndex, treeIndex, parseInt(tree))) {
        visible++;
      }
    }
  }
  return visible + width + depth;
}

function checkLine(lineIndex:number, treeIndex:number, treeHeight:number) {
  // check all items above and below using the treeIndex.
  // check rest of the line using the lineIndex.
  let isVerticalVisible = true;
  // check vertical
  for(const [index,line] of lines.entries()) {
    if(index === lineIndex && isVerticalVisible === true){
      return isVerticalVisible;
    } else if(index === lineIndex && isVerticalVisible === false) {
      isVerticalVisible = true; // reset to check trees past the index.
    }

    if(index !== lineIndex && parseInt(line[treeIndex]) >= treeHeight) {
      isVerticalVisible = false;
    }
  }

  let isHorizontalVisible = true;
  for(const [index, tree] of lines[lineIndex].split("").entries()) {
    if(index === treeIndex && isHorizontalVisible === true) {
      return isHorizontalVisible;
    } else if(index === treeIndex && isHorizontalVisible === false) {
      isHorizontalVisible = true;
    }

    if(index !== treeIndex && parseInt(tree) >= treeHeight) {
      isHorizontalVisible = false;
    }
  }

  return (isVerticalVisible || isHorizontalVisible);
}

function partTwo() {
  let bestScore = 0;

  for(const [lineIndex, line] of lines.entries()) {
    if(lineIndex === 0 || lineIndex === lines.length - 1) continue;
    const trees = line.split("");
    for(const [treeIndex, tree] of trees.entries()) {
      if(treeIndex ===0 || treeIndex === trees.length - 1) continue;
      const score = calculateScore(lineIndex, treeIndex, parseInt(tree));
      if(score > bestScore) {
        bestScore = score;
      }
    }
  }

  return bestScore;
}

function calculateScore(lineIndex:number, treeIndex:number, treeHeight:number) {
  // calculate x-left, x-right
  // calculate y-up, y-down
  let y_up = 1;
  let y_down = 1;
  let x_left = 1;
  let x_right = 1;
  for(let i = lineIndex-1; i > 0; i--) {
    if(parseInt(lines[i][treeIndex]) < treeHeight) {
      y_up++;
    } else {
      break;
    }
  }

  for(let i = lineIndex + 1; i < lines.length-1; i++) {
    if(parseInt(lines[i][treeIndex]) < treeHeight) {
      y_down++;
    } else {
      break;
    }
  }

  // x-left
  for(let i = treeIndex - 1; i > 0; i--) {
    if(parseInt(lines[lineIndex][i]) < treeHeight) {
      x_left++
    } else {
      break;
    }
  }

  for(let i = treeIndex + 1; i < lines[lineIndex].length-1; i++) {
    if(parseInt(lines[lineIndex][i]) < treeHeight) {
      x_right++
    } else {
      break;
    }
  }
  console.log(y_up * y_down * x_left * x_right)
  return y_up * y_down * x_left * x_right;
}

// console.log(partOne());
console.log(partTwo());