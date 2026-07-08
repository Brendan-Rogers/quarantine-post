// SEAF (Self Executing Anonymous Function)
(function () {
	"use strict";
	console.log("JS Initialized");

	// VARS
	const command_box = document.getElementById("command");
	const output_box = document.getElementById("output");
	const logo_div = document.getElementById("logoDIV");
	const logo_img = document.getElementById("logoIMG");
	const document_body = document.querySelector("body");

	// Objects
	let blogObj = {};
	let poems = {};

	// Strings
	const first_post =
		"<p>>> Welcome to THE QUARANTINE POST. Use command >>HELP for some DIRECTIONS.</p>";
	let mode = "night";
	let active_post = "";
	let androidKey = "";

	// Command history (up/down arrows)
	const commandHistory = [];
	let historyIndex = -1;

	// Information Overload
	const accessed = [];
	let fritz = 0;
	let overclock = 1;
	let overload = false;
	// Password
	let password = "";
	const dice = [false, false, false, false, false, false];

	// EVENT LISTENERS
	document.addEventListener("keyup", enterCommand);

	// FUNCTIONS
	function enterCommand(e) {
		const key = e.keyCode || e.which || 0;
		// JANKY ANDROID IS BAD, WE USE ALT METHODS
		let currentKey = e.key;
		if (!currentKey) {
			currentKey = String.fromCharCode(key);
		}
		androidKey = currentKey;

		if (key === 13 || androidKey === "Enter") {
			// retrieve command, reset box
			let command = command_box.value;
			command_box.value = "";
			// strip the command
			command = command.toUpperCase();
			command = command.replace(/\s/g, "");
			command = command.replace(/>/g, "");
			// add to history, reset the cursor
			if (command != "") {
				commandHistory.push(command);
			}
			historyIndex = commandHistory.length;
			// parse the command
			parseCommand(command);
		}
		// walk back through the history
		if ((key === 38 || androidKey === "ArrowUp") && historyIndex > 0) {
			historyIndex--;
			command_box.value = commandHistory[historyIndex];
		}
		// walk forward through the history
		if ((key === 40 || androidKey === "ArrowDown") && historyIndex < commandHistory.length) {
			historyIndex++;
			command_box.value = commandHistory[historyIndex] || "";
		}
	}
	function parseCommand(command) {
		// if OVERLOAD, escape Parse.
		if (overload) {
			overLoaded(command);
			return;
		}
		// define the return message
		let message = "";
		// if we catch a number, serve up that post
		if (!isNaN(command) && command != "") {
			try {
				active_post = command - 1;
				message = blogPost(active_post);
			} catch {
				// if the weblog post does not exist
				message = "ERROR : That weblog post DOES NOT exist";
			}
		} else {
			// any other command, parse manually
			switch (command) {
				default:
					message =
						"ERROR : This command was not recognized. Use command >>HELP for a list of active COMMANDS.";
					break;
				case "HELP":
					message = "ACCCESSING : help.log<br>";
					message += "----------------------------------<br>";
					message += "Use command >>WEBLOG for your INTRODUCTION.";
					message +=
						"<br>Use command >>INFO to learn things you DONT need to know.";
					message += "<br>Use command >>MODES for MODES";
					message += "<br>Use command >>EXIT when you've had your FILL";
					break;
				case "MODES":
					message = "ACCCESSING : modes.log<br>";
					message += "----------------------------------<br>";
					message += ">>DAYMODE<br>";
					message += ">>NIGHTMODE<br>";
					message += ">>LOGO<br>";
					message += ">>NOLOGO<br>";
					message += ">>BEES<br>";

					message += "<br>WARNING : Do NOT use >>BEES";
					break;
				// INFO
				case "INFO":
					informationOverload("info");
					message =
						"This webzone was made with CONFUSION and HASTE by ███████ ███████.";
					message += "<br>>>EMAIL - Send an EMAIL";
					break;
				case "EMAIL":
					informationOverload("email");
					message = "Redirecting Terminal to : EMAIL";
					var subject = "Hello RX POSTMAN";
					location.href =
						"mailto:postman@thequarantinepost.online?subject=" + subject;
					break;
				// WEBLOG
				case "WEBLOG":
					informationOverload("weblog");
					var x = blogObj.length;
					message =
						"Welcome to the QUARANTINE POST! Chronicling one POSTMAN'S dream-fueled nightmare-ride through RX PRESCRIPTION DELIVERY in RURAL SOUTHWESTERN ONTARIO. I've got " +
						x +
						" POSTS for ya so far, and I'm updating daily.";
					message +=
						"<br><br>Use command >>START to get STARTED at the START, or command >>(NUMBER) to skip to your favorite entry. For example, >>2. That's a GOOD one!";
					message +=
						"<br><br>Use command >>RECENT to check OUT the latest entry.";
					message +=
						"<br><br>Command >>NEXT will move you forward, and >>PREVIOUS takes you back.";
					message += "<br><br>Enjoy the trip, and don't forget, Hail SATAN :)";
					break;
				case "START":
					active_post = 0;
					message = blogPost(active_post);
					break;
				case "RECENT":
					active_post = blogObj.length - 1;
					message = blogPost(active_post);
					break;
				case "NEXT":
					try {
						active_post++;
						message = blogPost(active_post);
					} catch {
						active_post--;
						message = "You're already on the MOST RECENT post.";
					}
					break;
				case "PREVIOUS":
					try {
						active_post--;
						message = blogPost(active_post);
					} catch {
						active_post++;
						message = "You're already on the EARLIEST post.";
					}
					break;
				case "EXIT":
					// window.close() fails silently when the browser refuses,
					// so queue the message either way — if it worked, nobody sees it
					message =
						"Error: Your browser does not allow scripts to close windows.";
					window.close();
					break;
				// EASTER EGGS
				case "DAYMODE":
					informationOverload("daymode");
					if (mode == "night") {
						document.querySelector("body").style.backgroundColor = "white";
						message = "Why would you do this to yourself";
						mode = "day";
					} else {
						message = "You are already in daymode";
					}
					break;
				case "NIGHTMODE":
					informationOverload("nightmode");
					if (mode == "day") {
						document.querySelector("body").style.backgroundColor = "black";
						message = "Much better";
						mode = "night";
					} else {
						message = "You are already in nightmode";
					}
					break;
				case "THEZONE":
					informationOverload("thezone");
					message = "Redirecting Terminal to : THE ZONE";
					window.open("https://encyclopedia.zone/");
					break;
				case "BEES":
					informationOverload("bees");
					fetch("js/bees.json")
						.then((response) => {
							return response.json();
						})
						.then((data) => {
							printString("<p class='txt'>" + data.bees + "</p>");
						})
						.catch(() => {
							printString("<p class='txt'>ERROR : The BEES could not be reached.</p>");
						});
					break;
				case "LOGO":
					informationOverload("logo");
					logo_div.classList.remove("flicker");
					logo_div.classList.add("superlogo");
					message = "Always-on Logo : ENABLED";
					break;
				case "NOLOGO":
					informationOverload("nologo");
					logo_div.classList.add("flicker");
					logo_div.classList.remove("superlogo");
					message = "Always-on Logo : DISABLED";
					break;
				case "DEDICATION":
					informationOverload("dedication");
					message = "This is not for you.";
					break;
				case "!DAB":
					informationOverload("dab");
					message = "!thrash";
					break;
				case "!THRASH":
					informationOverload("thrash");
					message = "!dab";
					break;
				// POETRY
				case "POETRY":
					informationOverload("poetry");
					message = "ACCCESSING : poetry.log<br>";
					message += "----------------------------------<br>";
					message += ">>leaves.txt<br>";
					message += ">>electric.txt<br>";
					message += ">>howl.txt<br>";
					message += ">>newsom.txt";
					break;
				case "LEAVES.TXT":
					informationOverload("leaves");
					message = poemPost(0);
					break;
				case "ELECTRIC.TXT":
					informationOverload("electric");
					message = poemPost(1);
					break;
				case "HOWL.TXT":
					informationOverload("howl");
					message = poemPost(2);
					break;
				case "NEWSOM.TXT":
					informationOverload("newsom");
					message = poemPost(3);
					break;
				// POETRY EGGS
				case "HOUSE":
					informationOverload("house");
					message = "49\u00B009'03.0\"N 102\u00B059'57.0\"W";
					break;
				case "CORRUPT":
					informationOverload("corrupt");
					message = "CO█RUTE█";
					document_body.classList.add("corrupt");
					break;
				case "CIGARETTES": {
					informationOverload("cigarettes");
					message = "Celebration Mode : ENABLED";
					logo_div.classList.add("superlogo");
					logo_img.src = "images/celebratory.svg";
					break;
				}
				case "HELPLESS":
					informationOverload("helpless");
					message = "No way. We've got you.";
					subject = "Good News";
					var body =
						"Hello ███████ ███████.%0D%0A %0D%0A It's been a long time, but there is help.%0D%0A %0D%0AYours in POSTAGE,%0D%0A %0D%0A";
					location.href =
						"mailto:postman@thequarantinepost.online?subject=" +
						subject +
						"&body=" +
						body;
					break;
				// DICE
				case "DICE":
					informationOverload("dice");
					message = "ACCCESSING : dice.log<br>";
					message += "----------------------------------<br>";
					message += ">>D4<br>";
					message += ">>D6<br>";
					message += ">>D8<br>";
					message += ">>D10<br>";
					message += ">>D12<br>";
					message += ">>D20<br>";
					break;
				case "D4":
					informationOverload("d4");
					var roll = Math.ceil(Math.random() * 4);
					message = "D4 RESULT : " + roll;
					if (!dice[0]) {
						password += roll;
						dice[0] = true;
					}
					break;
				case "D6":
					informationOverload("d6");
					var roll = Math.ceil(Math.random() * 6);
					message = "D6 RESULT : " + roll;
					if (!dice[1]) {
						password += roll;
						dice[1] = true;
					}
					break;
				case "D8":
					informationOverload("d8");
					var roll = Math.ceil(Math.random() * 8);
					message = "D8 RESULT : " + roll;
					if (!dice[2]) {
						password += roll;
						dice[2] = true;
					}
					break;
				case "D10":
					informationOverload("d10");
					var roll = Math.ceil(Math.random() * 10);
					message = "D10 RESULT : " + roll;
					if (!dice[3]) {
						password += roll;
						dice[3] = true;
					}
					break;
				case "D12":
					informationOverload("d12");
					var roll = Math.ceil(Math.random() * 12);
					message = "D12 RESULT : " + roll;
					if (!dice[4]) {
						password += roll;
						dice[4] = true;
					}
					break;
				case "D20":
					informationOverload("d20");
					var roll = Math.ceil(Math.random() * 20);
					message = "D20 RESULT : " + roll;
					if (!dice[5]) {
						password += roll;
						dice[5] = true;
					}
					break;
			}
		}
		// full string to print
		const print =
			"<p class='txt'>>> " +
			command +
			"</p><p class='txt'>" +
			message +
			"</p>";
		// print the string
		printString(print);
	}
	function printString(x) {
		// add our content to the output box
		output_box.innerHTML += x;
		// scroll the page
		window.scrollTo(0, output_box.scrollHeight);
	}
	// make a post to the blog, from a Key
	function blogPost(x) {
		// if the weblog hasn't loaded, say so instead of crashing
		if (!blogObj.length) {
			return "ERROR : The WEBLOG could not be LOADED. Check your CONNECTION and refresh.";
		}
		// set the image
		logo_img.src = "images/" + blogObj[x].image;
		// make the post
		let post = blogObj[x].date + "<br>";
		post += "AUTHOR : " + blogObj[x].author + "<br><br>";
		post += blogObj[x].content;
		return post;
	}

	// serve a poem, from a Key
	function poemPost(x) {
		// if the poems haven't loaded, say so instead of crashing
		if (!poems.length) {
			return "ERROR : The POETRY could not be LOADED. Check your CONNECTION and refresh.";
		}
		return poems[x].poem;
	}

	// INFORMATION OVERLOAD
	function informationOverload(x) {
		const inform = accessed.includes(x);
		if (!inform) {
			accessed.push(x);
			fritz += 1;
		}
		let message = "";
		let print = "";
		switch (fritz) {
			case 5:
				logo_img.src = "images/oldfactory.svg";
				message = "██/██/████<br>";
				message += "AUTHOR : POSTMAN<br><br>";
				message +=
					"An RX POSTMAN opens a lot of DOORS, and smells a lot of SMELLS.<br><br>In a single day, I'd say we smell enough SMELLS to drive any one man crazy. Our destinations are not limited by CLASS, we visit the NEEDING and SATED alike. In this LIMITLESSNESS, OLDFACTORY VARIETY manifests. Its a good thing we have EACH OTHER.   Let me give you an example.<br><br>Just the other day, I made a delivery to who appeared to be a SINGLE MOTHER. Past her porch cluttered with CHILDRENS PLAY-THINGS, we make our way to the doorbell. She answers, and we\u2019re hit with a BLISTERING HEAT WAVE of CANNED SPAGHETTI PRODUCT. We spoke with the women for less then 10 seconds, but from the PASTARONNI BLAST we learn LEAGUES. Not my call.<br><br>After that, I make a delivery to a RICH NEIGHBOURHOOD. The man holds back a WOOFING DOG at the door, and we smell SOOTHING NATURE. RICH homes always seem to smell like OUTDOOR BEAUTY. or SERENE BEACH. or just CLEAN. The POORS smell like CHEMICAL.<br><br>None of this is to speak about the ODOURS of the OLD. I\u2019ve come to discover, through no EFFORT of my own, that most OLD PEOPLE SMELLS are quite different, but at the same time, the SAME. Rhyming with each other, like INFERNAL >>POETRY, impossible to decode. I think the years have COMPLICATED and DEEPENED their ODOUR PROFILE to a level of ROBUSTNESS that a young man or women would not or could not DARE understand.<br><br>The way I see it, SMELLS are CODES. They act as raw INFORMATION.<br>&emsp;&emsp;- INVISIBLE<br>&emsp;&emsp;- POTENT<br>&emsp;&emsp;- HIGHLY DENSE<br>&emsp;&emsp;- VIRAL<br>&emsp;&emsp;- NON CONSENSUAL<br><br>When you enter the range of a SCENT, you lose control. It is not your DECISION. That information is in your BRAIN, and for the rest of your time, it will NEVER leave.<br><br>They're part of me now.<br><br><br>I think I\u2019ve smelled the Coronavirus.";
				print = "<br><p class='txt'>" + message + "</p>";
				printString(print);
				break;
			case 10:
				message = "WARNING : This is getting to be a bit MUCH";
				print = "<br><p class='txt'>" + message + "</p>";
				printString(print);
				break;
			case 15:
				message = "ALERT : Slow your roll. We're dealing with a lot already.";
				print = "<br><p class='txt'>" + message + "</p>";
				printString(print);
				break;
			case 20:
				overload = true;
				break;
		}
	}
	function overLoaded(x) {
		let message = "";
		let print = "";
		switch (overclock) {
			case 1:
				message =
					"What is the point of this DENSE format? What is the >>DEDICATION? What is in our head, COMPELLING us to sink HOURS into..";
				print = "<br><p class='txt'>" + message + "</p>";
				printString(print);
				overclock++;
				break;
			case 2:
				message =
					"Everybody is staying INSIDE. Assembling jigsaw images INSIDE. Baking Sourdough Loafs INSIDE. Decompressing INSIDE.";
				print = "<br><p class='txt'>" + message + "</p>";
				printString(print);
				overclock++;
				break;
			case 3:
				message =
					"We are OUTSIDE. Taking on INFORMATION OUTSIDE. Being exposed OUTSIDE. MAKING the ROUNDS OUTSIDE.";
				print = "<br><p class='txt'>" + message + "</p>";
				printString(print);
				overclock++;
				break;
			case 4:
				document.querySelector(".crt").classList.remove("crt");
				message = "Why am i doing this?";
				print = "<br><p class='txt'>" + message + "</p>";
				printString(print);
				overclock++;
				break;
			case 5:
				command_box.classList.add("boring");
				logo_div.classList.remove("superlogo");
				logo_div.classList.remove("flicker");
				logo_div.classList.add("flashing");
				document.querySelector(".entry").classList.add("boring");
				document.querySelector(".entry").style.backgroundColor = "White";
				document.querySelector(".entry").style.borderColor = "White";
				message = "im tired of being an rx postman.";
				print = "<br><p class='txt'>" + message + "</p>";
				printString(print);
				overclock++;
				break;
			case 6:
				output_box.classList.add("boring");
				logo_div.classList.remove("flashing");
				message = "im overclocking.";
				print = "<br><p class='txt'>" + message + "</p>";
				printString(print);
				overclock++;
				break;
			case 7:
				document_body.style.backgroundColor = "White";
				message = ". . .";
				print = "<br><p class='txt'>" + message + "</p>";
				printString(print);
				overclock++;
				break;
			case 8:
				message = "Take a walk?";
				message += "<br><br>PASSWORD : █ █ █ █ █ █";
				print = "<br><p class='txt'>" + message + "</p>";
				printString(print);
				overclock++;
				break;
			case 9:
				var allDice = true;
				for (let i = 0; i < dice.length; i++) {
					if (!dice[i]) {
						allDice = false;
					}
				}
				if (x == password && allDice) {
					logo_div.classList.add("superlogo");
					logo_img.src = "images/oldfactory.svg";
					message = "let's open some doors.";
					message += "<br><br>THE QUARANTINE POST ACT 2 - OLDFACTORY";
					message += "<br>COMING SOON";
					print = "<br><p class='txt'>" + message + "</p>";
					printString(print);
				} else {
					message = "<br>END of ACT 1";
					message += "<br><br>WRONG - TRY AGAIN";
					print = "<br><p class='txt'>" + message + "</p>";
					printString(print);
				}
				break;
		}
	}

	// Apply the Flicker animation after 8s
	setTimeout(function () {
		logo_img.src = "images/logo.png";
		logo_div.classList.add("flicker");
	}, 8000);

	// FETCHES
	function fetchBlog() {
		fetch("js/blog.json")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				blogObj = data;
			})
			.catch(() => {
				printString(
					"<p class='txt'>ERROR : The WEBLOG could not be LOADED.</p>",
				);
			});
	}
	function fetchPoems() {
		fetch("js/poems.json")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				poems = data;
			})
			.catch(() => {
				printString(
					"<p class='txt'>ERROR : The POETRY could not be LOADED.</p>",
				);
			});
	}

	// FUNCTION CALLS
	printString(first_post);
	fetchBlog();
	fetchPoems();
	command_box.focus();
	command_box.select();
})();
