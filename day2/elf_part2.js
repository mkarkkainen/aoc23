//   --- Day 2: Cube Conundrum ---
//         --- Part Two ---
//
//   Find the minimum set of cubes that must have been present.
//   What is the sum of the power of these sets?
//

const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf-8");
const lines = data.split("\n");

const parseGame = (line) => {
  const [gameInfo, rounds] = line.split(":");
  const gameId = parseInt(gameInfo.split(" ")[1]);
  let minValues = {
    blue: 0,
    green: 0,
    red: 0,
  };
  for (const round of rounds
    .split(";")
    .map((x) => x.split(",").map((y) => y.trim()))) {
    for (const subset of round.map((subset) => subset.split(" "))) {
      const [count, color] = subset;
      if (minValues[color] < parseInt(count)) {
        minValues[color] = parseInt(count);
      }
    }
  }

  return minValues;
};

const powerOfTheValues = (lines) => {
  return lines.reduce((acc, curr) => {
    const power = Object.values(parseGame(curr)).reduce(
      (acc, curr) => acc * parseInt(curr),
      1
    );
    return acc + power;
  }, 0);
};

console.log(powerOfTheValues(lines));
