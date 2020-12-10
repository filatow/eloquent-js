function range(start, end, step = 1) {
  const range = [];
  if (step < 0) {
    for (let i = start; i >= end; i += step) {
      range.push(i);
    }
  } else {
    for (let i = start; i <= end; i += step) {
      range.push(i);
    }
  }
  return range;
}

function sum(args) {
  let sum = 0;
  for (let arg of args) {
    sum += arg;
  }
  return sum;
}

console.log(range(5, 2, -1));
console.log(range(1, 10, 2));
console.log(range(1, 10));
// console.log(sum(range(1, 5)));