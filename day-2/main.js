import { readFileSync } from 'fs';

const plays = {
	Rock: 1,
	Paper: 2,
	Scissors: 3,
};

const rockPapersScissorsMatchOutcome = {
	YouWin: 0,
	YouLose: 1,
	Tie: 2,
};

const outcomeToYourPoints = (yourPick, currentPoints) => ({
	YouWin: currentPoints + 6 + yourPick,
	YouLose: currentPoints + yourPick,
	Tie: currentPoints + 3 + yourPick,
});

const outcomeToOpponentPoints = (opponentPick, currentPoints) => ({
	YouWin: currentPoints + opponentPick, 
	YouLose: currentPoints + 6 + opponentPick,
	Tie: currentPoints + opponentPick + 3,
});

const keyValueToString = (keyValue, dict) =>
	Object.keys(dict).find((el) => dict[el] === keyValue);

const rockPapersScissorsMatch = (yourPick, opponentPick) => {
	if (yourPick === opponentPick) {
		return rockPapersScissorsMatchOutcome.Tie;
	}

	if (
		(yourPick === plays.Paper && opponentPick === plays.Rock) ||
		(yourPick === plays.Scissors && opponentPick === plays.Paper) ||
		(yourPick === plays.Rock && opponentPick === plays.Scissors)
	) {
		return rockPapersScissorsMatchOutcome.YouWin;
	}

	if (
		(opponentPick === plays.Paper && yourPick === plays.Rock) ||
		(opponentPick === plays.Scissors && yourPick === plays.Paper) ||
		(opponentPick === plays.Rock && yourPick === plays.Scissors)
	) {
		return rockPapersScissorsMatchOutcome.YouLose;
	}
};

const decodePlay = {
	opponent: { A: plays.Rock, B: plays.Paper, C: plays.Scissors },
	player: { X: plays.Rock, Y: plays.Paper, Z: plays.Scissors },
};

let points = {
    YourPoints: 0,
    OpponentPoints: 0
};

readFileSync(process.stdin.fd, 'utf-8')
    .trim()
	.split('\n')
	.forEach((el) => {
		const playsCodedData = el.split(' ');

		const playsDecoded = {
			You: decodePlay.player[playsCodedData[1]],
            Opponent: decodePlay.opponent[playsCodedData[0]],
		};

		const outcome = rockPapersScissorsMatch(
			playsDecoded.You,
			playsDecoded.Opponent
		);

        const outcomeKey = keyValueToString(outcome, rockPapersScissorsMatchOutcome);

		const matchRedeable = [
			...Object.values(playsDecoded).map((keyValue) =>
				keyValueToString(keyValue, plays)
			),
			outcomeKey,
		];


        points.YourPoints = outcomeToYourPoints(playsDecoded.You, points.YourPoints)[outcomeKey]
        points.OpponentPoints = outcomeToOpponentPoints(playsDecoded.Opponent, points.OpponentPoints)[outcomeKey]

        console.log(`You pick ${matchRedeable[0]}, your opponent picks ${matchRedeable[1]}, ${matchRedeable[2].replace('You', 'You ').toLowerCase()}.`)
	});

if (points.YourPoints > points.OpponentPoints) {
    console.log(`You win the tournament with ${points.YourPoints} points.`)
} else if (points.OpponentPoints > points.YourPoints) {
    console.log(`The opponent wins the tournament with ${points.OpponentPoints} points.`)
} else if (points.YourPoints === points.OpponentPoints) {
    console.log(`The tournament was a tie! With ${points.OpponentPoints} points for both.`)
}
