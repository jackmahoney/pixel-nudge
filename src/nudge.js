/**
 * Swap the values of two cells
 * @param arr
 * @param row1
 * @param row2
 * @param col
 */
function swapColValues(arr, row1, row2, col){
	var val1 = arr[row1][col];
	var val2 = arr[row2][col];
	arr[row1][col] = val2;
	arr[row2][col] = val1;
}


module.exports = {

    /**
     * @param arr
     * @param x
     * @param distance
     * @param factor
     * @returns {*}
     */
    nudgeColRange: function (arr, x, distance, factor){
        if(!factor){
            throw('factor must be positive or negative non zero integer');
        }
        var absFactor = Math.abs(factor);
        for(var f = 0; f < absFactor; f++){
            if(factor > 0){
                for(var i = arr.length - 1; i > 0; i--){
                    for(var j = x; j < x + distance; j++){
                        var nextY = i > 0 ? i - 1 : arr.length - 1;
                        swapColValues(arr, i, nextY, j);
                    }
                }
            }
            else{
                for(var i = 0; i < arr.length -1; i++){
                    for(var j = x; j < x + distance; j++) {
                        var nextY = i < arr.length - 1 ? i + 1 : 0;
                        swapColValues(arr, i, nextY, j);
                    }
                }
            }
        }
        return arr;
    }
};
