// play.js - Marak Squires
// Mit yo, copy paste us some credit
var sys = require('sys')
  , http = require('http')
  , colors = require('./colors')  
  , exec = require('child_process').exec
  , spawn = require('child_process').spawn
  , child;

var colors = require('./colors'); // import color.js for fun!

var play = exports;

// say stuff, speak
exports.sound = function(text, callback){
  sys.puts('playing'.magenta + '=>'.yellow + text.blue);
  var commands = [text];
  var childD = spawn("afplay", commands);
  childD.stdout.setEncoding('ascii');
  childD.stderr.setEncoding('ascii');  
  childD.stderr.addListener('data', function(data){});
  childD.stdout.addListener('data', function(data){});
  childD.addListener('exit', function (code, signal) {
    if(code == null || signal != null) {
      sys.puts('couldnt talk, had an error ' + '[code: '+ code + '] ' + '[signal: ' + signal + ']');
    }
    sys.puts( 'completed'.green + '=>'.yellow + text.magenta);
    //callback(); // i think i have to apply / call the arguments here
  });
}
