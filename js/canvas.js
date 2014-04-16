var filled;
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
function draw_b() {
  filled ? context.clearRect(50, 20, 150, 100) : context.fillRect(50, 25, 150, 100);
  filled = !filled;
}

// grid

for (var x = 0.5; x < 520; x += 10) {
  context.moveTo(x, 0);
  context.lineTo(x, 380);
} 

for (var y = 0.5; y < 390; y += 10) {
  context.moveTo(0, y);
  context.lineTo(510, y);
}

context.strokeStyle = "#eee";
context.stroke();

// coordinates

context.beginPath();
context.moveTo(0, 40);
context.lineTo(240, 40);
context.moveTo(260, 40);
context.lineTo(500, 40);
context.moveTo(495, 35);
context.lineTo(500, 40);
context.lineTo(495, 45);

context.moveTo(60, 0);
context.lineTo(60, 153);
context.moveTo(60, 173);
context.lineTo(60, 375);
context.moveTo(65, 370);
context.lineTo(60, 375);
context.lineTo(55, 370);


context.strokeStyle = "#000";
context.stroke();

// name the axes

context.font = "bold 12px sans-serif";
context.fillText("x", 248, 43);
context.fillText("y", 58, 165);

context.font = "bold 12px sans-serif";
context.fillText("x", 248, 43);
context.fillText("y", 58, 165);

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

// draw cells
board.cells.forEach(function(cell){
    if(cell.isAlive)
    context.fillRect(cell.x*10-10, cell.y*10-10, 10, 10);
});
