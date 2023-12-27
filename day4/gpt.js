const fs = require("fs");

// Read and parse the file
const contents = fs
  .readFileSync("./test.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(":")[1].split("|"));

// Separate and clean correct and your numbers
const [correctNumbers, yourNumbers] = contents.reduce(
  (acc, curr, index) => {
    console.log(index);
    acc[index % 2].push(
      curr.map((group) =>
        group
          .trim()
          .split(" ")
          .filter((num) => num !== "")
      )
    );
    return acc;
  },
  [[], []]
);

console.log(correctNumbers);

// Function to count matches
const countMatches = (correctNums, testNums) =>
  correctNums.reduce((totalSum, currentSet, index) => {
    const matchCount = currentSet.filter((num) =>
      testNums[index].includes(num)
    ).length;
    return totalSum + (matchCount > 0 ? 2 ** (matchCount - 1) : 0);
  }, 0);

// console.log(countMatches(correctNumbers, yourNumbers));
