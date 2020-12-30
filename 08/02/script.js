const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: ['mandarin','banana','pear',],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function someCulc(obj) {
  for (let elem of obj.content) {
    console.log('А в коробочке-то есть: ', elem);
  }
}

function withBoxUnlocked(func) {
  const isLocked = box.locked;
  if (isLocked) box.unlock();
  try {
    func(box);
  } catch(e) {
    console.log(e.message);
  } finally {
    if (isLocked) box.lock();
  }
}

withBoxUnlocked(someCulc);
// console.log(box.content);