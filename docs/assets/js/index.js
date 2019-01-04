(function(win, $) {
	var X = 'X',
		O = 'O',
		win_X = 0,
		win_O = 0,
		moves_X = [],
		moves_O = [],
		turn = '',
		winner = null,
		moves = 0,
		boxes = 16;

	var randomTurn = function() {
		var number = Math.floor(Math.random() * 100 + 1);
		if (number % 2 == 0) {
			turn = 'O';
		} else {
			turn = 'X';
		}
	};

	var switchTurn = function() {
		if (checkWinner()) {
			countWin();
			winner = turn;
			setMessage(turn + ' has won the game. Start a new game');
		} else if (turn == X) {
			turn = O;
			setMessage("It's " + turn + " 's turn");
		} else {
			turn = X;
			setMessage("It's " + turn + " 's turn");
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

	var checkWinner = function() {
		var result = false;
		if (moves >= 4) {
			var winningCombos = [
				[ 1, 2, 3, 4 ],
				[ 5, 6, 7, 8 ],
				[ 9, 10, 11, 12 ],
				[ 13, 14, 15, 16 ],
				[ 1, 5, 9, 13 ],
				[ 2, 6, 10, 14 ],
				[ 3, 7, 11, 15 ],
				[ 4, 8, 12, 16 ],
				[ 1, 6, 11, 16 ],
				[ 4, 7, 10, 13 ]
			];

			winningCombos.map(function(combo) {
				var win_X = 0;
				var win_O = 0;
				combo.map(function(c) {
					if (moves_X.indexOf(c) !== -1) {
						win_X++;
					}

					if (moves_O.indexOf(c) !== -1) {
						win_O++;
					}

					if (win_X === 4) {
						result = true;
					}

					if (win_O === 4) {
						result = true;
					}
				});
			});
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
		$('#game .tic-tac-toe__game__square')
			.removeClass('btn-info')
			.removeClass('btn-primary')
			.removeClass('disable')
			.text('+');
	};

	var startNewGame = function() {
		clearBox();
		winner = null;
		randomTurn();
		moves = 0;
		moves_X = [];
		moves_O = [];
		setMessage(turn + " GET'S TO START ");
	};

	var setMessage = function(message) {
		$('#message').text(message);
	};

	$(function() {
		randomTurn();
		setMessage(turn + " GET'S TO START ");

		$('#game .tic-tac-toe__game__square').on('click', function() {
			moves++;
			if (winner != null) {
				setMessage(turn + ' has won the game. Start a new game');
			} else if ($(this).text() == '+') {
				$(this).text(turn);
				addClass($(this));

				if (turn == X) {
					moves_X.push(parseInt($(this).attr('id')));
				} else {
					moves_O.push(parseInt($(this).attr('id')));
				}

				switchTurn();
				if (parseInt(checkTie()) == boxes && winner == null) {
					setMessage("It's a tie. It will restart.");
				}
			} else {
				if (winner == null && parseInt(checkTie()) !== boxes) {
					setMessage('Already Selected');
				}
			}
		});

		$('#reset').on('click', function() {
			startNewGame();
		});
	});
})(window, jQuery);
