var App = require('./app.js');

var app = new App();

app.loadAsync('/Users/jackmahoney/Desktop/jack1.jpg', () => {

    app.shiftRows(5);
    app.write('/Users/jackmahoney/Desktop/jack2.jpg');

});

