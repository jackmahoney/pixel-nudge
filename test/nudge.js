var expect = require('chai').expect;
var nudge = require('../src/nudge.js');

//use function so that array is fresh each time
function getArray(){
    return [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ];
}

describe('nudge', function(){

    it('it should nudge a column up', function(){
        var expected = [
            [1,5,3],
            [4,8,6],
            [7,2,9]
        ];
        var result = nudge.nudgeColRange(getArray(),1,1,-1);
        expect(result).to.deep.equal(expected);
    });

    it('it should nudge multiple columns up', function(){
        var expected = [
            [4,5,3],
            [7,8,6],
            [1,2,9]
        ];
        var result = nudge.nudgeColRange(getArray(),0,2,-1);
        expect(result).to.deep.equal(expected);
    });


    it('it should nudge columns down', function(){
        var expected = [
            [7,8,9],
            [1,2,3],
            [4,5,6]
        ];
        var result = nudge.nudgeColRange(getArray(),0,3,1);
        expect(result).to.deep.equal(expected);
    });

    it('it should nudge columns down', function(){
        var expected = [
            [7,8,9],
            [1,2,3],
            [4,5,6]
        ];
        var result = nudge.nudgeColRange(getArray(),0,3,1);
        expect(result).to.deep.equal(expected);
    });


    it('it should quietly handle distance exceeding array length', function(){
        var expected = [
            [4,5,6],
            [7,8,9],
            [1,2,3]
        ];
        var result = nudge.nudgeColRange(getArray(),0,5,-1);
        expect(result).to.deep.equal(expected);
    });


});