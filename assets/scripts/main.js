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
// Check if warp drive is already activated
var isAccelerating = false;



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




$.keyframe.define([{
    name: 'loadPower',
    '0%': { "width": "0%" },
    '100%': { "width": "100%" }
}]);


$.keyframe.define([{
    name: 'accelerating',
    '0%': {
        "transform": "scale(1)",
    },
    '2%': {
        "opacity": 0.8,
        "filter": "blur(1px)",
    },
    '5%': {
        "transform": "scale(2)",
        "background": "black",
        "opacity": 0.9,
        "filter": "blur(1px)",
        "box-shadow": "inset 3px 6px 100px blue"
    },
    '15%': {
        "transform": "scale(3) translate3d(120deg,0,30deg)",
        "background": "rgba(255,255,255,0.5)",
        "opacity": 0.8,
        "filter": "blur(2px)",
    },
    '80%': {
        "transform": "scale(10) translate3d(120deg,0,30deg)",
        "background": "rgba(255,255,255,0.5)",
        "opacity": 0.2,
        "filter": "blur(3px)"
    },
    '100%': {
        "transform": "scale(1)"
    }
}]);

$.keyframe.define([{
    name: 'rotating',
    '0%': {
        "border": "100px solid rgba(255,255,255,0.3)",
        "box-shadow": "0 0 20px 20px rgba(255,255,255,0.3)"
    },
    '100%': {
        "transform": "scale(10)",
        "box-shadow": "0 0 20px 20px rgba(255,255,255,0.9)",
        "opacity": 0
    }
}]);




function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// Create shooting star
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
        duration: randomInt(1, 5) + 's',
        timingFunction: 'ease-in',
        iterationCount: 1,
        direction: 'normal',
        fillMode: 'forwards',
        complete: function() {

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
        var rand = Math.random();
        if (rand < stars_shooting_p) {
            createShootingStar();
        }
    }
}


function loadPower() {


    $(".bar").playKeyframe({
        name: 'loadPower',
        duration: '2s',
        timingFunction: 'ease-in',
        delay: '4s',
        iterationCount: 1,
        direction: 'normal',
        fillMode: 'forwards',
        complete: function() {

            console.log("loading complete");
            isAccelerating = false;
            $("body").resetKeyframe();

        }

    });
}

$(document).keydown(function(e) {
    console.log(isAccelerating);
    $(".bar").resetKeyframe();

    if (e.keyCode == 38 && !isAccelerating) {

        isAccelerating = true;
        $(".sky").append("<div class='horizon'></div>");
        $("body").addClass("red");

        $(".horizon").playKeyframe({
            name: 'rotating',
            duration: '1s',
            delay: '2s',
            iterationCount: "infinite",
            timingFunction: 'ease-in',
            direction: 'normal',
            fillMode: 'forwards',
            complete: function() {
                $("body").removeClass("red");

                $(".horizon").resetKeyframe();

            }
        });

        $("body").append("<div class='initializing'>WARP DRIVE</div>");

        $(".initializing").delay(1000).fadeOut();




        if ($("body").hasClass("boostKeyFrame")) {
            $("body").attr("class", "");
        } else {
            $("body").playKeyframe({
                name: 'accelerating',
                duration: '3s',
                timingFunction: 'ease-in',
                iterationCount: 1,
                delay: '2s',
                direction: 'normal',
                fillMode: 'forwards',
                complete: function() {
                    loadPower();
                }

            });
        }
    }

});



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