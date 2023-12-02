//   --- Day 2: Cube Conundrum ---

// which games would have been possible if the bag contained only 12 red cubes,
// 13 green cubes, and 14 blue cubes?
//

const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf-8");
const test_data = fs.readFileSync("test.txt", "utf-8");

const regex = new RegExp(/[:;,]/);

const lines = test_data.split("\n");

const parseLine = (line) => {
  let store = [];
  const game = line.split(regex);

  let tmp = [];

  // const id = game[0].charAt(5);
  const gameObj = {
    id: game[0].charAt(5),
    play: game.splice(1).map((set) => {
      return set.trim().split(" ");
    }),
  };

  const transformedData = gameObj.play.map((item, i) => {
    return {
      id: gameObj.id,
      play: {
        number: item[0],
        color: item[1],
      },
    };
  });

  const ellis = Array.from(transformedData);
  console.log(ellis);

  // const someseq = gameObj.play.map((x) => x.map((y, i) => y[0]).splice(1));

  // const formatted = someseq.join("").split("");

  //console.log(transformedData);
};
//b r , r g b , g
const sumOfIds = (lines) => {
  return lines.reduce((acc, curr) => {
    //test here if needed
    return acc + parseLine(curr);
  }, 0);
};

console.log(sumOfIds(lines));
