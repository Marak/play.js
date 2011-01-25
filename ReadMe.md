## play.js - play sound files from node.js to your speakers, simple as cake and kid approved!
<img src = "https://github.com/Marak/play.js/raw/master/logo.png" border = "0"/>
<img src = "https://github.com/Marak/play.js/raw/master/demo.png" border = "0"/>

### Installing npm (node package manager)

     curl http://npmjs.org/install.sh | sh

### Installing play.js

     npm install play

# USAGE

      var play = require('play');

      // play with a callback
      play.sound('./wavs/sfx/intro.wav', function(){
  
        // these are all "fire and forget", no callback
        play.sound('./wavs/sfx/alarm.wav');
        play.sound('./wavs/sfx/crinkle.wav');
        play.sound('./wavs/sfx/flush.wav');
        play.sound('./wavs/sfx/ding.wav');
        
      });

## DEMO

     cd examples
     node demo.js

###drum party, now go to JSONloops => <a href = "http://github.com/marak/JSONloops">http://github.com/marak/JSONloops</a>

### Requirements

Mac OS and node.js

                        