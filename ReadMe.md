## play.js - play sound files from node.js to your speakers, simple as cake and kid approved!
<img src = "http://i.imgur.com/FLLGe.png" border = "0"/>
<img src = "http://imgur.com/KRkGO.png" border = "0"/>

# usage

      var play = require('play');

      // play with a callback
      play.sound('./wavs/sfx/intro.wav', function(){
  
        // these are all "fire and forget", no callback
        play.sound('./wavs/sfx/alarm.wav');
        play.sound('./wavs/sfx/crinkle.wav');
        play.sound('./wavs/sfx/flush.wav');
        play.sound('./wavs/sfx/ding.wav');
      });

###drum party, now go to JSONloops => <a href = "http://github.com/marak/JSONloops">http://github.com/marak/JSONloops</a>

### Requirements

Mac OS and node.js

                        