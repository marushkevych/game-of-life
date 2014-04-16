var filled;
var board = new Board(30);
var scale = 10;
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.addEventListener("click", canvasClick, false);

function start() {
}

function canvasClick(e) {
    var cell = getClickedCell(e);
    console.log(cell.x, cell.y)
    cell.isAlive = !cell.isAlive;
    drawCell(cell)
}

function getClickedCell(e) {
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
    }

//    x -= gCanvasElement.offsetLeft;
//    y -= gCanvasElement.offsetTop;

    var cell = board.getCell(Math.floor(x / scale),
            Math.floor(y / scale));
    return cell;
}


// grid

for (var x = 0.5; x < 520; x += scale) {
    context.moveTo(x, 0);
    context.lineTo(x, 380);
}

for (var y = 0.5; y < 390; y += scale) {
    context.moveTo(0, y);
    context.lineTo(510, y);
}

context.strokeStyle = "#eee";
context.stroke();


// dots

//context.fillRect(0, 0, 10, 10);
//context.fillRect(10, 10, 10, 10);
//context.fillRect(490, 360, 10, 10);
//
//for (var i = 0; i <= 370; i += 10) {
//  context.fillRect(i, i, 10, 10);
//  console.log('i=',i)
//}

var board = new Board(30);
board.cells[5].isAlive = true
board.cells[160].isAlive = true

// draw cells
board.cells.forEach(function(cell) {
    drawCell(cell);
});

function drawCell(cell) {
    if (cell.isAlive)
        context.fillRect(cell.x * scale - scale + 1, cell.y * scale - scale + 1, scale - 1, scale - 1);
    else
        context.clearRect(cell.x * scale - scale + 1, cell.y * scale - scale + 1, scale - 1, scale - 1);
}
