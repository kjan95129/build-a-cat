const slider1 = document.getElementById("myRange");
const output1 = document.getElementById("demo");

const slider2 = document.getElementById("myRange2");
const output2 = document.getElementById("demo2");

const slider3 = document.getElementById("myRange3");
const output3 = document.getElementById("demo3");

let eyesApart = slider1.value;
let earsApart = slider2.value;
let nose_mouthApart = slider3.value;
let customizeOrResult = "customize";
let requestURL = '';
let color = 'black';



output1.innerHTML = slider1.value;

// sets margin as current slider value, regardless of cache
let leftMove = -((eyesApart - 50));
let rightMove = ((eyesApart - 50));

document.getElementById("leftEyeball").style.marginLeft = leftMove;
document.getElementById("rightEyeball").style.marginLeft = rightMove;

slider1.oninput = function () {
	output1.innerHTML = this.value;
	eyesApart = this.value;
	console.log("eyes: " + eyesApart);

	let leftMove = -((eyesApart - 50));
	let rightMove = ((eyesApart - 50));

	/*
	let move = 0;
	if (eyesApart >= 50){
			move =-((eyesApart-10)/2);
		}
		else {
		move =-((eyesApart-60)/3);
		}
		*/

	document.getElementById("leftEyeball").style.marginLeft = leftMove;
	document.getElementById("rightEyeball").style.marginLeft = rightMove;

	//alert(document.getElementById("leftEyeball").style.margin);
	//	document.getElementById('leftEye').style.padding-right=10;
}


let height = document.getElementById("leftEGrey").height;
let bottom = document.getElementById("leftEGrey").bottom;

output2.innerHTML = slider2.value;
slider2.oninput = function () {
	output2.innerHTML = this.value;
	earsApart = this.value;

	//let newBottom = bottom + 
	//document.getElementById("leftEGrey").style.bottom 


	
	console.log("height is " + height);
	let leftEarGMove = earsApart - 50;

	console.log("leftEarGMove is " + leftEarGMove);
	let newEar = height + leftEarGMove;

	document.getElementById("leftEGrey").style.height = newEar;
	document.getElementById("rightEGrey").style.height = newEar;
	console.log("newEar is " + newEar);
	console.log("bottom " + bottom);

	let newBottom = bottom + leftEarGMove;

	document.getElementById("leftEGrey").style.bottom = newBottom;
	document.getElementById("rightEGrey").style.bottom = newBottom;



	//document.getElementById("leftEGrey") = input;
	//leftEarGMove = ((input - 50) + 100);

	//var ear = cl.transformation


	//document.getElementById("leftEGrey").style.marginLeft = leftEarGMove;
}


output3.innerHTML = slider3.value;

// sets margin as current slider value, regardless of cache
let leftEyeDown = -((nose_mouthApart - 50));
let rightEyeDown = -((nose_mouthApart - 50));
let mouthMove = ((nose_mouthApart - 50));

document.getElementById("rightEyeball").style.marginTop = rightEyeDown;
document.getElementById("leftEyeball").style.marginTop = leftEyeDown;
document.getElementById("mouth").style.marginTop = mouthMove;


slider3.oninput = function () {
	output3.innerHTML = this.value;
	nose_mouthApart = this.value;
	console.log("nose_mouth: " + nose_mouthApart);

	let leftEyeDown = -((nose_mouthApart - 50));
	let rightEyeDown = -((nose_mouthApart - 50) / 15);
	let mouthMove = 2 * ((nose_mouthApart - 50));

	document.getElementById("rightEyeball").style.marginTop = rightEyeDown;
	document.getElementById("leftEyeball").style.marginTop = leftEyeDown;
	document.getElementById("mouth").style.marginTop = mouthMove;
}

// TODO 
// UPDATE THIS COLOR VARIABLE BASED ON INPUT
updateColor = function(c){
	color = c;
	document.getElementById('colorName').innerHTML = color;
	if(color == 'black'){
		document.getElementById('face').src = "images/catHeadBlack.png";
		document.getElementById('leftEGrey').src = "images/catEarBlack.png";
		document.getElementById('rightEGrey').src = "images/catEarBlack2.png";

	}
	else if(color=='brown'){
		console.log('in brown');
		document.getElementById('face').src = "images/catHeadRed.png";
		document.getElementById('leftEGrey').src = "images/catEarRed.png";
		document.getElementById('rightEGrey').src = "images/catEarRed2.png";

	}
	else if(color=='dark grey'){
		document.getElementById('face').src = "images/catHeadGrey.png";
		document.getElementById('leftEGrey').src = "images/catEarGrey.png";
		document.getElementById('rightEGrey').src = "images/catEarGrey2.png";
	}
	else if(color=='light grey'){
		document.getElementById('face').src = "images/catHeadLGrey.png";
		document.getElementById('leftEGrey').src = "images/catEarLGrey.png";
		document.getElementById('rightEGrey').src = "images/catEarLGrey2.png";
	}
	else if(color=='white'){
		document.getElementById('face').src = "images/catHeadWhite.png";
		document.getElementById('leftEGrey').src = "images/catEarWhite.png";
		document.getElementById('rightEGrey').src = "images/catEarWhite2.png";
	}
	else if(color=='orange'){
		document.getElementById('face').src = "images/catHeadOrange.png";
		document.getElementById('leftEGrey').src = "images/catEarOrange.png";
		document.getElementById('rightEGrey').src = "images/catEarOrange2.png";

	}
}


$('#backCustomize').click(() => {
	window.location = "index";
});

$('#doneCustomize').click(() => {

	document.getElementById('customizePage').style.display = "none";
	document.getElementById('resultsPage').style.display = "block";
	requestURL = 'customize/' + eyesApart + '+' + earsApart + '+' + nose_mouthApart + '+' + color;
	console.log('making ajax request to:', requestURL);

	$.ajax({
		// all relative to localhost:3000/
		url: requestURL,
		type: 'GET',
		dataType: 'json', 	// this URL returns data in JSON format
		success: (data) => {
			console.log("received cat data, mwahaha", data);

			// document.getElementById('catResults1').innerHTML = '';
			// document.getElementById('catResults2').innerHTML = '';
			document.getElementById('photos').innerHTML = '';

			if (data.length >= 0) {
				let pictureCount = 0;

				// loop through array of pictures
				for (const e of data) {
					pictureCount = pictureCount + 1;
					dataToDisplay = "<img src='" + e.picture + "'/>";
					document.getElementById('photos').innerHTML += dataToDisplay;
					// if (pictureCount <= 5) {
					// 	document.getElementById('catResults1').innerHTML += dataToDisplay;
					// }
					// else {
					// 	document.getElementById('catResults2').innerHTML += dataToDisplay;
					// }
				}

			} else {
				console.log("Error: could not find cat at URL: ", requestURL);
			}
		}
	});

});

$('#homeResults').click(() => {
	window.location = "index";
});

$('#backResults').click(() => {
	document.getElementById('customizePage').style.display = "block";
	document.getElementById('resultsPage').style.display = "none";
});

$(document).ready(() => {
	document.getElementById('resultsPage').style.display = "none";
	console.log("ready function");
});
