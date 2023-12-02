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
  const id = line.split(regex)[0].charAt(5);
  const play = line.split(regex);
  //   const bambooz = play.split(6);
  //   console.log(`id: ${id} , play: ${play}`);
  console.log(`bambooz: ${play}`);
};
//b r , r g b , g
const sumOfIds = (lines) => {
  return lines.reduce((acc, curr) => {
    //test here if needed
    return acc + parseLine(curr);
  }, 0);
};

console.log(sumOfIds(lines));
