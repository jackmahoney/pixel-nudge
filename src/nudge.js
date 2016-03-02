var shift = require('./shift.js');

//TODO make more efficient by taking a slice, shuffling it and putting it back in place
module.exports = {

    /**
     * @param arr Array to nudge
     * @param x1 starting index
     * @param distance distance from starting index
     * @param factor
     * @returns {*}
     */
    nudgeColRange: function (arr, x1, distance, factor){

        if(!factor || !distance){
            return arr;
        }

        //ensure we don't go outside of array bounds
        if(x1 + distance > arr.length){
           distance = arr.length - x1;
        }

        //create distance number of arrays
        var columns = [];
        for (var i = 0; i < distance; i++) {
            columns.push([])
        }


        //iterate rows and pull out column values
        for (var i = 0; i < arr.length; i++) {
            var row = arr[i];
            for (var j = 0; j < distance; j++) {
                var colVal = row[x1 + j];
                columns[j].push(colVal);
            }
        }

        //now we have our columns lets shift them
        for (var i = 0; i < columns.length; i++) {
            var column = columns[i];
            columns[i] = shift(column, factor);
        }

        //now lets put the columns them back in place
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < distance; j++) {
                arr[i][x1 + j] = columns[j][i];
            }
        }

        return arr;
    }
};
