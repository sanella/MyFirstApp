
var gameTimer;
var forceStart;

$(document).ready(function () {
    $(".button-collapse").sideNav({
        closeOnClick: true
    });


    $("button").click(function (event) {

        event.preventDefault();
        $(function () {
            $('#stopwatch-1').stopwatch('theme-1');
            newBoard();

        });

    });


    //$.mobile.navigate("#credits");

    $(".nav-wrapper li a").click(function (event) {

        if ($(this).attr("href") !== "#play") {
            clearInterval(gameTimer);
            $('#stopwatch-1').stopwatch('theme-1');
            newBoard();
            forceStart = true;
            $('#gameResetButton').click();
        } else {
            $('.start-stop').click();
        }

    });






});

var score = 0;
var memory_array = ['Inovativno', 'Inovativno',
                   ' Intenzivno', ' Intenzivno',
                   'Jedinstvena prilika', 'Jedinstvena prilika',
                   'Pomjeranje granica', 'Pomjeranje granica',
                   'Timski rad', 'Timski rad',
                   'Put do posla iz snova', 'Put do posla iz snova'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
Array.prototype.memory_tile_shuffle = function () {
    var i = this.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard() {
    tiles_flipped = 0;
    var output = '';
    memory_array.memory_tile_shuffle();
    for (var i = 0; i < memory_array.length; i++) {
        output += '<div id="tile_' + i + '" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
}




function memoryFlipTile(tile, val) {
    if (tile.innerHTML == "" && memory_values.length < 2) {
        tile.style.background = '#FFF';
        tile.innerHTML = val;
        if (memory_values.length == 0) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if (memory_values.length == 1) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if (memory_values[0] == memory_values[1]) {

                var tile_1 = document.getElementById(memory_tile_ids[0]);
                var tile_2 = document.getElementById(memory_tile_ids[1]);

                tile_1.style.background = 'url(./images/logoBit5.jpg) no-repeat';
                tile_1.style.text
                tile_1.innerHTML = "";
                tile_2.style.background = 'url(./images/logoBit5.jpg) no-repeat';
                tile_2.innerHTML = "";


                tiles_flipped += 2;
                // Clear both arrays
                memory_values = [];
                memory_tile_ids = [];
                // Check to see if the whole board is cleared

                score++;
                if (tiles_flipped == memory_array.length) {
                    alert("Board cleared... generating new board");
                    document.getElementById('memory_board').innerHTML = "";
                    newBoard();
                }
            } else {
                function flip2Back() {
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = 'url(tile_bg.jpg) no-repeat';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(tile_bg.jpg) no-repeat';
                    tile_2.innerHTML = "";
                    // Clear both arrays
                    memory_values = [];
                    memory_tile_ids = [];
                }
                setTimeout(flip2Back, 500);
            }
        }
    }
}



var timer = 0;

(function ($) {
    $.fn.stopwatch = function (theme) {
        var stopwatch = $(this);
        stopwatch.addClass('stopwatch').addClass(theme);

        stopwatch.each(function () {
            var instance = $(this);

            var stopwatchFace = $('<div>').addClass('the-time');
            var timeHour = $('<span>').addClass('hr').text('00');
            var timeMin = $('<span>').addClass('min').text('00');
            var timeSec = $('<span>').addClass('sec').text('00');
            var startStopBtn = $('<a id="startTimer">').attr('href', '').addClass('start-stop hidden').text('Start');
            var resetBtn = $('<a id="gameResetButton">').attr('href', '').addClass('reset hidden').text('Reset');
            stopwatchFace = stopwatchFace.append(timeHour).append(timeMin).append(timeSec);
            instance.html('').append(stopwatchFace).append(startStopBtn).append(resetBtn);


            startStopBtn.bind('click', function (e) {
                e.preventDefault();
                var button = $(this);
                if (button.text() === 'Start' || forceStart == true) {
                    gameTimer = setInterval(runStopwatch, 1000);
                    button.text('Stop');
                } else {
                    clearInterval(gameTimer);
                    button.text('Start');
                }
            });

            resetBtn.bind('click', function (e) {
                e.preventDefault();
                clearInterval(gameTimer);
                startStopBtn.text('Stop');
                gameTimer = 0;
                timeHour.text('00');
                timeMin.text('00');
                timeSec.text('00');
            });
            startStopBtn.click();
            $.mobile.navigate("#play");


            function runStopwatch() {
                // We need to get the current time value within the widget.
                var hour = parseFloat(timeHour.text());
                var minute = parseFloat(timeMin.text());
                var second = parseFloat(timeSec.text());

                second++;

                if (second > 20) {
                    //window.location = "www.nesto.com";
                    $.mobile.navigate("#home");
                    document.querySelector('.results').innerHTML = 'Your score is: ' + score;


                    second = 0;
                    startStopBtn.click();

                }



                timeHour.html("0".substring(hour >= 10) + hour);
                timeMin.html("0".substring(minute >= 10) + minute);
                timeSec.html("0".substring(second >= 10) + second);
            }
        });
    }
})(jQuery);