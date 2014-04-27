var _ = require('underscore');
var grid = require('game-grid');
var url = require('url');

var size = 100;
var canvas = document.getElementById("canvas");
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var clearButton = document.getElementById("clear");
var buttons = document.getElementById("buttons");
//var share = document.getElementById("share");
startButton.addEventListener("click", start, false);
stopButton.addEventListener("click", stop, false);
clearButton.addEventListener("click", clear, false);
//share.addEventListener("click", shareSeed, false);

var text = document.getElementById("text");
text.style.left = '20px';
text.style.top = '820px';
text.style.position = "absolute";        

var view = new grid.GridView(canvas, {size: size, scale: 7, positionLeft: "20px", positionTop: "100px"});
var model = new grid.GridModel(size);
var intervalId;

view.onCellClick(function(cell) {
    var modelCell = model.getCell(cell.x, cell.y);
    modelCell.isAlive = !modelCell.isAlive;

    // this should be handled by observer (view should observe model's "change cell state" event)
    modelCell.isAlive ? view.fillCell(cell) : view.clearCell(cell);
});

view.paintGrid();

function applySeed(seed){
    seed.forEach(function(tuple){
        var cell = model.getCell(tuple[0],tuple[1]);
        cell.isAlive=true;
        view.fillCell(cell);
    })
}

var query = url.parse(window.location.search, true).query;

if(query.seed){
    var seed = JSON.parse(query.seed);
    applySeed(seed);
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

var savedSeed;

function shareSeed(){
    if(savedSeed == null)
    {
        saveCurrentSeed();
    }
    
    if(savedSeed)
        alert("http://localhost:8000/?seed="+savedSeed)
    else
        alert('nothing to share')
}

function saveCurrentSeed(){
    var json = "";
    model.eachCell(function(cell) {
        if(cell.isAlive)
            json +="["+cell.x+"," +  cell.y +"],"
    });
    if(json)
        savedSeed = "["+json.replace(/,$/,"]");
}


// main loop
function start() {
    buttons.style.display = "none";
    stopButton.style.display = "inline";
    intervalId = setInterval(tick, 150);

    // log initial setup
    saveCurrentSeed();

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