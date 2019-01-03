(function(win, $) {
	var X = 'X',
		O = 'O',
		win_X = 0,
		win_O = 0,
		turn = 'X',
		winner = null;
	var switchTurn = function() {
		if (checkWinner(turn)) {
			alert(turn + ' has won the game. Start a new game');
			countWin();
			winner = turn;
		} else if (turn == X) {
			turn = O;
		} else {
			turn = X;
		}
	};

	var checkTie = function() {
		return $('#game .disable').length;
	};

	var countWin = function() {
		if (turn == X) {
			win_X++;
		} else {
			win_O++;
		}
		$('#win_X').text(win_X);
		$('#win_O').text(win_O);
	};

	var getBox = function(number) {
		return $('#s' + number).text();
	};

	var checkRow = function(a, b, c, turn) {
		var result = false;
		if (getBox(a) == turn && getBox(b) == turn && getBox(c) == turn) {
			result = true;
		}
		return result;
	};

	var checkWinner = function(move) {
		var result = false;
		if (
			checkRow(1, 2, 3, move) ||
			checkRow(4, 5, 6, move) ||
			checkRow(7, 8, 9, move) ||
			checkRow(1, 4, 7, move) ||
			checkRow(2, 5, 8, move) ||
			checkRow(3, 6, 9, move) ||
			checkRow(1, 5, 9, move) ||
			checkRow(3, 5, 7, move)
		) {
			result = true;
		}
		return result;
	};

	var addClass = function(element) {
		if (turn == X) {
			element.addClass('disable btn-info');
		} else {
			element.addClass('disable btn-primary');
		}
	};

	var clearBox = function() {
		$('#game .tic-tac-toe__game--square')
			.removeClass('btn-info')
			.removeClass('btn-primary')
			.removeClass('disable')
			.text('+');
	};

	var startNewGame = function() {
		clearBox();
		winner = null;
	};

	$(function() {
		$('#game .tic-tac-toe__game--square').on('click', function() {
			if (winner != null) {
				alert(turn + ' has won the game. Start a new game');
			} else if ($(this).text() == '+') {
				$(this).text(turn);
				addClass($(this));
				switchTurn();
				if (parseInt(checkTie()) == 9 && winner == null) {
					alert('Its a tie. It will restart.');
				}
			} else {
				alert('Already Selected');
			}
		});

		$('#reset').on('click', function() {
			startNewGame();
		});
	});
})(window, jQuery);
