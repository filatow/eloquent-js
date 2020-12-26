const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];
const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) {
          return p; // не меняем местоположение посылки, т.к. робот ее еще не подобрал
        }
        return { // меняем местоположение посылки, т.к. робот уже подобрал посылку
          place: destination,
          address: p.address
        };
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }

  static random(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address});
    }
    return new VillageState('Post Office', parcels);
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length === 0) {
      console.log(`Выполнено за ${turn} ходов`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Переход в направлении ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function findRoute(graph, from, to) {
  /*  множество мест, которые должны быть исследованы в ближайшее время,
  а также маршрут, который нас туда доставил */
  let work = [
    {  // начальная точка и пустой маршрут
      at: from,
      route: []
    }
  ];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {  // для каждого доступного узла из места 'at'
      if (place == to) {  // если узел равен 'to' (место назначения)
        return route.concat(place);  // возвращаем значение route + узел
      }
      /*  Если среди элементов рабочего списка нет элемента
      со значением at = place (текущий узел)  */
      if (!work.some(w => w.at == place)) {
        work.push(  // тогда добавляем новый элемент в рабочий список 
          {
            at: place,  // текущий узел
            route: route.concat(place)  // к текущему пути прибавляем значение текущего узла
          }
        );
      }
    }
  }
}

function randomRobot(state) {
  return {
    direction: randomPick(roadGraph[state.place])
  }
}

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {
    direction: memory[0],
    memory: memory.slice(1)
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {  // если в параметр memory не передан маршрут
    let parcel = parcels[0];  // берем первую посылку из списка
    // если местонахождение посылки не совпадает с местонахождением бота
    if (parcel.place != place) {
      // находим путь от местоположения бота, до местонахождения посылки
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      // иначе находим путь от местоположения бота, до адреса доставки посылки
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {
    direction: route[0],
    memory: route.slice(1)
  }
}

const roadGraph = buildGraph(roads);
// runRobot(VillageState.random(), randomRobot);
// runRobot(VillageState.random(), routeRobot, mailRoute);
runRobot(VillageState.random(), goalOrientedRobot, []);

