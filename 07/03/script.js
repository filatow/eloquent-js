class PGroup {
  constructor(arr = []) {
    this._pGroup = arr;
  }

  _add(element) {
    if (this._pGroup.indexOf(element) === -1) {
      this._pGroup.push(element);
    }
  }

  add(element) {
    let result;
    if (this._pGroup.indexOf(element) === -1) {
      result = PGroup.from([...Array.from(this._pGroup), element]);
    } else {
      result = PGroup.from([...Array.from(this._pGroup)]);
    }
    return result;
  }

  delete(element) {
    const indexOfElement = this._pGroup.indexOf(element);
    let result;

    if (indexOfElement >= 0) {
      result = PGroup.from(
        this._pGroup.slice(0, indexOfElement)
        .concat(this._pGroup.slice(indexOfElement + 1))
      );
    } else {
      result = PGroup.from([...Array.from(this._pGroup)]);
    }
    return result;
  }

  has(element) {
    if (this._pGroup.indexOf(element) >= 0) {
      return true;
    }
    return false;
  }

  static from(iterable) {
    let pGroup = new PGroup();
    for (let elem of iterable) {
      pGroup._add(elem);
    }
    return pGroup;
  }

  [Symbol.iterator]() {
    const pGroup = this._pGroup;
    let counter = 0;
    return {
      next() {
        if (counter < pGroup.length) {
          counter++;
          return {
            value: pGroup[counter - 1],
            done: false
          }
        }
        return {
          done: true
        }
        
      }
    }
  }
}

PGroup.empty = new PGroup();

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false