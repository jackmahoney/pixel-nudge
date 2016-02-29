//var array = [
// [ 0, 1, 2, 3],
// [ 4, 5, 6, 7],
// [ 8, 9,10,11],
// [12,13,14,15]
//];

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
    },

    nudgeColRange2: function(arr, x1, count, factor){
        //if(x1 < 0 || x1 > arr.length -1 || x1 + count > arr.length){
        //    throw('Col range is outside of array bounds');
        //}
        //for(var i = x1; x1 < x1 + count; i++){
        //    this.nudgeCol(arr, x1 + i, factor);
        //}
        this.nudgeCol(arr, 100, -30);
        return arr;
    }
};
