var program = require('commander');
var app = require('./app.js');
var exec = require('child_process').exec;
//var osTmpdir = require('os-tmpdir');
//var fs = require('fs');

program
    .version('0.0.1')

    .option('-a, --animate', 'Animate. Use in conjuction with -D and -F')
    .option('-D, --delay [delay]', 'Animation frame delay')
    .option('-F, --frames [framecount]', 'Frame count')

    .option('-d, --max-distance <max-distance>', 'Width of pixel column', parseInt)
    .option('-m, --min-distance [min-distance]', 'Width of pixel column', parseInt)
    .option('-f, --factor <factor>', 'Pixel nudge factor', parseInt)
    .option('-n, --nudges <nudges>', 'Width of pixel column', parseInt)

    .option('-i, --input <input>', 'File input')
    .option('-o, --output <out>', 'File ouput')

    .parse(process.argv);

function processAndSaveImage(output){
    var minDistance = program.minDistance || 0;
    app(program.input, output, program.nudges, program.factor, program.maxDistance, minDistance);
}

if(program.animate){
    if(!program.delay || !program.frames){
        throw('-D and -F required for animation.')
    }
    else{
        //make necessary folders
        var tempDir = osTmpdir();
        var runDir = tempDir + '/pixel-nudge-run-' + Date.now();
        fs.mkdirSync(runDir);
        //create the frames
        for (var i = 0; i < program.frames.length; i++) {
            var output = runDir + '/out-' + i + '.jpg';
            processAndSaveImage(output);
        }

        //animate the frames
        exec('convert -delay '+program.delay+' -loop 0 '+runDir+'/*.jpg '+program.output, function(error, stdout, stderr){
            console.log(error,stdout,stderr);
            //exec('rm '+runDir+'/*.jpg');
        });
    }
}
else{
    processAndSaveImage(program.output);
}



