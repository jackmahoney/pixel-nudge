var getPixels = require('get-pixels');
var savePixels = require('save-pixels');
var fs = require('fs');
var Utils = require('./utils.js');
var AT = require('array-translate');

/**
 * @param input
 * @param output
 * @param maxShifts
 * @param maxIters
 * @param maxDist
 */

class App{

    /**
     * Load an image for processing
     * @param input {string} path
     * @param callback {function} callback
     */
    loadAsync(input, callback){
        getPixels(input, (err, pixels) => {

            if(err) {
                throw("Bad image path");
            }

            //get ndarray as pixels
            this.pixVals = Utils.nd_to_pixVal(pixels);

            callback();
        });
    }

    shiftRows(shiftCount){

        for(var i = 0 ; i < shiftCount; i ++){
            var constraint = this.pixVals.length;
            var y1 = Utils.randomInt(0, constraint);
            var dist = Utils.randomInt(0, constraint);
            var fact = Utils.randomInt(100, 500);
            this.pixVals = AT.translateRows(this.pixVals, y1, dist, fact);
        }

    };

    shiftCols(shiftCount){
        for(var i = 0 ; i < shiftCount; i ++){
            var constraint = this.pixVals[0].length;
            var x1 = Utils.randomInt(0, constraint);
            var dist = Utils.randomInt(0, constraint);
            var fact = Utils.randomInt(100, 500);
            this.pixVals = AT.translateColumns(this.pixVals, x1, dist, fact);
        }
    };

    shiftRandom(shiftCount){
        for(var i = 0 ; i < shiftCount; i ++){
            if(Utils.randomBool()){
                this.shiftCols(1);
            }
            else{
                this.shiftRows(1);
            }
        }
    };

    /**
     * Write the output to an image
     * @param output
     */
    write(output){
        //convert to ndarray for saving
        var ndShifted = Utils.pixVal_to_nd(this.pixVals);

        //save image
        var writeStream = fs.createWriteStream(output);

        var extension = output.match(/\.[0-9a-z]+$/)[0];

        savePixels(ndShifted, extension).pipe(writeStream);
    }


}




module.exports = App;



