const fs = require("fs");

const contents = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n\n")
  .filter((x) => x.length);

const seedVals = contents.shift().split(": ")[1].split(" ");
const seeds = [];

for (let i = 0; i < seedVals.length; i += 2) {
  seeds.push({
    start: +seedVals[i],
    length: +seedVals[i + 1],
  });
}

const createRange = (line) => {
  const items = line.split(" ");

  const range = {
    dest: +items[0],
    src: +items[1],
    range: +items[2],
  };

  return range;
};

const createNegRanges = (ranges) => {
  ranges.sort((a, b) => a.src - b.src);

  let start = 0;
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    if (range.src > start) {
      ranges.splice(i, 0, {
        src: start,
        dest: start,
        range: range.src - start,
      });
      i++;
    }
    start = range.src + range.range;
  }
  return ranges;
};

const parseMap = (data) => {
  const contents = data.split("\n").filter((x) => x);
  const [from, _, to] = contents.shift().split(" ")[0].split("-");
  return {
    from: from,
    to: to,
    map: contents.map(createRange),
  };
};

const walk = (value, range, name, map) => {
  if (map[name] === undefined) {
    return [value, range];
  }
  const item = map[name];
  const rangeItem = item.map.find(
    (x) => x.src <= value && value < x.src + x.range,
  );
  if (rangeItem) {
    const diff = value - rangeItem.src;
    const newVal = rangeItem.dest + diff;
    return walk(newVal, Math.min(range, rangeItem.range - diff), item.to, map);
  }
  return walk(value, 1, item.to, map);
};

const parsed = contents.map((x) => parseMap(x));
parsed.forEach((p) => {
  p.map = createNegRanges(p.map);
});
const parsedMap = parsed.reduce((acc, x) => {
  acc[x.from] = x;
  return acc;
}, {});

let lowest = Infinity;
for (const seed of seeds) {
  let remaining = seed.length;
  let start = seed.start;
  while (remaining > 0) {
    const [startLocation, consumed] = walk(start, remaining, "seed", parsedMap);

    remaining -= consumed;
    start += consumed;
    if (consumed > 1) {
      console.log("consumed", consumed);
    }
    if (startLocation < lowest) {
      lowest = startLocation;
    }
  }
  console.log("finished", seed);
}

console.log(lowest);
