function improvedRobot({place, parcels}, route) {
  if (route.length == 0) {
  const allRouts = [];
    for (let parcel of parcels) {
      let r;
      if (parcel.place != place) {
        r = findRoute(roadGraph, place, parcel.place);
        allRouts.push({
          route: r,
          isDelivering: false
        });
      } else {
        r = findRoute(roadGraph, place, parcel.address);
        allRouts.push({
          route: r,
          isDelivering: true
        })
      }
    }
    allRouts
      // .sort((a, b) => (a.route.length - b.route.length)); // решение 1
      .sort((a, b) => (b.route.length - a.route.length)) // решение 2
      .sort((a, b) => {
        if (
          (a.route.length === b.route.length) &&
          (a.isDelivering === true) &&
          (b.isDelivering === false)
        ) {
          return 1;
        }
        return -1;
      });
    return {
      direction: allRouts[0].route[0],
      memory: allRouts[0].route.slice(1)
    }
  }
  return {
    direction: route[0],
    memory: route.slice(1)
  }
}

compareRobots(
  [routeRobot, mailRoute],
  // [goalOrientedRobot, []],
  [improvedRobot, []],
);