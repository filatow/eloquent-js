class Group {
  constructor() {
    this.group = [];
  }

  add(element) {
    if (this.group.indexOf(element) === -1) {
      this.group.push(element);
    }
  }

  delete(element) {
    const indexOfElement = this.group.indexOf(element);

    if (indexOfElement !== -1) {
      this.group =
        this.group.slice(0, indexOfElement)
        .concat(this.group.slice(indexOfElement + 1));
    }
  }

  has(element) {
    if (this.group.indexOf(element) !== -1) {
      return true;
    }
    return false;
  }

  static from(iterable) {
    let group = new Group;
    for (let elem of iterable) {
      group.add(elem);
    }
    return group;
  }

  [Symbol.iterator]() {
    const group = this.group;
    let counter = 0;
    return {
      next() {
        if (counter < group.length) {
          counter++;
          return {
            value: group[counter - 1],
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

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c