var colorDisplay = document.querySelector("h1 span");
var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message");
var header = document.querySelector("h1");
var btn_reset = document.querySelector("#stripe button");
var modeButtons = document.querySelectorAll(".mode");

var colors;
var pickedColor;
var colorCount = 6;


AddEventListeners();
ResetGame();

function AddEventListeners(){
	for(var i = 0; i < modeButtons.length;i++){
		modeButtons[i].addEventListener("click",function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "Hard"){
				colorCount = 6;
			} else {
				colorCount = 3;
			}
			ResetGame();
		});
	}

	btn_reset.addEventListener("click",ResetGame);

	for(var i = 0; i < squares.length;i++){
		squares[i].addEventListener("click",function(){
			var thisColor = this.style.backgroundColor;
			if (thisColor === pickedColor){
				messageDisplay.textContent = "Correct!!"
				ChangeColors(pickedColor);
				btn_reset.textContent = "Play Again?"
			} else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again"
			}
		});
	}
}

function ChangeColors(color){
	for(var i = 0; i < squares.length;i++){
		squares[i].style.backgroundColor = color;
	}
	header.style.backgroundColor = color;
}

function PickColor(){
	var randIndex = Math.floor(Math.random() * colors.length);
	return colors[randIndex];
}

function GenerateColorArray(len){
	var arr = [];
	for (var i = 0; i < len;i++){
		arr.push(RandomColor());
	}
	return arr
}

function RandomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var col = "rgb(" + r + ", " + g + ", " + b + ")";
	return col;
}

function DisplayColorArray(){
	for(var i = 0; i < squares.length;i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}

function ResetGame(){
	colors = GenerateColorArray(colorCount);
	pickedColor = PickColor();
	DisplayColorArray();
	colorDisplay.textContent = pickedColor;
	header.style.backgroundColor = "#4682b4";
	btn_reset.textContent = "New Colors";
	messageDisplay.textContent = "";
}

