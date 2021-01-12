// Precondition: You need to require socket.io.js in your html page
// Reference link https://socket.io
// <script src="socket.io.js"></script>

const playerId = 'player2-xxx';
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

var myX,myY

//API-2
socket.on('ticktack player', (res) => {
    console.info('> ticktack');
    // console.log('[Socket] ticktack-player responsed, map_info: ', res.map_info);
    if(start) return;
    start = true;
    currentMap = res.map_info.map
    players = res.map_info.players
    console.log("player position = "+ JSON.stringify(players[0].currentPosition))
    // lay ra x y , map
    myX = players[1].currentPosition.col; //15
    myY = players[1].currentPosition.row; // 3
    document.getElementById('ticktack-status').innerHTML = 'ON';
    driveLoop(currentMap);
});



function driveLoop(currentMap){
    MAP = currentMap
    let path = ProcessGetDirection.findPath(myX,myY)
    let step ="";
    if(path === false) {
        return true
    }
    console.log("=========> "+myX+","+myY)
    console.log(MAP)
    for (let index = 1; index < path.length; index++) {
        const element = path[index];

        let nextStepLocation = element;
        let previousLocation = path[index-1]
        let x = previousLocation.x
        let y = previousLocation.y;

        console.log("Next step location = "+ JSON.stringify(nextStepLocation))
        let destX = nextStepLocation.x;
        let destY = nextStepLocation.y;
        let direction = 'x';
        if(x == destX){
            // di len hoac di xuong
            if(destY > y){
                direction = '4' // di xuong
            }else if(destY < y){
                direction = '3' // di len
            }else{
                // da den noi ---> todo tim huong tiep theo
            }
        }else if(y == destY){
            // di trai hoac di phai
            if(destX > x){
                direction = '2' // sang phai
            }else if(destX < x){
                direction = '1' // sang trai
            }else{
                // da den noi ---> todo tim huong tiep theo
            }
        }else{
            // da den noi hoac vi tri di treo
        }
        step= step+ direction;

    }
    drive(step);
}
// API-3a
// socket.emit('drive player', { direction: '111b333222' });

//API-3b
socket.on('drive player', (res) => {
    console.log('[Socket] drive-player responsed, res: ', res);
    // findPath
    start = false

});
function onStartDirection(){
    MAP = currentMap
    let manual = $('#manual').val()
    let cor = manual.split(",");

    console.log('saddddd----'+cor)
    console.log('currentMap----'+currentMap)
    driveLoop(currentMap);
}
function onManualDrive() {
    drive($('#manual').val())
}

function drive(d){
    console.log("Move direction = "+d)
    socket.emit("drive player", {direction: d+'b'})
}
