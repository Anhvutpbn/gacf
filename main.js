// Precondition: You need to require socket.io.js in your html page
// Reference link https://socket.io
// <script src="socket.io.js"></script>

const playerId = 'player1-xxx';
// LISTEN SOCKET.IO EVENTS
var start = false
// It it required to emit `join channel` event every time connection is happened
socket.on('connect', () => {
    document.getElementById('connected-status').innerHTML = 'ON';
    document.getElementById('socket-status').innerHTML = 'Connected';
    console.log('[Socket] connected to server');
    // API-1a
    socket.emit('join game', {game_id: gameId, player_id: playerId});
});

socket.on('disconnect', () => {
    console.warn('[Socket] disconnected');
    document.getElementById('socket-status').innerHTML = 'Disconnected';
});

socket.on('connect_failed', () => {
    console.warn('[Socket] connect_failed');
    document.getElementById('socket-status').innerHTML = 'Connected Failed';
});


socket.on('error', (err) => {
    console.error('[Socket] error ', err);
    document.getElementById('socket-status').innerHTML = 'Error!';
});


// SOCKET EVENTS

// API-1b
socket.on('join game', (res) => {
    console.log('[Socket] join-game responsed', res);
    document.getElementById('joingame-status').innerHTML = 'ON';
});

var myX, myY

//API-2
socket.on('ticktack player', (res) => {
    // console.info('> ticktack');
    // console.log('[Socket] ticktack-player responsed, map_info: ', res.map_info);
    if (start) return;
    start = true;
    currentMap = res.map_info.map
    players = res.map_info.players
    // console.log("player position = " + JSON.stringify(players[0].currentPosition))
    // lay ra x y , map
    myX = players[0].currentPosition.col; //15
    myY = players[0].currentPosition.row; // 3
    document.getElementById('ticktack-status').innerHTML = 'ON';
    driveLoop(currentMap);
});


function driveLoop(currentMap) {
    MAP = currentMap
    let path = ProcessGetDirection.findPath(myX, myY)
    let step = "", destX, destY = null;
    if (path === false) {
        return true
    }
    console.log("=========> " + myX + "," + myY)
    console.log(MAP)
    for (let index = 1; index < path.length; index++) {
        const element = path[index];

        let nextStepLocation = element;
        let previousLocation = path[index - 1]
        let x = previousLocation.x
        let y = previousLocation.y;

        console.log("Next step location = " + JSON.stringify(nextStepLocation))
        destX = nextStepLocation.x;
        destY = nextStepLocation.y;
        let direction = 'x';
        if (x == destX) {
            // di len hoac di xuong
            if (destY > y) {
                direction = '4' // di xuong
            } else if (destY < y) {
                direction = '3' // di len
            } else {
                // da den noi ---> todo tim huong tiep theo
            }
        } else if (y == destY) {
            // di trai hoac di phai
            if (destX > x) {
                direction = '2' // sang phai
            } else if (destX < x) {
                direction = '1' // sang trai
            } else {
                // da den noi ---> todo tim huong tiep theo
            }
        } else {
            // da den noi hoac vi tri di treo
        }
        step = step + direction;

    }
    drive(step, destX, destY);
}

// API-3a
// socket.emit('drive player', { direction: '111b333222' });

//API-3b
socket.on('drive player', (res) => {
    // console.log('[Socket] drive-player responsed, res: ', res);
    // findPath
    start = false

});

function onStartDirection() {
    MAP = currentMap
    let manual = $('#manual').val()
    let cor = manual.split(",");

    console.log('saddddd----' + cor)
    console.log('currentMap----' + currentMap)
    driveLoop(currentMap);
}

function onManualDrive() {
    drive($('#manual').val())
}

function drive(d, x, y) {
    console.log("Move direction = " + d);
    let pathAvoid = pathAvoidBomb(x, y) || "";
    socket.emit("drive player", {direction: d + 'b' + pathAvoid})
}

function pathAvoidBomb(x, y) {
    let path = [
        '13', '14', '23', '24',
        '31', '41', '32', '42',
        '113', '114', '223', '224',
        '311', '411', '322', '422',
        '133', '144', '233', '244',
        '331', '441', '332', '442',
        '1133', '1144', '2233', '2244',
        '3311', '4411', '3322', '4422',
        '1331', '1441', '2332','2442',
        '1313','1414','2323','2424',
        '3131','4141','3232','4242',
        '3113','4114','3223','4224',
    ];
    let av_path = [];
    for(let i = 0; i < path.length; i++) {
        if(canMove(x,y, path[i])) {
            av_path.push(path[i])
        }
    }
    //return random available path
    return _.sample(av_path);
}

function canMove(x, y, d) {
    let arr_d = d.split("");
    for (let i = 0; i < arr_d.length; i++) {
        switch (arr_d[i]) {
            case 1:
                x = x - 1;
                break;
            case 2:
                x = x + 1;
                break;
            case 3:
                y = y - 1;
                break;
            case 4:
                y = y + 1;
                break;
        }
    }
    return Medic.checkAvailablePoint(x,y)
}