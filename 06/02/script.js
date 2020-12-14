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
}


let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false