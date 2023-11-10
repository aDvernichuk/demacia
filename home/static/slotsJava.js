// all the const variables needed, including indexes for each row and the icon names for each given icon
const icon_width = 79,
	icon_height = 79,
	num_icons = 9,
	time_per_icon = 100,
	index_middle = [0, 0, 0, 0, 0],
	index_top = [0, 0, 0, 0, 0],
	index_bottom = [0, 0, 0, 0, 0],
	icon_Titles = ["banana", "seven", "cherry", "grape", "orange", "bell", "triple-bar", "lemon", "watermelon"];

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
				|| (index_top[0] == index_middle[1] && index_middle[1] == index_top[2] && index_top[2] == index_middle[3] && index_middle[3] == index_top[4])

				// Any 3-match middle
				|| (index_middle[0] == index_middle[1] && index_middle[1] == index_middle[2]) || (index_middle[1] == index_middle[2] && index_middle[2] == index_middle[3]) || (index_middle[2] == index_middle[3] && index_middle[3] == index_middle[4])

				// Any 4-match middle
				|| (index_middle[0] == index_middle[1] && index_middle[1] == index_middle[2] && index_middle[2] == index_middle[3]) || (index_middle[1] == index_middle[2] && index_middle[2] == index_middle[3] && index_middle[3] == index_middle[4])

			) {
				user.profile.credits = user.profile.credits + (bet * 5);
			}

			user.profile.credits -= bet;

			// continuously spin slots for now
			//setTimeout(rollAll, 4000);
		});
};