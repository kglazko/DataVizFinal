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
var house1Array = ['house1', 'house2', 'house1', 'room1_1'];
var house2Array = ['house1', 'house3', 'house2', 'room2_1'];
var house3Array = ['house2', 'house3', 'house3', 'room3_1'];

var room1_1Array = ['house1', 'house2', 'house3', 'house1'];
var selected_node = 'house1';

var elms = ['waveform', 'house1', 'house2', 'house3'];
elms.forEach(function(elm) {
  window[elm] = document.getElementById(elm);
});

/**
 * Sprite class containing the state of our sprites to play and their progress.
 * @param {Object} options Settings to pass into and setup the sound and visuals.
 */
var Flow = function(options) {
  var self = this;

  self.sounds = [];

  // Setup the options to define this sprite display.
  //self._width = options.width;
  //self._left = options.left;
  self._spriteMap = options.spriteMap;
  self._sprite = options.sprite;
  self.setupListeners();

  // Create our audio sprite definition.
  self.sound = new Howl({
    src: options.src,
    stereo: -1.0,
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
      case "ArrowLeft":
      // Left pressed
      console.log(window[selected_node + 'Array'][0]);
      self.play(window[selected_node + 'Array'][0]);
      selected_node = window[selected_node + 'Array'][0];
      break;

    case "ArrowRight":
      // Right pressed
      self.play(window[selected_node + 'Array'][1]);
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
Flow.prototype = {
  /**
   * Setup the listeners for each sprite click area.
   */
  setupListeners: function() {
    var self = this;
    var keys = Object.keys(self._spriteMap);

    keys.forEach(function(key) {
      window[key].addEventListener('click', function() {
        console.log(key);
        self.play(key);
      }, false);
    });

  },

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
var flow = new Flow({
  //width: [100, 100, 100, 100, 100, 100],
  //left: [0, 342, 680, 1022, 1361],
  src: ['../../tests/audio/block.webm', '../../tests/audio/block.mp3'],
  sprite: {
    sound_house1: [0, 450],
    sound_house2: [2000, 250],
    sound_house3: [4000, 350],
    sound_living: [6000, 380],
    sound_bedroom: [8000, 340],
    sound_bathroom: [10000, 11163]
  },
  spriteMap: {
    house1: 'sound_house1',
    house2: 'sound_house2',
    house3: 'sound_house3',
    living: 'sound_living',
    bedroom: 'sound_bedroom',
    bathroom: 'sound_bathroom'  }
});