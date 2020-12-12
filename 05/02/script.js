loop(100, n => n > 0, n => n - 7, console.log);
// → 3
// → 2
// → 1

function loop(value, testFunc, updateFunc, bodyFunc) {
  while (testFunc(value)) {
    bodyFunc(value);
    value = updateFunc(value);
  }
}