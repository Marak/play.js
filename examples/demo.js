var play = require('../lib/play');

// play with a callback
play.sound('../wavs/sfx/intro.wav', function(){
  
  // these are all "fire and forget", no callback
  play.sound('../wavs/sfx/alarm.wav');
  play.sound('../wavs/sfx/crinkle.wav');
  play.sound('../wavs/sfx/flush.wav');
  play.sound('../wavs/sfx/ding.wav');
});