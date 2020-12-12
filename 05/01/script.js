let arrays = [[1, 2, 3], [4, 5], [6]];
// → [1, 2, 3, 4, 5, 6]

function flattening(inputArr) {
  let resultArr = inputArr.reduce((result, current) => {
    return result.concat(current);
  }, []);
  return resultArr;
}

console.log(flattening(arrays));