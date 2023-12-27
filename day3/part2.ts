import { readFileSync } from "fs";

const isNumber = (char: string): boolean => !isNaN(parseInt(char));

const chunkArrayInGroups = (arr: string[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

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
  let summingArray: any[] = [];
  for (let rowIndex = 0; rowIndex < inputRow.length; rowIndex++) {
    for (
      let columnIndex = 0;
      columnIndex < inputRow[rowIndex].length;
      columnIndex++
    ) {
      if (/[*]/.test(inputRow[rowIndex][columnIndex])) {
        let aroundFoundSymbol = [
          inputRow[rowIndex - 1]
            .slice(columnIndex - 3, columnIndex + 4)
            .split(""),
          inputRow[rowIndex].slice(columnIndex - 3, columnIndex + 4).split(""),
          inputRow[rowIndex + 1]
            .slice(columnIndex - 3, columnIndex + 4)
            .split(""),
        ];

        aroundFoundSymbol.forEach((row, index) =>
          summingArray.push(walkBackward(row, 2))
        );
      }
    }
  }

  let chunks = chunkArrayInGroups(summingArray, 3);
  const cleanedUpArrays = chunks
    .map((arrayOfArrays) =>
      arrayOfArrays.reduce(
        (acc: any, subArray: any) =>
          acc.concat(subArray.filter((element: any) => element !== "")),
        []
      )
    )
    .filter((subArray) => subArray.length === 2);

  return cleanedUpArrays.reduce(
    (acc, curr) =>
      acc + curr.reduce((acc: string, curr: string) => +acc * +curr, 1),
    0
  );
}
const lines: string[] = readFileSync("./input.txt", "utf-8").split("\n");
const result = processRows(lines);
console.log(result);
