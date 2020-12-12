require('./unicode-base');

function countBy(items, groupFunc) {
  let counts = [];
  for (let item of items) {
    let name = groupFunc(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

console.log(characterScript(111));
// → {name: "Latin", …}

function groupByDirection(char) {
  let script = characterScript(char.codePointAt(0));
  return script ? script.direction : `none`;
}

function dominantDirection(text) {
  let scripts = countBy(text, groupByDirection)
    .filter(({name}) => name !== `none`);
  let result = scripts.reduce(
    (result, current) => (current.count > result.count ? current : result)
  );
  return result.name;
}

console.log(`"Hello!" dominantDirection `, dominantDirection("Hello!"));
// → ltr
console.log(`"Hey, مساء الخير" dominantDirection `, dominantDirection("Hey, مساء الخير"));
// → rtl