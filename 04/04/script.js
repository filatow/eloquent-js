function deepEqual(A, B) {
  if (typeof(A) !== typeof(B)) {
    return false;
  }
  if (typeof(A) !== `object` && typeof(B) !== `object`) {
    return (A === B);
  } else {
    if (A === null && B === null) {
      return true;
    } else {
      if (Object.keys(A).length !== Object.keys(B).length) {
        return false;
      }
      for (let key of Object.keys(A)) {
        if (!deepEqual(A[key], B[key])) {
          return false;
        };
      }
      return true;
    }
  }
}


var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true