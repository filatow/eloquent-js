function loopBasedEvery(arr, test) {
  for (let elem of arr) {
    if (!test(elem)) {
      return false;
    }
  }
  return true;
}

function someBasedEvery(arr, test) {
  return !arr.some((elem) => !test(elem));
}

console.log(loopBasedEvery([1, 3, 5], n => n < 10));
// → true
console.log(loopBasedEvery([2, 4, 16], n => n < 10));
// → false
console.log(loopBasedEvery([], n => n < 10));
// → true

console.log(someBasedEvery([1, 3, 5], n => n < 10));
// → true
console.log(someBasedEvery([2, 4, 16], n => n < 10));
// → false
console.log(someBasedEvery([], n => n < 10));
// → true