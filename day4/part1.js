const fs = require("fs");

const contents = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(":")[1].split("|"));

const [correctNumbers, yourNumbers] = contents.reduce(
  (acc, curr) => {
    acc[0].push(
      curr[0]
        .trim()
        .split(" ")
        .filter((x) => x !== ""),
    );
    acc[1].push(
      curr[1]
        .trim()
        .split(" ")
        .filter((x) => x !== ""),
    );
    return acc;
  },
  [[], []],
);

const countMatches = (correctNumbersArray, testNumbersArray) => {
  let sum = 0;
  for (let i = 0; i < correctNumbersArray.length; i++) {
    let matchCount = 0;
    for (let y = 0; y < correctNumbersArray[i].length; y++) {
      if (testNumbersArray[i].includes(correctNumbersArray[i][y])) {
        matchCount++;
      }
    }
    sum = sum + (matchCount !== 0 ? 2 ** (matchCount - 1) : 0);
  }
  return sum;
};

const result = countMatches(correctNumbers, yourNumbers);
console.log(result);
