var expect = require('chai').expect;
var shift = require('../src/shift.js');
var arr = [0,1,2,3];

describe('shift', function(){

    it('it should return same array for no shift value', function(){
        var result = shift(arr);
        expect(result).to.deep.equal(arr);
    });

    it('it should shift left 1 for distance -1', function(){
        var result = shift(arr, -1);
        var expected = [1,2,3,0];
        expect(result).to.deep.equal(expected);
    });

    it('it should shift right 1 for distance 1', function(){
        var result = shift(arr, 1);
        var expected = [3,0,1,2];
        expect(result).to.deep.equal(expected);
    });

    it('it should shift left 1 for distance -1 less than modular length', function(){
        var result = shift(arr, -1 * (arr.length + 1));
        var expected = [1,2,3,0];
        expect(result).to.deep.equal(expected);
    });

    it('it should shift right 1 for distance 1', function(){
        var result = shift(arr, arr.length + 1);
        var expected = [3,0,1,2];
        expect(result).to.deep.equal(expected);
    });

});