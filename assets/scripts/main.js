var supportedFlag = $.keyframe.isSupported();

// Helper variable
var stars_count = 0;
// Initial value of stars count
var initial_stars_count = 200;
// Total amount of generated stars
var stars_count_max = 400;
// Probability of a shooting star per given interval
var stars_shooting_p = 0.2;
// Interval to create new stars in milliseconds (ms)
var stars_creation_interval = 3000;

// ###
// TODO: Star size variation
var stars_size_variation = 2;
// TODO: Star_min_size (0) plus border 1px (should be probably changed to use the box-shadow)
var stars_min_size = 0;
// TODO: Star_max_size
var stars_min_size = 1;
// TODO: Comets fun
var stars_comets = 1;
// TODO: shorter syntax
var stars = [0, 100, 2, 20, 0, 1, 3000, 1];
// ###

function createShootingStar() {
  var id = Math.floor(Math.random() * $(".star").size());
  var pos = $(".star:nth-child(" + id + ")").position();
  var rand_x = Math.floor(Math.random() * 100);
  var rand_y = Math.floor(Math.random() * 100);
  var now_x = Math.floor(pos.left);
  var now_y = Math.floor(pos.top);

  // TODO: Implement also negative value for x and y coordinates

  var shrink = {
    'width': '0px',
    'height': '0px',
    'opacity': 0
  };

  var end = {
    'transform': 'translate(' + rand_x + 'px,' + rand_y + 'px)'
  };

  $.keyframe.define([{
    name: 'shooting',
    '0%': {
      top: now_y + 'px',
      left: now_x + 'px'
    },
    '90%': shrink,
    '100%': end
  }]);

  $(".star").eq(id).playKeyframe({
    name: 'shooting',
    duration: '1s',
    timingFunction: 'ease-in',
    iterationCount: 1,
    direction: 'normal',
    fillMode: 'forwards',
    complete: function() {
      $(".boostKeyframe").fadeOut().remove();
    }
  });
}

function createStars() {
  if (stars_count < stars_count_max) {
    var rand_top = Math.floor(Math.random() * $(window).height());
    var rand_left = Math.floor(Math.random() * $(window).width());
    var rand_right = Math.floor(Math.random() * $(window).width());
    if (rand_left < rand_right) {
      rand_left = rand_right;
    }
    $('.sky').append('<div class="star" id="' + stars_count + '" style="top:' + rand_top + 'px; left: ' + rand_left + 'px"></div>');
    $('#' + stars_count).addClass('twinkle').css('top', rand_top + 'px').css('left', rand_left + 'px');
    stars_count++;
    var rand = Math.floor(Math.random());
    if (rand > stars_shooting_p) {
      createShootingStar();
    }
  }
}
$(document).ready(function() {
  while (stars_count < initial_stars_count) {
    var rand_top = Math.floor(Math.random() * $(window).height() * 2);
    var rand_left = Math.floor(Math.random() * $(window).width() * 2);
    var rand_size = Math.floor((Math.random()) * 2);
    $('.sky').append('<div class="star" id="' + stars_count + '" style="border: 1px solid white; width: ' + rand_size + 'px; height: ' + rand_size + 'px; top:' + rand_top + 'px; left: ' + rand_left + 'px"></div>');
    stars_count++;
  }
  setInterval(createStars, stars_creation_interval);
});
