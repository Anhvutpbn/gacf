/**
 *
 */

let MyItems = {
    bombs: [],
    AddBomb: function (col, row) {
        this.bombs.push({col, row})
    },
    LastBomb: function () {
        return _.last(this.bombs)
    }
}

/**
 * Xử lý nhận biết đối tượng: nguy hiểm/dân thường
 */

let DetectFn = {}

DetectFn.IsVirus = function (col, row) {

}


/**
 * @return true
 */
DetectFn.ShouldMove = function () {

}

/**
 *
 * @param col
 * @param row
 */
DetectFn.GetAvailableArea = function (col, row) {

}


/**
 * Xử lý di chuyển
 *
 */
let Driver = {}

//đặt bom
Driver.PutBomb = function () {

}

//né bom vừa đặt
Driver.AvoidBomb = function () {

}


Driver.IsLeftOfPixel = function (col, row) {

}

Driver.IsRightOfPixel = function (col, row) {

}

Driver.IsTopOfPixel = function (col, row) {

}

Driver.IsBottomOfPixel = function (col, row) {

}
Driver.StepMove = function (step, type) {
    let d;
    if (type === 'v') {
        //di chuyen doc
        for (var i = 0; i < Math.abs(step); i++) {
            if (step < 0) {
                d += '4';
            } else {
                d += '3'
            }
        }
    }
    if (type === 'h') {
        //di chuyen ngang
        for (var i = 0; i < Math.abs(step); i++) {
            if (step < 0) {
                d += '1';
            } else {
                d += '2'
            }
        }
    }
    return d
}

ObjectHistory = {}

Mapping = {
    map: currentMap || {
        size : {
            col: 0,
            row: 0
        }
    },
    size: {
        col: currentMap.size.col,
        row: currentMap.size.row
    }
}

Mapping.pixel = function (col, row) {
    return this.map[row][col]
}

Player = {
    MyPlayer: function (players) {
        players.forEach(function (player) {
            if (player.id === playerId) {
                return player
            }
        })
    },
    MyPosition: function () {
        return this.MyPlayer(players).currentPosition
    }
}
