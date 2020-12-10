function reverseArray(arr) {
  const reversedArray = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversedArray.push(arr[i]);
  }
  return reversedArray;
}


function reverseArrayInPlace(arr) {
  const reversedArray = reverseArray(arr);
  for (let i = 0; i < reversedArray.length; i++) {
    arr[i] = reversedArray[i];
  }
  return arr;
}


console.log(reverseArray(["A", "B", "C", "D", "E"]));
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
