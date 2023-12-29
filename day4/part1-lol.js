const fs = require("fs");
let result = 0;
fs.readFileSync("./input.txt", "utf-8")
  .split("\n")
  .map((x) => {
    x.split(":")[1].split(" | ");
  })
  .map((x) => x.map((x) => x.split(" ").filter((x) => x !== "")))
  .map((x) => x.map((x) => x.map((x) => parseInt(x))))
  .map((x) => {
    let count = 0;
    const a = x[0];
    const b = x[1];
    for (const num of b) {
      for (const answer of a) {
        if (num === answer) {
          count++;
        }
      }
    }
    count !== 0 ? (result += 2 ** (count - 1)) : 0;
  });
console.log(result);
