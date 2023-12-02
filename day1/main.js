console.time("set");
const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8");
const lines = input.split("\n");

const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

const map = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const toNumber = (string) => map[string] ?? string;

const processLine = (line) => {
  const numbers = Array.from(line.matchAll(regex));
  const first = toNumber(numbers[0][1]);
  const last = toNumber(numbers[numbers.length - 1][1]);
  return parseInt(`${first}${last}`, 10);
};

const processInput = (input) =>
  input.reduce((total, line) => processLine(line) + total, 0);

console.log(processInput(lines));

console.timeEnd("set");
