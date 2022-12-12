
console.log(`Day eleven`);

type Monkey = {
  items: number[],
  operation: (old:number) => number,
  testOperation: (val: number) => number,
  isTrue: number,
  isFalse: number,
  totalInspects: number,
  divider: number;
}

// test monkeys
// const monkeys: Monkey[] = [{
//   items: [79,89],
//   operation: (old:number) => old * 19,
//   testOperation: (val:number) => val % 23,
//   isTrue: 2,
//   isFalse: 3,
//   totalInspects: 0
// },{
//   items: [54, 65, 75, 74],
//   operation: (old: number) => old + 6,
//   testOperation: (val: number) => val % 19,
//   isTrue: 2,
//   isFalse: 0,
//   totalInspects: 0
// },{
//   items: [79, 60, 97],
//   operation: (old: number) => old * old,
//   testOperation: (val: number) => val % 13,
//   isTrue: 1,
//   isFalse: 3,
//   totalInspects: 0
// },{
//   items: [74],
//   operation: (old: number) => old + 3,
//   testOperation: (val: number) => val % 17,
//   isTrue: 0,
//   isFalse: 1,
//   totalInspects: 0
// }]

const monkeys: Monkey[] = [{
  items: [66, 79],
  operation: (old:number) => old * 11,
  testOperation: (val:number) => val % 7,
  divider: 7,
  isTrue: 6,
  isFalse: 7,
  totalInspects: 0
},{
  items: [84, 94, 94, 81, 98, 75],
  operation: (old: number) => old * 17,
  testOperation: (val: number) => val % 13,
  divider: 13,
  isTrue: 5,
  isFalse: 2,
  totalInspects: 0
},{
  items: [85, 79, 59, 64, 79, 95, 67],
  operation: (old: number) => old + 8,
  testOperation: (val: number) => val % 5,
  divider: 5,
  isTrue: 4,
  isFalse: 5,
  totalInspects: 0
},{
  items: [70],
  operation: (old: number) => old + 3,
  testOperation: (val: number) => val % 19,
  divider: 19,
  isTrue: 6,
  isFalse: 0,
  totalInspects: 0
},{
  items: [57, 69, 78, 78],
  operation: (old: number) => old + 4,
  testOperation: (val: number) => val % 2,
  divider: 2,
  isTrue: 0,
  isFalse: 3,
  totalInspects: 0
},{
  items: [65, 92, 60, 74, 72],
  operation: (old: number) => old + 7,
  testOperation: (val: number) => val % 11,
  divider: 11,
  isTrue: 3,
  isFalse: 4,
  totalInspects: 0
},{
  items: [77, 91, 91],
  operation: (old: number) => old * old,
  testOperation: (val: number) => val % 17,
  divider: 17,
  isTrue: 1,
  isFalse: 7,
  totalInspects: 0
},{
  items: [76, 58, 57, 55, 67, 77, 54, 99],
  operation: (old: number) => old + 6,
  testOperation: (val: number) => val % 3,
  divider: 3,
  isTrue: 2,
  isFalse: 1,
  totalInspects: 0
}]

function partOne() {
  for(let i = 0; i < 20; i++) {
    monkeys.forEach((monkey) => {
      while(monkey.items.length > 0) {
        monkey.totalInspects++;
        const item = monkey.items.shift() as number;
        const newWorryVal = Math.floor(monkey.operation(item) / 3);
        const testResult = monkey.testOperation(newWorryVal);
        if(testResult === 0) {
          monkeys[monkey.isTrue].items.push(newWorryVal);
        } else {
          monkeys[monkey.isFalse].items.push(newWorryVal);
        }
      }
    });
  }
  const sortedMonkeys = monkeys.sort((a:Monkey, b:Monkey) => {
    return a.totalInspects > b.totalInspects ? -1 : 1
  })
  const monkeyOne = sortedMonkeys[0];
  const monkeyTwo = sortedMonkeys[1];
  return monkeyOne.totalInspects * monkeyTwo.totalInspects;
}

function partTwo() {
  const divider = monkeys.map((m) => m.divider).reduce((a, b) => a * b, 1);
  for(let i = 0; i < 10000; i++) {
    monkeys.forEach((monkey) => {
      while(monkey.items.length > 0) {
        monkey.totalInspects++;
        const item = monkey.items.shift() as number;
        const newWorryVal = monkey.operation(item);
        const newItem = newWorryVal % divider;
        const testResult = monkey.testOperation(newItem);
        if(testResult === 0) {
          monkeys[monkey.isTrue].items.push(newItem);
        } else {
          monkeys[monkey.isFalse].items.push(newItem);
        }
      }
    });
  }
  const sortedMonkeys = monkeys.sort((a:Monkey, b:Monkey) => {
    return a.totalInspects > b.totalInspects ? -1 : 1
  })
  const monkeyOne = sortedMonkeys[0];
  const monkeyTwo = sortedMonkeys[1];
  return monkeyOne.totalInspects * monkeyTwo.totalInspects;
}

// console.log(partOne());
console.log(partTwo());