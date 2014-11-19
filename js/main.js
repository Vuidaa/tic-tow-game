  			 var X_score = 0;
             var O_score = 0;

             var X = [];
             var O = [];

             var combos = [
                 [1, 2, 3],
                 [4, 5, 6],
                 [7, 8, 9],
                 [1, 4, 7],
                 [2, 5, 8],
                 [3, 6, 9],
                 [1, 5, 9],
                 [3, 5, 7]
             ];

             var turns = ['X', 'O'];

             var turn = turns[Math.floor(Math.random() * turns.length)];

             var seconds = 4

             var countdownTimer = setInterval('secondPassed()', 1000);

             var winner = false;

             $("#turn").html(turn);
             $(".square").click(function() {

                 var square = $(this).data('value');

                 var turnarray = window[turn];

                 if (jQuery.inArray(square, X) == -1 && jQuery.inArray(square, O) == -1 && winner == false) {
                     turnarray.push(square);
                     $(this).html(turn);

                     if (turnarray.length >= 3) {
                         $.each(combos, function(index, array) {
                             if (jQuery.inArray(array[0], turnarray) != -1 && jQuery.inArray(array[1], turnarray) !== -1 && jQuery.inArray(array[2], turnarray) !== -1) {
                                 winner = true;
                                 initWinner(turn, array);
                                 restartGame();

                                 return true;
                             } else if (X.length + O.length == 9) {
                                 winner = true;
                                 initDraw();

                                 return true;
                             }
                         });
                     }
                     switchTurn();
                 }
             });

             function restartGame() {
                 $(".btn").click(function() {

                     $(".square").html("");
                     $(".game-info").html("Time: <span id='countdown'>5 s</span> | Turn: <span id='turn'>X</span>");
                     X = [];
                     O = [];

                     turn = turns[Math.floor(Math.random() * turns.length)];

                     $("#turn").html(turn);

                     winner = false;
                     seconds = 4

                     clearInterval(countdownTimer);
                     countdownTimer = setInterval('secondPassed()', 1000);
                 });
             }

             function initWinner(turn, array) {

                 $(".square").html("");

                 $.each(array, function(index, element) {
                     $(".square[data-value=" + element + "]").html(turn);
                 });

                 window[turn + "_score"] ++;
                 $("#" + turn + "_score").html(window[turn + "_score"]);
                 $(".game-info").html("<button class='btn'> Winner - <b>" + turn + "</b>, Play again </button>");
             }

             function initDraw() {
                 $(".game-info").html("<button class='btn'> Draw, Play again</button>");
                 restartGame();
             }


             function secondPassed() {
                 var remainingSeconds = seconds % 60;

                 if (seconds == 0) {
                     $("#countdown").html("5 s");
                 } else {
                     $("#countdown").html(remainingSeconds + " s");
                 }

                 if (seconds == 0) {
                     seconds = 4;

                     var newturn = turn == 'X' ? turn = 'O' : turn = 'X';
                     $('#turn').html(newturn);
                 } else {
                     seconds--;
                 }
             }

             function switchTurn() {
                 turn == 'X' ? turn = 'O' : turn = 'X';

                 $("#turn").html(turn);

                 clearInterval(countdownTimer);
                 $("#countdown").html('5 s');
                 seconds = 4;
                 countdownTimer = setInterval('secondPassed()', 1000);
             }
