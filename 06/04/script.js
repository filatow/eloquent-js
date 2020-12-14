const testObj = {
  first: `first`,
  randomProperty() {
    console.log(`this is randomProperty`);
  },
  hasOwnProperty(p) {
    console.log(`this is hasOwnProperty  with ${p}`);
    return `done`;
  }
}

console.log(`test ::`, Object.prototype.hasOwnProperty.call(testObj, `randomProperty`));
