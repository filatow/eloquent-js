function cloneDeep(target) {
  if (typeof(target) !== 'object') {
    return target;
  }
  let result;
  if (Array.isArray(target)) {
    result = [];
    for (let el of target) {
      result.push(cloneDeep(el));
    }
  } else {
    result = {};
    for (let [key, value] of Object.entries(target)) {
      result[key] = cloneDeep(value);
    }
  }
  return result;
}

function compareRobots(...robotPacks) {
  const testCount = 10000;
  const parcelsCount = 10;
  const results = [];
  for (let i = 0; i < testCount; i++) {
    const state = VillageState.random(parcelsCount);
    for (let [robot, memory] of robotPacks) {
      let currentState = new VillageState(
        state.place,
        cloneDeep(state.parcels)
      );
      Object.is(currentState.parcels, state.parcels);
      for (let turn = 0; ; turn++) {
        if (currentState.parcels.length === 0) {
          results.push(turn);
          break;
        }
        let action = robot(currentState, memory);
        currentState = currentState.move(action.direction);
        memory = action.memory;
      }
    }
  }
  const firstMedium = results
    .filter((el, ind) => (ind % 2 === 0))
    .reduce((accum, value) => (accum + value)) / testCount;
  const secondMedium = results
    .filter((el, ind) => (ind % 2 !== 0))
    .reduce((accum, value) => (accum + value)) / testCount;
  console.log("compareRobots :: firstMedium", firstMedium)
  console.log("compareRobots :: secondMedium", secondMedium)
}

// compareRobots(
//   [routeRobot, mailRoute],
//   [goalOrientedRobot, []]
// );