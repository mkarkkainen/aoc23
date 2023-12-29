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
  let sum = [];
  let counts = [];
  for (let i = 0; i < correctNumbersArray.length; i++) {
    let matchCount = 0;
    for (let y = 0; y < correctNumbersArray[i].length; y++) {
      if (testNumbersArray[i].includes(correctNumbersArray[i][y])) {
        matchCount++;
      }
    }
    counts.push({ id: i + 1, cardCount: 1, matches: matchCount });
    sum.push(matchCount);
  }
  return counts;
};

const distributeMatches = (counts) => {
  for (let i = 0; i < counts.length; i++) {
    let { id, cardCount, matches } = counts[i];
    for (let j = 1; j <= matches; j++) {
      counts[j + id - 1].cardCount += cardCount;
    }
  }
  return counts;
};

const sumCards = (parsedCounts) => {
  return parsedCounts.reduce((prev, curr) => prev + curr.cardCount, 0);
};

const matchesCounts = countMatches(correctNumbers, yourNumbers);
const parsedResults = distributeMatches(matchesCounts);
const result = sumCards(parsedResults);

console.log(result);
