function Board(size){
    this.cells = [];
    for(var i = 1; i <= size; i++){
        for(var j = 1; j <= size; j++){
            this.cells.push(new Cell(i,j))
        }
    }
}

