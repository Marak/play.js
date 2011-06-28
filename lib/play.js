// play.js - Marak Squires
// MIT yo, copy paste us some credit

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
  var colors = require('colors'), 
      child_p = require('child_process'),
      exec = child_p.exec,
      spawn = child_p.spawn,
      ee = require('events'),
      util = require('util');

  // play is this
  var Play = exports.Play = function Play() {
    var self = this;

    if (!(this instanceof Play)) {
      return new Play();
    }

    ee.EventEmitter.call(this);

    this.playerList = [
      'afplay',
      'mplayer',
      'mpg123',
      'mpg321',
      'play',
    ];

    this.playerName = false;
    this.checked = 0;

    var i = 0, child;

    // a hack to check if we have any players available
    for (i = 0, l = this.playerList.length; i < l; i++) {
      if (!this.playerName) {
        (function inner (name) {
        child = exec(name, function (error, stdout, stderr) {
          self.checked++;
          if (!self.playerName && (error === null || error.code !== 127 )) {
            // if the command was successful, and we didn't have any players yet
            self.playerName = name;
            self.emit('checked');
            return;
          }
          // if we went through the last known player, but no match
          if (name === self.playerList[self.playerList.length-1]) {
            // we are done checking then
            self.emit('checked');
          }
        });
        })(this.playerList[i]);
      } 
      // if we already have a player, quit
      else {
        break;
      }
    }
  };

  // initialize and inherit
  util.inherits(Play, ee.EventEmitter);

  //
  // Allows the user to manually set a player name
  //
  Play.prototype.usePlayer = function usePlayer (name) {
    this.playerName = name;
  }


  //
  // Have the user player the file, with a callback when it ends
  //
  Play.prototype.sound = function sound (file, callback) {
    var callback = callback || function () {};

    var self = this;
    // if there is no player, and we haven't finished checking
    // wait for the ready, then start
    if (!this.playerName && this.checked !== this.playerList.length) {
      this.on('checked', function () {
        self.sound.call(self, file, callback);
      });
      return false;
    }

    // if we have checked all the players, and none of them were good
    if (!this.playerName && this.checked === this.playerList.length) {
      console.log('No suitable audio player could be found - exiting.'.red);
      console.log('If you know other cmd line music player than these:'.red, this.playerList);
      console.log('You can tell us, and will add them (or you can add them yourself)'.red);
      this.emit('error', new Error('No Suitable Player Exists'.red, this.playerList));
      return false;
    }

    // we should have a valid player name, so we can call it
    var command = [file],
        child = this.player = spawn(this.playerName, command);

    // tell you what I am playing
    console.log('playing'.magenta + '=>'.yellow + file.cyan);

    // A listener to handle callbacks, and any weird IO errors
    child.on('exit', function (code, signal) {
      if(code == null || signal != null || code === 1) {
        console.log('couldnt play, had an error ' + '[code: '+ code + '] ' + '[signal: ' + signal + '] :' + this.playerName.cyan);
        this.emit('error', code, signal);
      }
      else if ( code == 127 ) {
        // a could not find command error
        console.log( self.playerName.cyan + ' doesn\'t exist!'.red );
        this.emit('error', code, signal);
      }
      else if (code == 2) {
        // a file IO error
        console.log(file.cyan + '=>'.yellow + 'could not be read by your player:'.red + self.playerName.cyan)
        this.emit('error', code, signal);
      }
      else if (code == 0) {
        // exited correctly/completed without errors
        console.log( 'completed'.green + '=>'.yellow + file.magenta);
        callback();
      }
      else {
        // are there other errors?
        console.log( self.playerName.cyan + ' has an odd error with '.yellow + file.cyan);
        console.log(arguments);
        emit('error');
      }
    });
    this.emit('play', true);
    return true;
  }

}
