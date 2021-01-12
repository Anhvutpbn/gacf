Danger = {};
Danger.map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,0,0,1,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

Danger.playerRow = 18;
Danger.playerCol = 7;
Danger.rada = 5;
Danger.mapRow = 26;
Danger.mapCol = 14

Danger.MAP_VIRUS = 2;
Danger.MAP_BOMB = 3;
Danger.MAP_ZOMEBIE = 4;

Danger.minPosition = function (x) {
    if(x <= Danger.rada) {
        return 0;
    } else {
        return x - Danger.rada;
    }
}

Danger.maxPosition = function (x, max) {
    if ((x + Danger.rada) >= max) {
        return max;
    } else {
        return x + Danger.rada;
    }
}

Danger.coordinates = function () {
    let virus = [];
    let bomb = [];
    let zombie = [];
    let result = [];
    let minRow = Danger.minPosition(Danger.playerRow)
    let minCol = Danger.minPosition(Danger.playerCol)
    let maxRow = Danger.maxPosition(Danger.playerRow, Danger.mapRow)
    let maxCol = Danger.maxPosition(Danger.playerCol, Danger.mapCol)

    for (let i = minCol; i < maxCol; i++) {
        for (let y = minRow; y < maxRow; y++) {
            if(Danger.map[i][y] === Danger.MAP_BOMB) {
                result = result.concat(Danger.getListBomb(i,y));
            }

            if(Danger.map[i][y] === Danger.MAP_VIRUS) {
                result = result.concat(Danger.getListVirusZombie(i,y));
            }

            if(Danger.map[i][y] === Danger.MAP_ZOMEBIE) {
                result = result.concat(Danger.getListVirusZombie(i,y));
            }
        }
    }

    return result;
}

Danger.getListBomb = function (col,row) {
    let result = [];
    for(let i = 0; i < Danger.mapCol; i++) {
        result.push({'col': i, 'row': row})
    }
    for(let y = 1; y < Danger.mapRow; y++) {
        result.push({'col': y, 'row': col})
    }

    return result;
}

Danger.getListVirusZombie = function (col,row) {
    let result = [];
    for(let i = col - 1; i <= col + 1; i++) {
        result.push({'col': i, 'row': row})
    }
    for(let y = row - 1; y <= row + 1; y++) {
        result.push({'col': y, 'row': col})
    }
    return result;
}