var getPixels = require('get-pixels');
var savePixels = require('save-pixels');
var fs = require('fs');
var Utils = require('./utils.js');
var Nudge = require('./nudge.js')

/**
 * @param input
 * @param output
 * @param maxShifts
 * @param maxIters
 * @param maxDist
 */
module.exports = function(input, output, maxShifts, maxIters, maxDist){

    //how many times should we shift an image
    var MAX_SHIFTS = maxShifts || 100;
    //max shift value
    var MAX_FACTOR = maxIters || 200;
    //column width for shifting
    var MIN_DISTANCE = 40;
    var MAX_DISTANCE = maxDist || 200;

    console.log('- max: MAX_SHIFTS '+ MAX_SHIFTS + ' MAX_FACTOR ' + MAX_FACTOR + ' MAX_DISTANCE ' + MAX_DISTANCE);

    function getShifts(){
        return Utils.randomInt(1, MAX_SHIFTS);
    }

    function getFactor(){
        var factor = Utils.randomInt(1, MAX_FACTOR);
        if(Utils.randomInt(1,2) == 2){
            factor *= -1;
        }
        return factor;
    }

    function getX(width){
        return Utils.randomInt(0, width - 1);
    }

    function getDistance(width, x){
        var maxDistance = width - x;
        return Utils.randomInt(Math.min(MIN_DISTANCE, Math.min(maxDistance, MAX_DISTANCE)), Math.min(maxDistance, MAX_DISTANCE));
    }

    //read image
    getPixels(input, function(err, pixels) {

        if(err) {
            console.log("Bad image path")
            return;
        }

        //get as pixels
        var pixVals = Utils.nd_to_pixVal(pixels);

        var shifts = getShifts();
        console.log('- shifts = '+ shifts);
        for(var i = 0 ; i < shifts; i ++){
            var w = pixels.shape[0];
            var x = getX(w);
            var dist = getDistance(w, x);
            var fact = getFactor();
            pixVals = Nudge.nudgeColRange(pixVals, x, dist, fact);
        }
        var ndShifted = Utils.pixVal_to_nd(pixVals);

        //save image
        savePixels(ndShifted, "png").pipe(fs.createWriteStream(output));

    });

};



