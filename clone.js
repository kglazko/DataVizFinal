/*!
 *  Howler.js Audio Sprite Demo
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

// Cache references to DOM elements.
var house1Array = ['clap', 'clap', 'clap', 'room1'];

var room1Array = ['clap', 'room2', 'house1', 'chair1'];
var cabinet1Array = ['fan1', 'bed1', 'room1', 'clap'];
var fan1Array = ['chair1', 'cabinet1', 'room1', 'clap'];
var chair1Array = ['clap', 'fan1', 'room1', 'clap'];
var bed1Array = ['cabinet1', 'bed2', 'room1', 'clap'];
var bed2Array = ['bed1', 'clap', 'room1', 'clap'];

var room2Array = ['room1', 'room3', 'house1', 'chair2'];
var chair2Array = ['clap', 'chair3', 'room2', 'clap'];
var chair3Array = ['chair2', 'chair4', 'room2', 'clap'];
var chair4Array = ['chair3', 'chair5', 'room2', 'clap'];
var chair5Array = ['chair4', 'table1', 'room2', 'clap'];
var table1Array = ['chair5', 'fan2', 'room2', 'clap'];
var fan2Array = ['table1', 'clap', 'room2', 'clap'];

var room3Array = ['room2', 'room4', 'house1', 'tree1'];
var tree1Array = ['clap', 'tree2', 'room3', 'clap'];
var tree2Array = ['tree1', 'clap', 'room3', 'clap'];

var room4Array = ['room3', 'clap', 'house1', 'chair6' ];
var chair6Array = ['clap', 'clap', 'room4', 'clap'];

var selected_node = 'house1';
var rightTracker = 1;
var leftTracker = 1;

var playTones = true;

var elms = ['waveform', 'sprite0', 'sprite1', 'sprite2', 'sprite3', 'sprite4', 'sprite5'];
elms.forEach(function(elm) {
  window[elm] = document.getElementById(elm);
});

/**
 * Sprite class containing the state of our sprites to play and their progress.
 * @param {Object} options Settings to pass into and setup the sound and visuals.
 */
var Sprite = function(options) {
  var self = this;

  self.sounds = [];

  // Setup the options to define this sprite display.
  //self._width = options.width;
  //self._left = options.left;
  self._spriteMap = options.spriteMap;
  self._sprite = options.sprite;
  //self.setupListeners();

  // Create our audio sprite definition.
  self.sound = new Howl({
    src: options.src,
    sprite: options.sprite
  });

  // Setup a resize event and fire it to setup our sprite overlays.
  window.addEventListener('resize', function() {
    self.resize();
  }, false);

  window.addEventListener("keydown", function(event) {
      event.preventDefault();
      const keyDown = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    switch (keyDown) { // change to event.key to key to use the above variable
      case "Enter":
          var id = self.play(selected_node);
          console.log("I read this");
          break;

      case "ArrowLeft":
      // Left pressed
      leftTracker += 1;
      rightTracker -=1;
      console.log(window[selected_node + 'Array'][0]);
      if (window[selected_node + 'Array'][0] === "clap") {
        var id = self.sound.play("clap");
      }
      else {var id = self.play(window[selected_node + 'Array'][0]);
      selected_node = window[selected_node + 'Array'][0];
      }
      break;

    case "ArrowRight":
      // Right pressed
      rightTracker += 1;
      leftTracker -= 1;
      if (window[selected_node + 'Array'][1] === "clap") {
        var id = self.sound.play("clap");
      }
      else {var id = self.play(window[selected_node + 'Array'][1]);
      selected_node = window[selected_node + 'Array'][1];
      }
      break;

    case "ArrowUp":
      // Up pressed
      if (window[selected_node + 'Array'][2] === "clap") {
        var id = self.sound.play("clap");      }
      else {var id = self.play(window[selected_node + 'Array'][2]);
      selected_node = window[selected_node + 'Array'][2];
      }
      break;
    case "ArrowDown":
      // Down pressed
      if (window[selected_node + 'Array'][3] === "clap") {
        var id = self.sound.play("clap");
      }
      else {var id = self.play(window[selected_node + 'Array'][3]);
      selected_node = window[selected_node + 'Array'][3];
      }
      break;
    case "Shift":
      if (playTones) {
        playTones = false;
      }

      else {
        playTones = true;
      }
      break;
  }
}); 

  self.resize();

  // Begin the progress step tick.
  requestAnimationFrame(self.step.bind(self));
};
Sprite.prototype = {
  /**
   * Setup the listeners for each sprite click area.
   */
  /*setupListeners: function() {
    var self = this;
    var keys = Object.keys(self._spriteMap);

    keys.forEach(function(key) {
      window[key].addEventListener('click', function() {
        self.play(key);
      }, false);
    });

  },*/

  /**
   * Play a sprite when clicked and track the progress.
   * @param  {String} key Key in the sprite map object.
   */
  play: function(key) {
    var self = this;
    var sprite = self._spriteMap[key];

    // Play the sprite sound and capture the ID.
    if (key.includes('room1')){
      var id = self.sound.play(sprite);
      self.sound.stereo(-1.0 );
    }

    else if (key.includes('room2')){
      var id = self.sound.play(sprite);
      //self.sound.pos(-0.5 ,0,-1.0, id);
      self.sound.stereo(-0.5);
    }

    else if (key.includes('room3')){
      var id = self.sound.play(sprite);
      //self.sound.pos(0.5 ,0,-1.0, id);
      self.sound.stereo(0.5);
    }

    else if (key.includes('room4')){
      var id = self.sound.play(sprite);
      //self.sound.pos(1.0 ,0,-1.0, id);
      self.sound.stereo(1.0);
    }

      else if (key.includes('chair1')){
        var id = self.sound.play(sprite);
        self.sound.stereo(-1.0);
      }

      else if (key.includes('fan1')){
        var id = self.sound.play(sprite);
        self.sound.stereo(-0.5);
      }

      else if (key.includes('cabinet1')){
        var id = self.sound.play(sprite);
        self.sound.stereo(0.0);
      }

      else if (key.includes('bed1')){
        var id = self.sound.play(sprite);
        self.sound.stereo(0.5);
      }

      else if (key.includes('bed2')){
        var id = self.sound.play(sprite);
        self.sound.stereo(1.0);
      }

      else if (key.includes('chair2')){
        var id = self.sound.play(sprite);
        self.sound.stereo(-1.0);
      }

      else if (key.includes('chair3')){
        var id = self.sound.play(sprite);
        self.sound.stereo(-0.6);
      }

      else if (key.includes('chair4')){
        var id = self.sound.play(sprite);
        self.sound.stereo(-0.3);
      }

      else if (key.includes('chair5')){
        var id = self.sound.play(sprite);
        self.sound.stereo(0.3);
      }

      else if (key.includes('table1')){
        var id = self.sound.play(sprite);
        self.sound.stereo(0.6);
      }

      else if (key.includes('fan2')){
        var id = self.sound.play(sprite);
        self.sound.stereo(1.0);
      }

      else if (key.includes('tree1')){
        var id = self.sound.play(sprite);
        self.sound.stereo(-1.0);
      }

      else if (key.includes('tree2')){
        var id = self.sound.play(sprite);
        self.sound.stereo(1.0);
      }

      else {
        var id = self.sound.play(sprite);
        self.sound.stereo(0.0);
      }
    

    self.sound.once('end', function() {
      if (playTones) {
    if(key.includes('room1')){
      self.play2('medium', key, -1.0);
    }

    else if(key.includes('room2'))
    {
      self.play2('medium', key, -0.5);
    }

    else if(key.includes('room3')) {
      self.play2('medium', key, 0.5);
    }

    else if(key.includes('room4')) {
      self.play2('medium', key, 1.0);
    }

    else if (key.includes('house1')) {
      self.play2('low', key, 0.0);
    }

    else if (key.includes('clap')) {
      console.log("nothing happens");
    }
    else {
      self.play2('high');
    }
    }
  });

    // Create a progress element and begin visually tracking it.
    var elm = document.createElement('div');
    elm.className = 'progress';
    elm.id = id;
    elm.dataset.sprite = sprite;
    window[key].appendChild(elm);
    self.sounds.push(elm);

    // When this sound is finished, remove the progress element.
    self.sound.once('end', function() {
      var index = self.sounds.indexOf(elm);
      if (index >= 0) {
        self.sounds.splice(index, 1);
        window[key].removeChild(elm);
      }
    }, id);
  },

  play2: function(key, parent, stereo) {
    self = this;
    var sprite = self._spriteMap[key];
    var id = self.sound.play(sprite);
    self.sound.stereo(stereo);
    self.sound.once('end', function() {
      if(parent === 'room1') {
        self.sound.play('high');
        self.sound.stereo(-1.0);
        self.sound.once('end', function(){
          self.sound.play('high');
          self.sound.stereo(-0.5);
          self.sound.once('end', function(){
            self.sound.play('high');
            self.sound.stereo(0.0);
            self.sound.once('end', function(){
              self.sound.play('high');
              self.sound.stereo(0.5);
              self.sound.once('end', function(){
                self.sound.play('high');
                self.sound.stereo(1.0);
              });
            });
          });
        });
      }
      else if (parent === 'room2') {
        self.sound.play('high');
        self.sound.stereo(-1.0);
        self.sound.once('end', function(){
          self.sound.play('high');
          self.sound.stereo(-0.5);
          self.sound.once('end', function(){
            self.sound.play('high');
            self.sound.stereo(0.0);
            self.sound.once('end', function(){
              self.sound.play('high');
              self.sound.stereo(0.3);
              self.sound.once('end', function(){
                self.sound.play('high');
                self.sound.stereo(0.6);
                self.sound.once('end', function(){
                  self.sound.play('high');
                  self.sound.stereo(1.0);
                });
              });
            });
          });
        });
      }

      else if (parent === 'room3') {
        self.sound.play('high');
        self.sound.stereo(-1.0);
        self.sound.once('end', function(){
          self.sound.play('high');
          self.sound.stereo(1.0);
        });
      }

      else if (parent === 'room4') {
        self.sound.play('high');
        self.sound.stereo(0.0);
      }

      else if (parent === 'house1') {
        // Room 1
        self.sound.play('medium');
        self.sound.once('end', function(){
          self.sound.play('high');
          self.sound.once('end', function(){
            self.sound.play('high');
            self.sound.once('end', function(){
              self.sound.play('high');
              self.sound.once('end', function(){
                self.sound.play('high');
                self.sound.once('end', function(){
                  self.sound.play('high');
                  // Room 2
        self.sound.once('end', function(){
          self.sound.play('medium');
          self.sound.once('end', function(){
            self.sound.play('high');
            self.sound.once('end', function(){
              self.sound.play('high');
              self.sound.once('end', function(){
                self.sound.play('high');
                self.sound.once('end', function(){
                  self.sound.play('high');
                  self.sound.once('end', function(){
                  self.sound.play('high');
                  self.sound.once('end', function(){
                    self.sound.play('high');
                    //Room 3
                    self.sound.once('end', function() {
                    self.sound.play('medium');
                    self.sound.once('end', function(){
                    self.sound.play('high');
                    self.sound.once('end', function(){
                    self.sound.play('high');
                    self.sound.once('end', function(){
                    // Room 4
                    self.sound.play('medium');
                    self.sound.once('end', function(){
                    self.sound.play('high');
                    });
                    });
                    });
                    });
                  });
                  });
                });
                });
              });
            });
          });
        });
                });
              });
            });
          });
        });
      }
    });
  },

  /**
   * Called on window resize to correctly position and size the click overlays.
   */
  resize: function() {
    var self = this;

    // Calculate the scale of our window from "full" size.
    var scale = window.innerWidth / 3600;

    // Resize and reposition the sprite overlays.
    var keys = Object.keys(self._spriteMap);
    for (var i=0; i<keys.length; i++) {
      var sprite = window[keys[i]];
      sprite.style.width = Math.round(self._width[i] * scale) + 'px';
      if (self._left[i]) {
        sprite.style.left = Math.round(self._left[i] * scale) + 'px';
      }
    }
  },

  /**
   * The step called within requestAnimationFrame to update the playback positions.
   */
  step: function() {
    var self = this;

    // Loop through all active sounds and update their progress bar.
    for (var i=0; i<self.sounds.length; i++) {
      var id = parseInt(self.sounds[i].id, 10);
      var offset = self._sprite[self.sounds[i].dataset.sprite][0];
      var seek = (self.sound.seek(id) || 0) - (offset / 1000);
      self.sounds[i].style.width = (((seek / self.sound.duration(id)) * 100) || 0) + '%';
    }

    requestAnimationFrame(self.step.bind(self));
  }
};

// Setup our new sprite class and pass in the options.
var sprite = new Sprite({
  //width: [100, 100, 100, 100, 100, 100],
  //left: [0, 342, 680, 1022, 1361],
  src: ['tests/audio/study3.webm', 'tests/audio/study3.mp3'],
  sprite: {
    //h1
    one: [0, 1200],
    //h2
    two: [1400, 1000],
    //kitchen
    kitchen: [2600, 300],
    //bedroom
    bedroom: [3000, 300],
    //backyard
    backyard: [3400, 500],
    //dining room
    dining: [3900, 600],
    // living room
    living: [4500, 700],
    //bathroom
    bathroom: [5200, 500],
    //attic
    attic: [5800, 200],
    //tree
    tree: [6000, 300],
    chair: [6400,180],
    fan: [6600,300],
    lamp: [6900,400],
    table: [7300,300],
    bed: [7700,300],
    couch: [8100,300],
    cabinet: [8600,400],
    high: [9050, 200],
    medium: [9400, 200],
    low: [9700, 300],
    clap: [10000, 300]

  },
  spriteMap: {
    house1: 'one',
    house2: 'two',
    room1: 'bedroom',
    room2: 'kitchen',
    room3: 'backyard',
    room4: 'attic',
    room21: 'living',
    room22: 'dining',
    room23: 'bedroom',
    room24: 'attic',
    room25: 'kitchen',


    // Six chairs in House 1
    chair1: 'chair',
    chair2: 'chair',
    chair3: 'chair',
    chair4: 'chair',
    chair5: 'chair',
    chair6: 'chair',

    // Six chairs in House 2
    chair1_1: 'chair',
    chair1_2: 'chair',
    chair1_3: 'chair',
    chair1_4: 'chair',

    // One cabinet in House 1
    cabinet1: 'cabinet',

    // One table in House 1
    table1: 'table',

    // Four tables in House 2
    table1_1: 'table',
    table1_2: 'table',
    table1_3: 'table',

    //Two beds in House 1
    bed1: 'bed',
    bed2: 'bed',

    //One bed in House 2
    bed1_1: 'bed',


    lamp1_1: 'lamp',
    lamp1_2: 'lamp',
    lamp1_3: 'lamp',
    lamp1_4: 'lamp',
    lamp1_5: 'lamp',


    //Fans in House 1
    fan1: 'fan',
    fan2: 'fan',

    //Trees in yard
    tree1: 'tree',
    tree2: 'tree',

    //Couch in House 2
    couch: 'couch',

    //Chimes
    high: 'high',
    medium: 'medium',
    low: 'low',
    clap: 'clap' }
});
