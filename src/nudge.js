var shift = require('./shift.js');

module.exports = {

    /**
     * Nudge a range of columns in a two dimensional array up or down
     * @param arr Array to nudge
     * @param x1 starting index
     * @param distance distance from starting index
     * @param factor signed integer number of shifts up or down
     * @returns {*}
     */
    nudgeColRange: function (arr, x1, distance, factor){

        if(!factor || !distance){
            return arr;
        }

        //ensure we don't go outside of array bounds
        if(x1 + distance > arr[0].length){
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
