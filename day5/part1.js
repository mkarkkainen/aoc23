const fs = require("fs");

const content = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n\n")
  .map((x) => x.split(":")[1])
  .map((x) => x.split("\n"))
  .map((x) => x.filter((x) => x !== ""))
  .map((x) => x.map((x) => x.split(" ")))
  .map((x) => x.map((x) => x.map((x) => parseInt(x))));

const seeds = content[0][0].slice(1);
const maps = content.slice(1);

const inRange = (num, low, range) => low <= num && num <= low + range;

const seedToLocation = (seed, array) => {
  for (let i = 0; i < array.length; i++) {
    let [dest, source, range] = array[i];
    if (inRange(seed, source, range)) {
      return dest + (seed - source);
    }
  }
  return seed;
};

const parseResults = (seeds, maps) => {
  let res;
  for (const seed of seeds) {
    let num = seed;
    for (let i = 0; i < maps.length; i++) {
      num = seedToLocation(num, maps[i]);
    }
    if (res === undefined) {
      res = num;
    } else {
      num < res ? (res = num) : res;
    }
  }
  return res;
};
console.log(parseResults(seeds, maps));
