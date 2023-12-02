const fs = require("fs");

const rawInput = fs.readFileSync("input.txt", "utf-8");

let tmp = [];

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

const formatInput = (input) => {
  const inputToArray = input.split("\n");

  for (const string of inputToArray) {
    const numberObjects = Array.from({ length: 9 }, (_, index) => ({
      name: numberToWord(index + 1),
      num: index + 1,
      indexes: [],
    }));

    for (let i = 0; i < string.length; i++) {
      if (/^[0-9]*$/g.test(string[i])) {
        const num = string[i];
        numberObjects[num - 1].indexes.push(i);
      } else {
        let currentWord = "";
        for (let j = i; j < string.length; j++) {
          currentWord += string[j];
          if (numberObjects.some((obj) => obj.name === currentWord)) {
            numberObjects[wordToNumber(currentWord) - 1].indexes.push(i);
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

    numberObjects.forEach((obj) => {
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

    tmp.push(`${value.first}${value.last}`);
  }
};

const calculateSum = (array) => {
  let sum = 0;
  const threshold = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < array.length; i++) {
    const number = parseInt(array[i]);
    if (BigInt(sum) + BigInt(number) > BigInt(threshold)) {
      sum = BigInt(sum) + BigInt(number);
    } else {
      sum += number;
    }
  }
  console.log(sum);
};

formatInput(rawInput);
calculateSum(tmp);
