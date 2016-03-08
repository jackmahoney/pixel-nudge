var ndarray = require('ndarray');
var random = require("random-js")();

module.exports = {

    nd_to_pixVal: function (pixels) {
        var pixelValueArray = [];
        for (var i = 0; i < pixels.shape[1]; i++) {
            pixelValueArray[i] = [];
            for (var j = 0; j < pixels.shape[0]; j++) {
                pixelValueArray[i][j] = [];
                for (var k = 0; k < pixels.shape[2]; k++) {
                    pixelValueArray[i][j].push(pixels.get(j, i, k));
                }
            }
        }
        return pixelValueArray;
    },

    pixVal_to_nd: function (pixVals) {
        var flatArray = [];
        var height = pixVals.length;
        var width = pixVals[0].length;
        var channels = pixVals[0][0].length;
        for (var j = 0; j < width; j++) {
            for (var i = 0; i < height; i++) {
                for (var k = 0; k < channels; k++) {
                    flatArray.push(pixVals[i][j][k]);
                }
            }
        }
        return ndarray(new Float64Array(flatArray), [width, height, channels])
    },

    randomInt: function(min, max){
        return random.integer(min, max);
    },

    randomBool: function(){
        return random.integer(0, 1) === 1;
    }
}