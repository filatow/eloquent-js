function countBs(str) {
  let counter = 0;
  let lastPos = 0;
  while (str.indexOf(`B`, lastPos) !== -1) {
    counter++;
    lastPos = str.indexOf(`B`, lastPos) + 1;
  }
  return counter;
};

function countChar(str, char) {
  let counter = 0;
  let lastPos = 0;
  while (str.indexOf(char, lastPos) !== -1) {
    counter++;
    lastPos = str.indexOf(char, lastPos) + 1;
  }
  return counter;
};

console.log(countBs(`qBBBssdfBFBBBB`));
console.log(countChar(`qBBBssdfBFBBBBB`, `B`));
