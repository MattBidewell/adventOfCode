import fs from 'fs/promises';

console.log('Day two');

// const data = await fs.readFile('day02/data.test.txt', { encoding: 'utf8' });
const data = await fs.readFile('day02/data.txt', { encoding: 'utf8' });

const lines = data.split('\n');

const totalRed = 12;
const totalGreen = 13;
const totalBlue = 14;

let total = 0;
for (const round of lines) {
  const gameId = round.match(/Game (\d+):/)?.[1];
  const pattern = /(\d+)\s+(\w+)/g //

  let isValid = true;
  let match;

  let lowestGreen = 0;
  let lowestBlue = 0;
  let lowestRed = 0;

  while ((match = pattern.exec(round)) !== null) {

    const quantity = parseInt(match[1]);
    const colour = match[2];

    if (
      (colour === 'green' && quantity > totalGreen) ||
      (colour === 'blue' && quantity > totalBlue) ||
      (colour === 'red' && quantity > totalRed)
    ) {
      isValid = false;
      break;
    }
  }
  if (isValid) {
    total += parseInt(gameId!)
  }
}

console.log(`part 1: ${total}`);

//part 2
let totalPower = 0;
for (const round of lines) {

  const pattern = /(\d+)\s+(\w+)/g //
  let match;

  let lowestGreen = 0;
  let lowestBlue = 0;
  let lowestRed = 0;

  while ((match = pattern.exec(round)) !== null) {

    const quantity = parseInt(match[1]);
    const colour = match[2];

    switch (colour) {
      case 'green':
        if(quantity > lowestGreen) lowestGreen = quantity
        break
      case 'blue':
        if (quantity > lowestBlue) lowestBlue = quantity
        break
      case 'red':
        if (quantity > lowestRed) lowestRed = quantity
        break
    }
  }

  totalPower += (lowestGreen * lowestBlue * lowestRed)

}

console.log(`part 2: ${totalPower}`);