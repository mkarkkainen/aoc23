//   --- Day 2: Cube Conundrum ---

// which games would have been possible if the bag contained only 12 red cubes,
// 13 green cubes, and 14 blue cubes?
//

const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf-8");
const lines = data.split("\n");

const cubeLimits = {
  blue: 14,
  green: 13,
  red: 12,
};

const parseGame = (line) => {
  const [gameInfo, rounds] = line.split(":");
  const gameId = parseInt(gameInfo.split(" ")[1]);

  for (const round of rounds
    .split(";")
    .map((x) => x.split(",").map((y) => y.trim()))) {
    for (const subset of round.map((subset) => subset.split(" "))) {
      const [count, color] = subset;
      if (count > cubeLimits[color]) {
        return null;
      }
    }
  }

  return gameId;
};

const sumOfValidGames = (lines) => {
  return lines.reduce((acc, curr) => {
    const gameId = parseGame(curr);
    return gameId === null ? acc : acc + gameId;
  }, 0);
};

console.log(sumOfValidGames(lines));
