function drawTable(tableSize = 8) {
let output = ``;

  for (let i = 0; i < tableSize; i++) {
    for (let j = 0; j < tableSize; j++) {
      if (i % 2 === 0) {
        if (j % 2 === 0) {
          output += `#`;
        } else {
          output += ` `;
        }
      } else {
        if (j % 2 === 0) {
          output += ` `;
        } else {
          output += `#`;
        }
      }
    }
    output += '\n';
  }
  
  console.log(output);
}

drawTable();