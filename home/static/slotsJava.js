// all the const variables needed, including indexes for each row and the icon names for each given icon
const icon_width = 79,
	icon_height = 79,
	num_icons = 9,
	time_per_icon = 100,
	index_middle = [0, 0, 0, 0, 0],
	index_top = [0, 0, 0, 0, 0],
	index_bottom = [0, 0, 0, 0, 0],
	icon_Titles = ["banana", "seven", "cherry", "grape", "orange", "bell", "triple-bar", "lemon", "watermelon"];

var temp_creds = 0;

// function that calculates the speed and time of the roll for each reel
const roll = (reel, offset = 0) => {
	const calc = (offset + 3) * num_icons + Math.round(Math.random() * num_icons);

	return new Promise((resolve, reject) => {

		const style = getComputedStyle(reel),
			backgroundPositionY = parseFloat(style["background-position-y"]),
			targetBackgroundPositionY = backgroundPositionY + calc * icon_height,
			normTargetBackgroundPositionY = targetBackgroundPositionY % (num_icons * icon_height);

		reel.style.transition = `background-position-y ${1 + calc * time_per_icon}ms cubic-bezier(.63,.09,.47,1.07)`;
		reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;

		setTimeout(() => {
			reel.style.transition = `none`;
			reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
			resolve(calc % num_icons)
		}, 1 + calc * time_per_icon)

	})
};



// spins the slots and returns a win or loss result
function rollAll(bet) {

	var creds = parseFloat(JSON.parse(document.getElementById('creds').textContent));

	while (bet <= 0)
		return;
	while (bet > creds)
		return;


	document.getElementById("slots_button").disabled = true;
	setTimeout(function () { document.getElementById("slots_button").disabled = false; }, 9000);

	const reelList = document.querySelectorAll('.slot_machine > .reel');

	// rolls and then gets the index values of the icons for the middle row
	Promise
		.all([...reelList].map((reel, i) => roll(reel, i)))
		.then((calc) => {
			calc.forEach((calc, i) => index_middle[i] = (index_middle[i] + calc) % num_icons);

			// get the index values of the icons for the top row
			for (let i = 0; i < 5; i++) {
				if (index_middle[i] == 8)
					index_top[i] = 0;
				else
					index_top[i] = index_middle[i] + 1;
			}

			// get the index values of the icons for the bottom row
			for (let i = 0; i < 5; i++) {
				if (index_middle[i] == 0)
					index_bottom[i] = 8;
				else
					index_bottom[i] = index_middle[i] - 1;
			}

			index_top.map((id_t) => { console.log(icon_Titles[id_t]) })
			console.log('\n')
			index_middle.map((id_m) => { console.log(icon_Titles[id_m]) })
			console.log('\n')
			index_bottom.map((id_b) => { console.log(icon_Titles[id_b]) })
			console.log('\n')


			// check for win conditions
			// full middle line match 
			if ((index_middle[0] == index_middle[1] && index_middle[1] == index_middle[2] && index_middle[2] == index_middle[3] && index_middle[3] == index_middle[4])

				// V-shape match
				|| (index_top[0] == index_middle[1] && index_middle[1] == index_bottom[2] && index_bottom[2] == index_middle[3] && index_middle[3] == index_top[4])

				// Reverse V-shape match
				|| (index_bottom[0] == index_middle[1] && index_middle[1] == index_top[2] && index_top[2] == index_middle[3] && index_middle[3] == index_bottom[4])

				// Bottom M-shape match
				|| (index_bottom[0] == index_middle[1] && index_middle[1] == index_bottom[2] && index_bottom[2] == index_middle[3] && index_middle[3] == index_bottom[4])

				// Top W-shape match
				|| (index_top[0] == index_middle[1] && index_middle[1] == index_top[2] && index_top[2] == index_middle[3] && index_middle[3] == index_top[4])) {

				// banana
				if (index_middle[1] == 0) {
					bet = bet * 12.5;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// melon
				else if (index_middle[1] == 1) {
					bet = bet * 15;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// lemon
				else if (index_middle[1] == 2) {
					bet = bet * 20;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// triple bar
				else if (index_middle[1] == 3) {
					bet = bet * 33.3;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// bell
				else if (index_middle[1] == 4) {
					bet = bet * 40;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// orange
				else if (index_middle[1] == 5) {
					bet = bet * 50;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// plum
				else if (index_middle[1] == 6) {
					bet = bet * 100;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// cherry
				else if (index_middle[1] == 7) {
					bet = bet * 222;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// seven
				else if (index_middle[1] == 8) {
					bet = bet * 777;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}

			}

			// Any 3-match middle
			else if ((index_middle[0] == index_middle[1] && index_middle[1] == index_middle[2]) || (index_middle[1] == index_middle[2] && index_middle[2] == index_middle[3]) || (index_middle[2] == index_middle[3] && index_middle[3] == index_middle[4])) {

				// banana
				if (index_middle[2] == 0) {
					bet = bet * 1.25;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// melon
				else if (index_middle[2] == 1) {
					bet = bet * 1.5;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// lemon
				else if (index_middle[2] == 2) {
					bet = bet * 2;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// triple bar
				else if (index_middle[2] == 3) {
					bet = bet * 3;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// bell
				else if (index_middle[2] == 4) {
					bet = bet * 3.5;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// orange
				else if (index_middle[2] == 5) {
					bet = bet * 5;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// plum
				else if (index_middle[2] == 6) {
					bet = bet * 6;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// cherry
				else if (index_middle[2] == 7) {
					bet = bet * 8;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// seven
				else if (index_middle[2] == 8) {
					bet = bet * 10;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}

			}

				// Any 4-match middle
			else if ((index_middle[0] == index_middle[1] && index_middle[1] == index_middle[2] && index_middle[2] == index_middle[3]) || (index_middle[1] == index_middle[2] && index_middle[2] == index_middle[3] && index_middle[3] == index_middle[4])) {

				// banana
				if (index_middle[1] == 0) {
					bet = bet * 5;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// melon
				else if (index_middle[1] == 1) {
					bet = bet * 8;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// lemon
				else if (index_middle[1] == 2) {
					bet = bet * 12;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// triple bar
				else if (index_middle[1] == 3) {
					bet = bet * 16;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// bell
				else if (index_middle[1] == 4) {
					bet = bet * 20;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// orange
				else if (index_middle[1] == 5) {
					bet = bet * 25;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// plum
				else if (index_middle[1] == 6) {
					bet = bet * 30;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// cherry
				else if (index_middle[1] == 7) {
					bet = bet * 40;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}
				// seven
				else if (index_middle[1] == 8) {
					bet = bet * 50;
					creds += bet;
					alert("You have won: " + bet + " credits! Play Again?")
				}

			}

			else {
				creds -= bet;
				alert("You have lost: " + bet + " credits! Play Again?")
			}

			document.getElementById('bet').value = 0;
			setTimeout(function () { document.getElementById("slots_button").disabled = false; }, 9000);
			console.log(creds);
			console.log(bet);


			temp_creds = creds;

			fetch("", {
				method: "POST",
				headers: {
					"Content-Type": "text/html",
				},
				body: temp_creds,

			});

			document.getElementsByName("creditdisplay")[0].innerHTML = "Credits: " + temp_creds;

			fetch("", {
				method: "POST",
				headers: {
					"Content-Type": "text/html",
				},
				body: temp_creds,
			})

			document.getElementsByName("creditdisplay")[0].innerHTML = "Credits: " + temp_creds;

		}

	)
	
}
