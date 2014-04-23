var _ = require('underscore');
var GridModel = require('./grid/GridModel');
var size = 100;
var canvas = document.getElementById("canvas");
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var clearButton = document.getElementById("clear");
var buttons = document.getElementById("buttons");
var sample1 = document.getElementById("1");
var sample2 = document.getElementById("2");
startButton.addEventListener("click", start, false);
stopButton.addEventListener("click", stop, false);
clearButton.addEventListener("click", clear, false);
sample1.addEventListener("click", sampleSetup, false);
sample2.addEventListener("click", simmetricSetup, false);

var text = document.getElementById("text");
text.style.left = '20px';
text.style.top = '820px';
text.style.position = "absolute";        

var view = require('./grid/GridView').init(canvas, {size: size, scale: 7, positionLeft: "20px", positionTop: "100px"});
var model = new GridModel(size);
var intervalId;

view.onCellClick(function(cell) {
    var modelCell = model.getCell(cell.x, cell.y);
    modelCell.isAlive = !modelCell.isAlive;

    // this should be handled by observer (view should observe model's "change cell state" event)
    modelCell.isAlive ? view.fillCell(cell) : view.clearCell(cell);
});

view.paintGrid();
console.log(window.location.search)
if(window.location.search == "?cool")
    simmetricSetup();
else
    sampleSetup();

function simmetricSetup(){
    clear();
    model.getCell(43,50).isAlive=true; 
    model.getCell(44,49).isAlive=true; 
    model.getCell(44,51).isAlive=true; 
    model.getCell(45,49).isAlive=true; 
    model.getCell(45,51).isAlive=true; 
    model.getCell(46,50).isAlive=true; 
    model.getCell(48,45).isAlive=true; 
    model.getCell(48,46).isAlive=true; 
    model.getCell(48,54).isAlive=true; 
    model.getCell(48,55).isAlive=true; 
    model.getCell(49,44).isAlive=true; 
    model.getCell(49,47).isAlive=true; 
    model.getCell(49,53).isAlive=true; 
    model.getCell(49,56).isAlive=true; 
    model.getCell(49,57).isAlive=true; 
    model.getCell(50,45).isAlive=true; 
    model.getCell(50,46).isAlive=true; 
    model.getCell(50,54).isAlive=true; 
    model.getCell(50,55).isAlive=true; 
    model.getCell(52,50).isAlive=true; 
    model.getCell(53,49).isAlive=true; 
    model.getCell(53,51).isAlive=true; 
    model.getCell(54,49).isAlive=true; 
    model.getCell(54,51).isAlive=true; 
    model.getCell(55,50).isAlive=true; 
    
    model.eachCell(function(cell) {
        cell.isAlive ? view.fillCell(cell) : view.clearCell(cell);
    });     
}

function sampleSetup(){
    clear();
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

    model.getCell(67,75).isAlive=true; 
    model.getCell(67,79).isAlive=true; 
    model.getCell(68,75).isAlive=true; 
    model.getCell(68,79).isAlive=true; 
    model.getCell(69,75).isAlive=true; 
    model.getCell(69,79).isAlive=true; 
    model.getCell(70,75).isAlive=true; 
    model.getCell(70,79).isAlive=true; 
    model.getCell(71,75).isAlive=true; 
    model.getCell(71,79).isAlive=true; 

    model.eachCell(function(cell) {
        cell.isAlive ? view.fillCell(cell) : view.clearCell(cell);
    });    
}

function clear(){
    model.eachCell(function(cell) {
        cell.isAlive = false;
        view.clearCell(cell);
    });
}
        



function stop() {
    buttons.style.display = "inline";
    stopButton.style.display = "none";
    clearInterval(intervalId);
}

function logCurrentState(){
    model.eachCell(function(cell) {
        if(cell.isAlive) console.log("model.getCell("+cell.x+"," +  cell.y +").isAlive=true;")
    });
}


// main loop
function start() {
    buttons.style.display = "none";
    stopButton.style.display = "inline";
    intervalId = setInterval(tick, 150);

    // log initial setup
//    logCurrentState();

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