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
var house2Array = ['clap', 'clap', 'clap', 'room21'];

var room21Array = ['clap', 'room22', 'house2', 'couch'];
var couchArray = ['clap', 'lamp1_5', 'room21', 'clap'];
var lamp1_5Array = ['couch', 'clap', 'room21', 'clap'];

var room22Array = ['room21', 'room23', 'house2', 'chair1_1'];
var chair1_1Array = ['clap', 'chair1_2', 'room22', 'clap'];
var chair1_2Array = ['chair1_1', 'chair1_3', 'room22', 'clap'];
var chair1_3Array = ['chair1_2', 'chair1_4', 'room22', 'clap'];
var chair1_4Array = ['chair1_3', 'table1_1', 'room22', 'clap'];
var table1_1Array = ['chair1_4', 'lamp1_1', 'room22', 'clap'];
var lamp1_1Array = ['table1_1', 'clap', 'room22', 'clap'];

var room23Array = ['room22', 'room24', 'house2', 'bed1_1'];
var bed1_1Array = ['clap', 'lamp1_2', 'room23', 'clap'];
var lamp1_2Array = ['bed1_1', 'clap', 'room23', 'clap'];

var room24Array = ['room23', 'room25', 'house2', 'lamp1_3' ];
var lamp1_3Array = ['clap', 'table1_2', 'room24', 'clap'];
var table1_2Array = ['lamp1_3', 'lamp1_4', 'room24', 'clap'];
var lamp1_4Array = ['lamp1_3', 'clap', 'room24', 'clap'];

var room25Array = ['room24', 'clap', 'house2', 'table1_3' ];
var table1_3Array = ['clap', 'clap', 'room25', 'clap'];

var selected_node = 'house2';
var rightTracker = 1;
var leftTracker = 1;

var h1_rooms = 4;
var r1_f = 5;
var r2_f = 6;
var r3_f = 2;
var r4_f = 1;

var h2_rooms = 5;
var r21_f = 2;
var r22_f = 6;
var r23_f = 2;
var r24_f = 3;
var r25_f = 1;

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
        var id = self.play(window[selected_node + 'Array'][0]);
        break;
      }
      else {var id = self.play(window[selected_node + 'Array'][0]);
      selected_node = window[selected_node + 'Array'][0];
      break;
      }

    case "ArrowRight":
      // Right pressed
      rightTracker += 1;
      leftTracker -= 1;
      var id = self.play(window[selected_node + 'Array'][1]);
      selected_node = window[selected_node + 'Array'][1];
      break;

    case "ArrowUp":
      // Up pressed
      self.play(window[selected_node + 'Array'][2]);
      selected_node = window[selected_node + 'Array'][2];
      break;
    case "ArrowDown":
      // Down pressed
      self.play(window[selected_node + 'Array'][3]);
      selected_node = window[selected_node + 'Array'][3];
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
    var id = self.sound.play(sprite);

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
  src: ['tests/audio/study3_2.webm', 'tests/audio/study3_2.mp3'],
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
    clap: [10000,300]

  },
  spriteMap: {
    house2: 'two',
    room21: 'living',
    room22: 'dining',
    room23: 'bedroom',
    room24: 'attic',
    room25: 'kitchen',

    // Six chairs in House 2
    chair1_1: 'chair',
    chair1_2: 'chair',
    chair1_3: 'chair',
    chair1_4: 'chair',


    // Four tables in House 2
    table1_1: 'table',
    table1_2: 'table',
    table1_3: 'table',

    //One bed in House 2
    bed1_1: 'bed',


    lamp1_1: 'lamp',
    lamp1_2: 'lamp',
    lamp1_3: 'lamp',
    lamp1_4: 'lamp',
    lamp1_5: 'lamp',

    //Couch in House 2
    couch: 'couch',
    clap: 'clap' }
});
