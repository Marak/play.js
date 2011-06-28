## play.js - play sound files from node.js to your speakers, simple as cake and kid approved!
<img src = "https://github.com/Marak/play.js/raw/master/logo.png" border = "0"/>
<img src = "https://github.com/Marak/play.js/raw/master/demo.png" border = "0"/>

### Installing npm (node package manager)

     curl http://npmjs.org/install.sh | sh

### Installing play.js

     npm install play

# USAGE

      var play = require('play').Play();

      // play with a callback
      play.sound('./wavs/sfx/intro.wav', function(){
  
        // these are all "fire and forget", no callback
        play.sound('./wavs/sfx/alarm.wav');
        play.sound('./wavs/sfx/crinkle.wav');
        play.sound('./wavs/sfx/flush.wav');
        play.sound('./wavs/sfx/ding.wav');
        
      });

      //If you want to know when the player has defintely started playing
      play.on('play', function (valid) {
        console.log('I just started playing!');
      });
      play.sound('./wavs/sfx/ding.wav');

      //If you want to know if this can't play for some reason
      play.on('error', function () {
        console.log('I can't play!');
      });

## CLI DEMO

     cd examples
     node demo.js

## Web DEMO

  Recommended that you use play.min.js for web-based playbacks
  assumes you have already embedded the audio file as an embed tag

      <embed id = "hat" autostart = "false" src = "./wavs/drums/tick.wav"/>
      <embed id = "snare" autostart = "false" src = "./wavs/drums/snare.wav"/>
      <embed id = "kick" autostart = "false" src = "./wavs/drums/kick.wav"/>

  see examples/index.html 

###drum party, now go to JSONloops => <a href = "http://github.com/marak/JSONloops">http://github.com/marak/JSONloops</a>

### Requirements

Node.js

**One of the CLI based audio player**
 - 'afplay'
 - 'mplayer'
 - 'mpg123'
 - 'mpg321'
 - 'play'
 - (anyother cli based audio player)

  If you know that a certain player will exist in the CLI
  you can actually force it to use that specific player using
  the usePlayer function (see below for specifics)

### Raw Handle to the player and using usePlayer

      // If you want raw access to the player (via stdin)

      // require and stuff happened here
      var play = require('play').Play();
      var player = false;

      // Force it to use mplayer (can be anything else)
      play.usePlayer('mplayer');
      play.on('play', function () {
        player = play.player;
      });

      play.sound('./somelonglongsong.wav');

#### Notes on using usePlayer
  
  The player better exist or all hell may break lose.
