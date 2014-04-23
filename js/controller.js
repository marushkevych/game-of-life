var _ = require('underscore');
var GridModel = require('./grid/GridModel');
var size = 50;
var canvas = document.getElementById("canvas");
var startButton = document.getElementById("start");
startButton.addEventListener("click", start, false);
var stopButton = document.getElementById("stop");
stopButton.addEventListener("click", stop, false);

var view = require('./grid/GridView').init(canvas, {size:size,positionLeft:"100px",positionTop:"100px"});
var model = new GridModel(size);

view.onCellClick(function(cell){
    var modelCell = model.getCell(cell.x, cell.y);
    modelCell.isAlive = !modelCell.isAlive;
    
    // this should be handled by observer (view should observe model's "change cell state" event)
    modelCell.isAlive ? view.fillCell(cell) : view.clearCell(cell);
});

view.paintGrid();

var intervalId;

function stop(){
    clearInterval(intervalId);
}

// main loop
function start(){
    intervalId = setInterval(tick, 200);
    
    function tick(){
        // gather changes
        var changes = [];
        model.eachCell(function(cell){
            var nextSate = getNextState(cell);
            var currentState = !!cell.isAlive;
            if(nextSate != currentState){
                changes.push({cell:cell, isAlive:nextSate});
            }
        });
        
        //apply changes
        changes.forEach(function(change){
            change.cell.isAlive = change.isAlive;
            change.isAlive ? view.fillCell(change.cell) : view.clearCell(change.cell);
        });
    }
}

function getNextState(cell){
    var neighbors = model.getNeighbors(cell.x, cell.y);
    var lifeScore = _.reduce(neighbors, function(memo, neighbor){
        if(neighbor.isAlive) return memo +  1;
        else return memo;
    }, 0);
    
    
    if(lifeScore < 2){
        return false;
    } else if(lifeScore === 2) {
        return cell.isAlive;
    } else if(lifeScore === 3){
        return true;
    } else {
        return false;
    }
}