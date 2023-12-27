import { readFileSync } from "fs";

/**
 * Check if a character is a number.
 * @param {string} char - The character to check.
 * @return {boolean} - True if the character is a number, false otherwise.
 */
const isNumber = (char: string): boolean => !isNaN(parseInt(char));

function walkForward(row: string[], start: number, leftovers: string[]) {
  let left = [...leftovers];
  let temp: string[] = [];

  if (!isNumber(row[start]) && start <= 4) {
    start++;
  }

  for (let i = start; i <= start + 2; i++) {
    if (!isNumber(row[i])) {
      break;
    }
    left.length < 3 && !/[^0-9]/.test(row[3])
      ? left.push(row[i])
      : temp.push(row[i]);
  }

  return [left.join(""), temp.join("")];
}

function walkBackward(row: string[], start: number): any {
  let temp: string[] = [];

  for (let i = start; i >= start - 2; i--) {
    if (!isNumber(row[i])) {
      return walkForward(row, start + 1, temp.reverse());
    }
    temp.push(row[i]);
  }
  return walkForward(row, start + 1, temp.reverse());
}

function processRows(inputRow: string[]) {
  let summingArray: string[] = [];
  for (let i = 0; i < inputRow.length; i++) {
    for (let y = 0; y < inputRow[i].length; y++) {
      if (/[^0-9.]/.test(inputRow[i][y])) {
        let topRow: string[] = [];
        let middleRow: string[] = [];
        let bottomRow: string[] = [];

        for (let x = -3; x <= 3; x++) {
          topRow.push(inputRow[i - 1][y + x]);
          middleRow.push(inputRow[i][y + x]);
          bottomRow.push(inputRow[i + 1][y + x]);
        }

        summingArray.push(walkBackward(topRow, 2));
        summingArray.push(walkBackward(middleRow, 2));
        summingArray.push(walkBackward(bottomRow, 2));
      }
    }
  }
  return summingArray.flat().reduce((curr: any, acc: any) => {
    return +curr + +acc;
  }, 0);
}
const lines: string[] = readFileSync("./input.txt", "utf-8").split("\n");
const result = processRows(lines);
console.log(result);
