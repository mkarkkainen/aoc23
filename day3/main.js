const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf-8");
const test_data = fs.readFileSync("test.txt", "utf-8");

const lines = data.split("\n");
const test_lines = test_data.split("\n");

const rows = 140;
const cols = 140;

const testrows = 10;
const testcols = 10;

const isNum = (char) => /[0-9]/.test(char);
const isSymbol = (char) => char !== "." && !isNum(char);
const schematic = test_lines.map((line) => line.split(""));
//console.log(schematic);

const eachMatrix = (matrix, eachFn) => {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      eachFn(matrix[y][x], [x, y], matrix);
    }
  }
};
const hasProp = (val, prop) => {
  if (val == null) {
    return false;
  }

  return hasOwnProperty.call(val, prop);
};

const callAtCoords = (matrix, coords, callFn) => {
  const [x, y] = coords;

  if (hasProp(matrix, y) && hasProp(matrix[y], x)) {
    callFn(matrix[y][x], coords, matrix);
  }
};

const eachSurrounding = (matrix, [x, y], eachFn) => {
  callAtCoords(matrix, [x, y - 1], eachFn);
  callAtCoords(matrix, [x + 1, y - 1], eachFn);
  callAtCoords(matrix, [x + 1, y], eachFn);
  callAtCoords(matrix, [x + 1, y + 1], eachFn);
  callAtCoords(matrix, [x, y + 1], eachFn);
  callAtCoords(matrix, [x - 1, y + 1], eachFn);
  callAtCoords(matrix, [x - 1, y], eachFn);
  callAtCoords(matrix, [x - 1, y - 1], eachFn);
};

for (let row = 0; row < testrows; row++) {
  for (let col = 0; col < testcols; col++) {
    const currentElement = test_lines[row][col];
    console.log(
      eachMatrix(schematic, (char, coords) => {
        if (isSymbol(char))
          eachSurrounding(schematic, coords, (adj) => {
            console.log(adj);
          });
      })
    );
  }
}
