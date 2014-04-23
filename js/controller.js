var _ = require('underscore');
var GridModel = require('./grid/GridModel');
var size = 100;
var canvas = document.getElementById("canvas");
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var clearButton = document.getElementById("clear");
startButton.addEventListener("click", start, false);
stopButton.addEventListener("click", stop, false);
clearButton.addEventListener("click", clear, false);

var text = document.getElementById("text");
text.style.left = '20px';
text.style.top = '840px';
text.style.position = "absolute";        

var view = require('./grid/GridView').init(canvas, {size: size, scale: 7, positionLeft: "20px", positionTop: "120px"});
var model = new GridModel(size);

view.onCellClick(function(cell) {
    var modelCell = model.getCell(cell.x, cell.y);
    modelCell.isAlive = !modelCell.isAlive;

    // this should be handled by observer (view should observe model's "change cell state" event)
    modelCell.isAlive ? view.fillCell(cell) : view.clearCell(cell);
});

view.paintGrid();

// initial setup
model.getCell(2,3).isAlive=true;
model.getCell(3,4).isAlive=true;
model.getCell(4,2).isAlive=true;
model.getCell(4,3).isAlive=true;
model.getCell(4,4).isAlive=true; 
model.getCell(39,46).isAlive=true; 
model.getCell(39,47).isAlive=true; 
model.getCell(39,48).isAlive=true; 
model.getCell(40,45).isAlive=true; 
model.getCell(40,49).isAlive=true; 
model.getCell(41,44).isAlive=true; 
model.getCell(41,50).isAlive=true; 
model.getCell(42,44).isAlive=true; 
model.getCell(42,50).isAlive=true; 
model.getCell(43,47).isAlive=true; 
model.getCell(44,45).isAlive=true; 
model.getCell(44,49).isAlive=true; 
model.getCell(45,46).isAlive=true; 
model.getCell(45,47).isAlive=true; 
model.getCell(45,48).isAlive=true; 
model.getCell(46,47).isAlive=true;    
model.eachCell(function(cell) {
    cell.isAlive ? view.fillCell(cell) : view.clearCell(cell);
});    

function clear(){
    model.eachCell(function(cell) {
        cell.isAlive = false;
        view.clearCell(cell);
    });
}
        


var intervalId;

function stop() {
    startButton.style.display = "inline";
    clearButton.style.display = "inline";
    stopButton.style.display = "none";
    clearInterval(intervalId);
}

// main loop
function start() {
    startButton.style.display = "none";
    clearButton.style.display = "none";
    stopButton.style.display = "inline";
    intervalId = setInterval(tick, 200);

    // log initial setup
    model.eachCell(function(cell) {
        if(cell.isAlive) console.log("model.getCell("+cell.x+"," +  cell.y +").isAlive=true;")
    });


    function tick() {
        // gather changes
        var changes = [];
        model.eachCell(function(cell) {
            var nextSate = getNextState(cell);
            var currentState = !!cell.isAlive;
            if (nextSate != currentState) {
                changes.push({cell: cell, isAlive: nextSate});
            }
        });

        //apply changes
        if (changes.length === 0)
            stop();
        
        changes.forEach(function(change) {
            change.cell.isAlive = change.isAlive;
            change.isAlive ? view.fillCell(change.cell) : view.clearCell(change.cell);
        });
    }
}

function getNextState(cell) {
    var neighbors = model.getNeighbors(cell.x, cell.y);
    var lifeScore = _.reduce(neighbors, function(memo, neighbor) {
        if (neighbor.isAlive)
            return memo + 1;
        else
            return memo;
    }, 0);


    if (lifeScore < 2) {
        return false;
    } else if (lifeScore === 2) {
        return cell.isAlive;
    } else if (lifeScore === 3) {
        return true;
    } else {
        return false;
    }
}