const fs = require("fs");

const rawInput = fs.readFileSync("input.txt", "utf-8");
const lines = rawInput.split("\n");

const testlines = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];

const reverseNumberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const numberMap = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

function numberToWord(number) {
  return numberMap[number];
}

const wordToNumber = (word) => {
  return reverseNumberMap[word];
};

const findMinMax = (arr) => {
  if (arr.length === 0) {
    return { min: undefined, max: undefined };
  }
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
  };
};

const processLine = (line) => {
  const array = Array.from({ length: 9 }, (_, index) => ({
    name: numberToWord(index + 1),
    num: index + 1,
    indexes: [],
  }));

  for (let i = 0; i < line.length; i++) {
    if (/^[0-9]*$/g.test(line[i])) {
      const num = line[i];
      array[num - 1].indexes.push(i);
    } else {
      let currentWord = "";
      for (let j = i; j < line.length; j++) {
        currentWord += line[j];
        if (array.some((obj) => obj.name === currentWord)) {
          array[wordToNumber(currentWord) - 1].indexes.push(i);
        }
      }
    }
  }

  let value = {
    first: "",
    firstValue: undefined,
    last: "",
    lastValue: undefined,
  };

  array.forEach((obj) => {
    if (obj.indexes.length > 0) {
      const name = obj.num;
      const { min, max } = findMinMax(obj.indexes);

      if (value.firstValue === undefined || min < value.firstValue) {
        value.firstValue = min;
        value.first = name;
      }

      if (value.lastValue === undefined || max > value.lastValue) {
        value.lastValue = max;
        value.last = name;
      }
    }
  });

  return parseInt(`${value.first}${value.last}`);
};

const calculateSum = (input) =>
  input.reduce((acc, curr) => processLine(curr) + acc, 0);

console.log(calculateSum(lines));
