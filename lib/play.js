// play.js - Marak Squires
// Mit yo, copy paste us some credit


if(typeof exports === 'undefined'){

  /*  the browser version 
  
      assumes you have already embedded the audio file as an embed tag

      <embed id = "hat" autostart = "false" src = "./wavs/drums/tick.wav"/>
      <embed id = "snare" autostart = "false" src = "./wavs/drums/snare.wav"/>
      <embed id = "kick" autostart = "false" src = "./wavs/drums/kick.wav"/>
      
      play.sound('hat'); // plays tick.wav
      play.sound('snare'); // plays snare.wav

  */
  var play = {
    sound: function ( wav ) {
      debug.log(wav);
      
      var e = $('#' + wav);
      debug.log(e);
      $('#alarm').remove();

      $(e).attr('autostart',true);
      $('body').append(e);
      
      
      return wav;
    }
  };
}
else{
  
  // not the browser, worst env check ever
  var http = require('http'), 
      colors = require('colors'), 
      spawn = require('child_process').spawn,
      child;

  var play = exports;

  play.playerList = [
    'afplay',
    'play' 
  ];
  
  exports.sound = function(file, callback) {
    if (play.playerList.length == 0) { 
      console.log('No suitable audio player could be found - exiting.'.red);
      return true; 
    }
    var command = [file];
    console.log('playing'.magenta + '=>'.yellow + file.cyan);
    var child = spawn(play.playerList[0], command);
    
    child.stderr.setEncoding('ascii');
    child.on('exit', function (code, signal) {
      
      if(code == null || signal != null || code === 1) {
        console.log('couldnt play, had an error ' + '[code: '+ code + '] ' + '[signal: ' + signal + ']');
      }
      else if(code == 127){
        play.playerList.shift();
        play.sound(file, callback);
      }else if (code == 2) {
        console.log(file.cyan + '=>'.yellow + 'could not be read by your player.'.red)
      }
      else{
        console.log( 'completed'.green + '=>'.yellow + file.magenta);
      }
    });
    

  }
}