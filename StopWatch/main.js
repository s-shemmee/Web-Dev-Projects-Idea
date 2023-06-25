// Get the start, stop, and reset buttons
let startBtn = document.getElementById('start');
let stopBtn = document.getElementById('stop');
let resetBtn = document.getElementById('reset');

// Initialize variables for hour, minute, second, and count
let hour = 00;
let minute = 00;
let second = 00;
let count = 00;

// Event listener for the start button
startBtn.addEventListener('click', function () {
	timer = true;
	stopWatch();
});

// Event listener for the stop button
stopBtn.addEventListener('click', function () {
	timer = false;
});

// Event listener for the reset button
resetBtn.addEventListener('click', function () {
	timer = false;
	hour = 0;
	minute = 0;
	second = 0;
	count = 0;
	document.getElementById('hr').innerHTML = "00";
	document.getElementById('min').innerHTML = "00";
	document.getElementById('sec').innerHTML = "00";
	document.getElementById('count').innerHTML = "00";
});

// Function to run the stopwatch
function stopWatch() {
	if (timer) {
		count++;

		if (count == 100) {
			second++;
			count = 0;
		}

		if (second == 60) {
			minute++;
			second = 0;
		}

		if (minute == 60) {
			hour++;
			minute = 0;
			second = 0;
		}

		let hrString = hour;
		let minString = minute;
		let secString = second;
		let countString = count;

		if (hour < 10) {
			hrString = "0" + hrString;
		}

		if (minute < 10) {
			minString = "0" + minString;
		}

		if (second < 10) {
			secString = "0" + secString;
		}

		if (count < 10) {
			countString = "0" + countString;
		}

		// Update the display with the updated time values
		document.getElementById('hr').innerHTML = hrString;
		document.getElementById('min').innerHTML = minString;
		document.getElementById('sec').innerHTML = secString;
		document.getElementById('count').innerHTML = countString;

		// Call the stopWatch function again after a delay of 10 milliseconds
		setTimeout(stopWatch, 10);
	}
}
