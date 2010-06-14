## play.js - play sound files from node.js, simple as cake and kid approved!
<img src = "http://i.imgur.com/FLLGe.png" border = "0"/>
<img src = "http://imgur.com/KRkGO.png" border = "0"/>

# usage

          var play = require('./lib/play');

          play.sound('./wavs/intro.wav');
          play.sound('./wavs/alarm.wav');
          play.sound('./wavs/crinkle.wav');
          play.sound('./wavs/flush.wav');
          play.sound('./wavs/ding.wav');

          // drum party, now go JSONloop => http://github.com/marak/JSONloops

### fun facts

play.sound() calls are async ^_^ ahahaha, but where are the callbacks? fork and have fun!

### Requirements

Mac OS and node.js

