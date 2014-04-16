function Board(size){
    this.cells = [];
    this.cols = [];
    for(var i = 1; i <= size; i++){
        var col = [];
        this.cols[i] = col;
        for(var j = 1; j <= size; j++){
            col[j] = new Cell(i,j);
            this.cells.push(col[j] )
        }
    }
}

Board.prototype.getCell = function(x,y){
    var cell = this.cols[x][y];
    return cell;
}

