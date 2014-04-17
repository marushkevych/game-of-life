var init = require('../js/grid/Grid');

describe("Grid", function(){
   describe("onCellClik event", function(){
        it("should pass correct Cell object", function(){
            var grid = init();
            grid.onCellClick(function(cell){
                
            });
        });
   });
});

