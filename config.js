const gameId = 'fd224e99';

const D_LEFT = 1, D_RIGHT = 2, D_UP = 3, D_DOWN = 4;
const D_BOMB = "b"
const D_STOP = "x"
// const MAP = {
//     EMPTY: 0,
//     WOOD: 2,
//     BRICK: 1
// }
var MAP = {};
let currentMap = {};
let players;

// Connecto to API App server
const apiServer = 'https://codefest.techover.io';
const socket = io.connect(apiServer, {reconnect: true, transports: ['websocket']});

