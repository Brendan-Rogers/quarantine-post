// SEAF (Self Executing Anonymous Function)
(function(){ console.log("JS Initialized");

// VARS
command_box = document.getElementById('command');
output_box = document.getElementById('output');
blogObj = {};
active_post = '';
mode = "night";
first_post = "<p>>> Welcome to THE QUARANTINE POST. Use command >>HELP for some DIRECTIONS.</p>";

// EVENT LISTENERS
document.addEventListener('keyup', enterCommand);

// FUNCTIONS
function enterCommand(e) {
	console.log(e.keyCode);
	key = e.keyCode || e.which || 0;
	if (e.keyCode === 13) {
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
	if (!isNaN(command)) {
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
				message = "Use command >>WEBLOG for your INTRODUCTION.";
				message += "<br><br>Use command >>INFO to learn things you DONT need to know.";
				message += "<br><br>Use command >>EXIT when you've had your FILL";
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
			// EASTER EGGS
			case "day" :
				if (mode == "night") {
					document.querySelector("body").style.backgroundColor = "white";
					message = "Why would you do this to yourself";
					mode = "day";
				} else {
					message = "You are already in daymode"
				}
				break;
			case "night" :
				if (mode == "day") {
					document.querySelector("body").style.backgroundColor = "black";
					message = "Much better";
					mode = "night";
				} else {
					message = "You are already in nightmode"
				}
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

// FUNCTION CALLS
printString(first_post);
fetchBlog();
command_box.focus();
command_box.select();

}) ();













