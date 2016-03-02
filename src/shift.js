/**
 * Shift an array left or right
 * @param arr
 * @param distance
 * @returns {*}
 */
module.exports = function shift(arr, distance){
    if(!distance){
        return arr;
    }
    if(distance < 0){
        var x0 = 0;
        var x1 = Math.abs(distance) % arr.length;
        var sliceA = arr.slice(x0, x1);
        var sliceB = arr.slice(x1, arr.length);
        return [].concat(sliceB).concat(sliceA);
    }
    else{
        var x0 = arr.length - distance % arr.length;
        var x1 = arr.length;
        var sliceA = arr.slice(x0, x1);
        var sliceB = arr.slice(0, x0);
        return [].concat(sliceA).concat(sliceB);
    }
};