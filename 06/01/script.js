class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.sqrt(
        Math.pow(0 - this.x, 2) + Math.pow(0 - this.y, 2)
      );
  } 
}

Vec.prototype.minus = function(vector) {
  const newX = this.x - vector.x;
  const newY = this.y - vector.y;
  return new Vec(newX, newY);
}

Vec.prototype.plus = function(vector) {
  const newX = this.x + vector.x;
  const newY = this.y + vector.y;
  return new Vec(newX, newY);
}

Vec.prototype.toString = function() {
  return `(${this.x}, ${this.y})`;
};


// let v = new Vec(5, 10);
// let plusV = v.plus(new Vec(1, 2));
// let minusV = v.minus(new Vec(2, 4));

// console.log(String(plusV));
// console.log(minusV);
// console.log(new Vec(20, 30).length);

// Your code here.

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5