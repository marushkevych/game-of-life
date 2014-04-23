var size = 20;
var scale = 10;
var positionLeft = "10px";
var positionTop = "10px";

var length = size * scale;

var board = new Board(size);
//var canvas=document.createElement("canvas");
//canvas.setAttribute("id", "canvas");
//if(document.body) document.body.appendChild(canvas);

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = length + 1;
canvas.height = length + 1;
canvas.style.left = positionLeft;
canvas.style.top = positionTop;
canvas.style.position = "absolute";

canvas.addEventListener("click", canvasClick, false);

function start() {
}

function canvasClick(e) {
    var cell = getClickedCell(e);
//    console.log(cell.x, cell.y)
    cell.isAlive = !cell.isAlive;
    drawCell(cell)
}

function getClickedCell(e) {
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
        console.log(x, y)
    }
    else {
        x = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
    }

//    x -= canvas.offsetLeft;
//    y -= canvas.offsetTop;
//      console.log(canvas.offsetLeft)
//      console.log(canvas.offsetTop)
    
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    console.log(x, y)
    if(x<0) x=0;
    if(y<0) y=0;
    
    // ajust for border
//    if(x>0) x-=1;
//    if(y>0) y-=1;

    var cell = board.getCell(Math.floor(x / scale) + 1,
            Math.floor(y / scale) +1) ;
    console.log(cell.x, cell.y)
    return cell;
}


// grid

for (var x = 0; x <= length; x += scale) {
    context.moveTo(x + 0.5, 0);
    context.lineTo(x + 0.5, length);
}

for (var y = 0; y <= length; y += scale) {
    context.moveTo(0, y + 0.5);
    context.lineTo(length, y + 0.5);
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
