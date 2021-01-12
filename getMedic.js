var MAP = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,4,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,2,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
]

var Medic = {}
Medic.wall = 1;
Medic.balk = 2;
Medic.findPath = function(fromX,fromY){
    let coordinate = [{x: fromX, y: fromY, loopIndex: 0}];

    // sét các tọa độ nguy hiểm thành tường đá
    // ProcessGetDirection.map = ProcessGetDirection.convertDangerToWall(Danger.coordinates(), MAP)
    let loopIndex = 0;
    let flag = true;
    do {
        if(loopIndex == 0) {
            coordinate = [{x: fromX, y: fromY, loopIndex: 0}]
        } else {
            let pathTemp = [...coordinate];
            for (let index = 0; index < pathTemp.length; index++) {
                const element = pathTemp[index];
                let result = Medic.getCoordinates(element.x, element.y, coordinate, loopIndex)
                if(result.status === false) {
                    flag = false
                    console.log(result.data)
                    break
                } else {
                    coordinate = result.data
                }
            }
        }
        
        loopIndex++;
    } while (loopIndex <= 4);
}

Medic.getCoordinates = function (row, col, coordinate, loopIndex) {
    let up = { row: row, col: col - 1 }
    let down = { row: row, col: col + 1 }
    let left = { row: row - 1, col: col}
    let right = { row: row + 1, col: col}
    if(Medic.checkWall(up) 
        || Medic.checkWall(down)
        || Medic.checkWall(left)
        || Medic.checkWall(right)) {
        return {status: false, data: {row, col}};
    } 
    let result = Medic.getStep(row, col, loopIndex, coordinate);
    return {status: true , data: result }
}

Medic.checkWall = function (coordinate) {
    if(MAP[coordinate.row][coordinate.col] == Medic.balk) {
        return true;
    } 
    return false;
}

Medic.getStep =  function (x, y, loopIndex, pathTemp){
    let yUp = y-1
    let sUp = {
        x,
        y : yUp,
        loopIndex
    };

    let xLeft = (x-1)
    let sLeft = {
        x: xLeft,
        y,
        loopIndex
    };

    let xRight =(x+1)
    let sRight = {
        x: xRight,
        y,
        loopIndex
    };

    let yDown =(y+1);
    let sDown = {
        x,
        y: yDown,
        loopIndex
    };

    let isExistsUp = Medic.isExist(loopIndex,x,yUp, pathTemp);
    if(!isExistsUp){
        pathTemp.push(sUp);
    }
    let isExistsLeft = Medic.isExist(loopIndex,xLeft,y, pathTemp);
    if(!isExistsLeft){
        pathTemp.push(sLeft);
    }
    let isExistsRight = Medic.isExist(loopIndex,xRight,y, pathTemp);
    if(!isExistsRight){
        pathTemp.push(sRight);
    }
    let isExistsDown = Medic.isExist(loopIndex,x,yDown, pathTemp);
    if(!isExistsDown){
        pathTemp.push(sDown);
    }

    return pathTemp
}

Medic.isExist = function (loopIndex,x,y, pathTemp){
    let isExistsUp = false
    if( pathTemp.findIndex(element => element.x === x && element.y === y ) != -1
        || MAP[y][x] === Medic.wall   || MAP[y][x] === Medic.balk){
        isExistsUp = true
    }
    return isExistsUp;
}

Medic.findPath(1,1)