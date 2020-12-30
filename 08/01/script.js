"use strict";

class OriginError extends Error {};

function primitiveMultiply(first = 2, second = 4) {
  const random = Math.ceil((Math.random() * 10));
  if (random > 2) {
    throw new OriginError("Особая ошибка");
  }
  const result = (first * second);
  console.log(`result = ${result}`);
  return result;
}

function repeatUntillDone(func) {
  let done = false;
  let result = null;
  do {
    try {
      result = func();
      done = true;
    } catch(e) {
      if (e instanceof OriginError) {
        console.log("Сбой, будет выполнена повторная попытка");
      } else {
        console.log(e.message);
      }
    }
  } while (!done);

  return result;
}


console.log(repeatUntillDone(primitiveMultiply));