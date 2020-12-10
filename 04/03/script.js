function arrayToList(arr) {
  const list = {};
  list.value = arr[0];
  let restOfArr = arr.slice(1);
  if (restOfArr.length) {
    list.rest = arrayToList(restOfArr);
  } else {
    list.rest = null;
  }
  return list;
}

function listToArray(list) {
  const arr = [];
  let rest = list;
  while (rest) {
    arr.push(rest.value);
    rest = rest.rest;
  };
  return arr;
}

function prepend(value, rest) {
  return {
    value,
    rest
  }
}

function nth(list, ind) {
  if (ind === 0) {
    return list.value;
  } else if (list.rest) {
    return nth(list.rest, ind - 1);
  }
  return undefined;
}


// console.dir(arrayToList([10, 20, 30, 40, 50]));
// console.log(listToArray(arrayToList([10, 20, 30, 40, 50])));
// console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10, 20, 30]), 2));