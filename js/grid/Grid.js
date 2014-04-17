var _ = require('underscore');
module.exports = function init(userConfig){
    var config = {
        
    };
    
    // aply user config
    _.extend(config, userConfig);
    
    
    return {
        onCellClick: function(callback){
            console.log('onCellClick is called')
        }
    };
};