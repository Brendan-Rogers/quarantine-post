// SEAF (Self Executing Anonymous Function)
(function(){ console.log("JS Initialized");

// VARS
command_box = document.getElementById('command');
output_box = document.getElementById('output');
logo_div = document.getElementById('logoDIV');
logo_img = document.getElementById("logoIMG");
blogObj = {};
active_post = '';
mode = "night";
first_post = "<p>>> Welcome to THE QUARANTINE POST. Use command >>HELP for some DIRECTIONS.</p>";
androidKey = '';

// EVENT LISTENERS
document.addEventListener('keyup', enterCommand);



// FUNCTIONS
function enterCommand(e) {
	key = e.keyCode || e.which || 0;
	// JANKY ANDROID IS BAD, WE USE ALT METHODS
	currentKey = e.key;
	if (!currentKey) {
		currentKey = String.fromCharCode(key);
	}
	androidKey = currentKey;
	if (key === 13 || androidKey === "Enter") {
		// retrieve command, reset box
		command = command_box.value;
		command_box.value = '';
		// strip the command
		command = command.toLowerCase();
		command = command.replace(/\s/g, '');
		command = command.replace(/>/g, '');
		// parse the command
		parseCommand(command);
	}
}
function parseCommand(command) {
	// define the return message
	message = '';
	// if we catch a number, serve up that post
	if (!isNaN(command) && command != '') {
		try {
			active_post = command - 1;
			message = blogPost(active_post);
		}
		// if the weblog post does not exist
		catch {
			message = "That weblog post DOES NOT exist";
		}
	} else {
	// any other command, parse manually
		switch (command) {
			default :
				message = "Error: This command was not recognized. Use command >>help for a list of active commands.";
				break;
			case "help" :
				message = "ACCCESSING : help.log<br>";
				message += "----------------------------------<br>";
				message += "Use command >>WEBLOG for your INTRODUCTION.";
				message += "<br>Use command >>INFO to learn things you DONT need to know.";
				message += "<br>Use command >>SPOILERS for SPOILERS";
				message += "<br>Use command >>EXIT when you've had your FILL";
				break;
			case "spoilers" :
				message = "ACCCESSING : eastereggs.log<br>";
				message += "----------------------------------<br>";
				message += ">>DAYMODE<br>";
				message += ">>NIGHTMODE<br>";
				message += ">>GITHUB<br>";
				message += ">>THEZONE<br>";
				message += ">>NOTWHEAT<br>";
				message += ">>LOGO<br>";
				message += ">>NOLOGO<br>";
				message += ">>BEES<br>";
				message += ">>DICE<br>";

				message += "<br>WARNING : Do NOT use >>BEES";
				
				break;
			// INFO
			case "info" :
				message = "This webzone was made with CONFUSION and HASTE by Brendan Rogers.";
				message += "<br><br>My PORTFOLIO can be found at >>PORTFOLIO";
				message += "<br><br>My COMPANY can be found at >>COMPANY";
				message += "<br><br>Please TALK to me at <a href=\'mailto: brendan@spacedog.studio\'>brendan@spacedog.studio</a>. Please.";
				break;
			case "portfolio" : 
				message = "Redirecting Terminal to : PORTFOLIO";
				window.open("https://brendanrogers.online");
				break;
			case "company" : 
				message = "Redirecting Terminal to : SPACEDOG";
				window.open("https://spacedog.studio");
				break;
			// WEBLOG
			case "weblog" :
				x = blogObj.length;
				message = "Welcome to the QUARANTINE POST! Chronicling one POSTMAN'S dream-fueled nightmare-ride through RX PRESCRIPTION DELIVERY in RURAL SOUTHWESTERN ONTARIO. I've got " + x + " POSTS for ya so far, and I'm updating daily.";
				message += "<br><br>Use command >>START to get STARTED at the START, or command >>(NUMBER) to skip to your favorite entry. For example, >>2. That's a GOOD one!";
				message += "<br><br>Use command >>RECENT to check OUT the latest entry.";
				message += "<br><br>Command >>NEXT will move you forward, and >>PREVIOUS takes you back.";
				message += "<br><br>Enjoy the trip, and don't forget, Hail SATAN :)";
				break;
			case "start" :
				active_post = 0;
				message = blogPost(active_post);
				break;
			case "recent" :
				active_post = blogObj.length - 1;
				message = blogPost(active_post);
				break;
			case "next" :
				try {
					active_post++;
					message = blogPost(active_post);
				}
				catch {
					active_post--;
					message = "You're already on the MOST RECENT post.";
				}
				break;
			case "previous" :
				try {
					active_post--;
					message = blogPost(active_post);
				}
				catch {
					active_post++;
					message = "You're already on the EARLIEST post.";
				}
				break;
			case "exit" :
				try	{
					window.close();
				}
				catch {
					message = "Error: Your browser does not allow scripts to close windows.";
				}
				break;
			// EASTER EGGS
			case "daymode" :
				if (mode == "night") {
					document.querySelector("body").style.backgroundColor = "white";
					message = "Why would you do this to yourself";
					mode = "day";
				} else {
					message = "You are already in daymode"
				}
				break;
			case "nightmode" :
				if (mode == "day") {
					document.querySelector("body").style.backgroundColor = "black";
					message = "Much better";
					mode = "night";
				} else {
					message = "You are already in nightmode"
				}
				break;
			case "github" :
				message = "Redirecting Terminal to : GITHUB";
				window.open("https://github.com/Brendan-Rogers/quarantine-post");
				break;
			case "thezone" :
				message = "Redirecting Terminal to : THE ZONE";
				window.open("https://encyclopedia.zone/");
				break;
			case "notwheat" :
				message = "Redirecting Terminal to : NOTWHEAT";
				window.open("http://notwheat.ca");
				break;
			case "bees" :
				fetch('https://brendanrogers.online/quarantinepost/js/bees.json')
				.then((response) => {
				    return response.json();
				})
				.then((data) => {
				    printString(data.bees);
				});

				break;
			case "logo" :
				logo_div.classList.add("superlogo");
				message = "Always-on Logo : ENABLED";
				break;
			case "nologo" :
				logo_div.classList.remove("superlogo");
				message = "Always-on Logo : DISABLED";
				break;
			// DICE
			case 'dice' :
				message = "ACCCESSING : dice.log<br>";
				message += "----------------------------------<br>";
				message += ">>D4<br>";
				message += ">>D6<br>";
				message += ">>D10<br>";
				message += ">>D12<br>";
				message += ">>D20<br>";
				break;
			case 'd4' :
				message = "D4 RESULT : " + Math.ceil(Math.random() * 4);
				break;
			case 'd6' :
				message = "D6 RESULT : " + Math.ceil(Math.random() * 6);
				break;
			case 'd10' :
				message = "D10 RESULT : " + Math.ceil(Math.random() * 10);
				break;
			case 'd12' :
				message = "D12 RESULT : " + Math.ceil(Math.random() * 12);
				break;
			case 'd20' :
				message = "D20 RESULT : " + Math.ceil(Math.random() * 20);
				break;
		}
	}
	// full string to print
	print = "<p class=\'txt\''>>> " + command + "</p><p class=\'txt\''>" + message + "</p>";
	// print the string
	printString(print);
}
function printString(x) {
	// add our content to the output box
	output_box.innerHTML += x;
	// scroll the page
	window.scrollTo(0,output_box.scrollHeight);
}
// make a post to the blog, from a Key
function blogPost(x) {
	// set the image
	logo_img.src = "images/" + blogObj[x].image;
	// make the post
	post = blogObj[x].date + '<br>';
	post += 'AUTHOR : ' + blogObj[x].author + '<br><br>';
	post += blogObj[x].content;
	return post;
}
function fetchBlog() {
	fetch('https://brendanrogers.online/quarantinepost/js/blog.json')
	  .then((response) => {
	    return response.json();
	  })
	  .then((data) => {
	    blogObj = data;
	  });
}
// Apply the Flicker animation after 10s
setTimeout(function(){ 
	logo_div.classList.add("flicker");
	logo_img.src = "images/logo.png";
}, 10000);

// FUNCTION CALLS
printString(first_post);
fetchBlog();
command_box.focus();
command_box.select();

}) ();













