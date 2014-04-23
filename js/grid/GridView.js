var _ = require('underscore');
exports.init = function(canvas, userConfig) {

    // TODO make border width configurable
    
    var config = {
        size: 10,
        scale: 10,
        positionLeft: "0px",
        positionTop: "0px",
        strokeStyle: "#eee"
    };

    var onCellClickHandler;

    // aply user config
    _.extend(config, userConfig);

    // init canvas
    var length = config.size * config.scale;
    canvas.width = length + 1;
    canvas.height = length + 1;
    canvas.style.left = config.positionLeft;
    canvas.style.top = config.positionTop;
    canvas.style.position = "absolute";

    canvas.addEventListener("click", canvasClick, false);

    function canvasClick(e) {
        // get cell object and call onCellClick handler
        if (onCellClickHandler)
            onCellClickHandler(getClickedCell(e));
    }

    function getClickedCell(e) {
        var x;
        var y;
        if (e.pageX != undefined && e.pageY != undefined) {
            x = e.pageX;
            y = e.pageY;
        }
//        else {
//            x = e.clientX + document.body.scrollLeft +
//                    document.documentElement.scrollLeft;
//            y = e.clientY + document.body.scrollTop +
//                    document.documentElement.scrollTop;
//        }

//    x -= canvas.offsetLeft;
//    y -= canvas.offsetTop;
//      console.log(canvas.offsetLeft)
//      console.log(canvas.offsetTop)

        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;


        // ajust for border
//    if(x>0) x-=1;
//    if(y>0) y-=1;

        var cellX = Math.floor(x / config.scale);
        var cellY = Math.floor(y / config.scale);
        if (cellX < config.size)
            cellX += 1;
        if (cellY < config.size)
            cellY += 1;
        return {x: cellX, y: cellY};
    }

    function paintGrid() {
// grid
        var context = canvas.getContext("2d");

        for (var x = 0; x <= length; x += config.scale) {
            context.moveTo(x + 0.5, 0);
            context.lineTo(x + 0.5, length);
        }

        for (var y = 0; y <= length; y += config.scale) {
            context.moveTo(0, y + 0.5);
            context.lineTo(length, y + 0.5);
        }

        context.strokeStyle = config.strokeStyle;
        context.stroke();
    }

    return {
        onCellClick: function(handler) {
            onCellClickHandler = handler;
        },
        fillCell: function(cell) {
            var context = canvas.getContext("2d");
            var s = config.scale;
            context.fillRect(cell.x * s - s + 1, cell.y * s - s + 1, s - 1, s - 1);
        },
        clearCell: function(cell) {
            var context = canvas.getContext("2d");
            var s = config.scale;
            context.clearRect(cell.x * s - s + 1, cell.y * s - s + 1, s - 1, s - 1);
        },
        paintGrid: paintGrid
    };
};