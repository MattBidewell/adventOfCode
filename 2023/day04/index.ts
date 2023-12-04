import fs from 'fs/promises';

console.log('Day four');

// const data = await fs.readFile('day04/data.test.txt', { encoding: 'utf8' });
const data = await fs.readFile('day04/data.txt', { encoding: 'utf8' });

const lines = data.split('\n');

function partOne() {
  let points = 0;
  for (const line of lines) {
    let linePoints = 0;
    const [i, ii] = line.split('|');
    const myNumbers = ii.match(/\d+/g)?.map(Number);
    const winningNumbers = i.split(":")[1].match(/\d+/g)?.map(Number);

    for (const num of myNumbers!) {
      if (winningNumbers?.includes(num)) {
        linePoints=== 0 ? linePoints = 1 : linePoints *= 2;
      }
    }
    points += linePoints;
  }
  console.log(`Part one: ${points}  `)
}

function partTwo() {
  const cards = lines.map(line => {
    return { line, count: 1 };
  });

  let totalScratchCards = cards.length;
  // for (const card of cards) {
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    // let linePoints = 0;
    const [c, cc] = card.line.split('|');
    const myNumbers = cc.match(/\d+/g)?.map(Number);
    const winningNumbers = c.split(":")[1].match(/\d+/g)?.map(Number);

    while (card.count != 0) {
      let linePoints = 0;

      for (const num of myNumbers!) {
        if (winningNumbers?.includes(num)) {
          linePoints++;
        }
      }
      totalScratchCards += linePoints;
      card.count--;

      for(let j = 1; linePoints != 0; j++) {
        cards[i + j].count++;
        linePoints--;
      }
    }

    // for (let j = 1; linePoints != 0; j++) {
    //   cards[i + j].count++;
    //   linePoints--;
    // }
    // while(linePoints > 0) {
    //   cards[i+1].count++;
    //   linePoints--;
    // }

  }
  console.log(`Part two: ${totalScratchCards}  `)
}

partOne();
partTwo();


