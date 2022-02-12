/*Xiaoying Li*/
/*CS290 HW Assignment 4: DOM and Events*/


/*Function to build a 4x4 table and append it to the body of the page.*/
function buildTable(){
	var body=document.getElementsByTagName("body")[0];
	var table=document.createElement("table");
	var tableBody=document.createElement("tbody");

	for (var i=0; i<4; i++){
		var tableRow=document.createElement("tr");
		for (var j=0; j<4; j++){
			if (i==0){ //The top row is a header row with header cells.
				var headCell=document.createElement("th");
				var headCellText=document.createTextNode("Header "+(j+1)) //The 4 header cells, from left to right say "Header 1" to "Header 4".
				headCell.appendChild(headCellText);
				tableRow.appendChild(headCell);
			}
			else{
				var bodyCell=document.createElement("td");
				var bodyCellText=document.createTextNode((i)+","+(j+1)); //The non header cells contain their position.
				bodyCell.appendChild(bodyCellText);
				tableRow.appendChild(bodyCell);
			}
		}
		tableBody.appendChild(tableRow);
	}

	table.appendChild(tableBody)
	body.appendChild(table);
	table.setAttribute("border", "1px");
}


/*Function to build 4 directional buttons (up, down, left right) and a button labeled "Mark Cell", and append them to the body of the page.*/
function buildButtons(){
	var upButton=document.createElement("button");
	upButton.id="up";
	upButton.appendChild(document.createTextNode("up"));
	document.body.appendChild(upButton);

	var downButton=document.createElement("button");
	downButton.id="down";
	downButton.appendChild(document.createTextNode("down"));
	document.body.appendChild(downButton);

	var leftButton=document.createElement("button");
	leftButton.id="left";
	leftButton.appendChild(document.createTextNode("left"));
	document.body.appendChild(leftButton);

	var rightButton=document.createElement("button");
	rightButton.id="right";
	rightButton.appendChild(document.createTextNode("right"));
	document.body.appendChild(rightButton);

	var markButton=document.createElement("button");
	markButton.id="mark";
	markButton.appendChild(document.createTextNode("Mark Cell"));
	document.body.appendChild(markButton);
}


buildTable();
buildButtons();
//When the page is loaded, the upper-left non-header cell of the table is 'selected'.
//This is denoted by it having a thicker border than the other cells.
var currentCell=document.getElementsByTagName("td")[0];
currentCell.id="current";
currentCell.style.borderWidth="3px";


/*Function to implement push the 'up' botton.*/
function upPressed(){
	currentCell=document.getElementById("current");

	//If already on the top row and hit 'up' nothing happens.
	if (currentCell.parentNode.rowIndex<=1){
		return;
	}

	//Else push the 'up' buttons, the up cell of the current cell is selected instead.
	var column=currentCell.cellIndex;
	currentCell.style.borderWidth="1px";
	currentCell.removeAttribute("id");
	currentCell=currentCell.parentNode;
	currentCell=currentCell.previousElementSibling;
	currentCell=currentCell.firstElementChild;
	for (var i=0; i<column; i++){
		currentCell=currentCell.nextElementSibling;
	}
	currentCell.style.borderWidth="3px";
	currentCell.id="current";
}


/*Function to implement push the 'down' botton.*/
function downPressed(){
	currentCell=document.getElementById("current");

	//If already all the way at the bottom and hit 'down' nothing happens.
	if (currentCell.parentNode.rowIndex>=3){
		return;
	}

	//Else push the 'down' buttons, the down cell of the current cell is selected instead.
	var column=currentCell.cellIndex;
	currentCell.style.borderWidth="1px";
	currentCell.removeAttribute("id");
	currentCell=currentCell.parentNode;
	currentCell=currentCell.nextElementSibling;
	currentCell=currentCell.firstElementChild;
	for (var i=0; i<column; i++){
		currentCell=currentCell.nextElementSibling;
	}
	currentCell.style.borderWidth="3px";
	currentCell.id="current";
}


/*Function to implement push the 'left' botton.*/
function leftPressed(){
	currentCell=document.getElementById("current");

	//If already all the way left and hit 'left' nothing happens.
	if(currentCell.cellIndex==0){
		return;
	}

	//Else push the 'left' buttons, the left cell of the current cell is selected instead.
	currentCell.style.borderWidth="1px";
	currentCell.removeAttribute("id");
	currentCell=currentCell.previousElementSibling;
	currentCell.style.borderWidth="3px";
	currentCell.id="current";
}


/*Function to implement push the 'right' botton.*/
function rightPressed(){
	currentCell=document.getElementById("current");

	//If already all the way right and hit 'right' nothing happens.
	if(currentCell.cellIndex==3){
		return;
	}

	//Else push the 'right' buttons, the roght cell of the current cell is selected instead.
	currentCell.style.borderWidth="1px";
	currentCell.removeAttribute("id");
	currentCell=currentCell.nextElementSibling;
	currentCell.style.borderWidth="3px";
	currentCell.id="current";
}


/*Function to implement push the 'Mark Cell' botton.*/
function markPressed(){
	currentCell=document.getElementById("current");
	//Hitting the "Mark Cell" button permanently changes the background of the selected cell to yellow.
	//This persists even after other cells are selected or marked.
	currentCell.style.backgroundColor="yellow";
}


//Implement event listeners.
document.getElementById("up").addEventListener("click", upPressed);
document.getElementById("down").addEventListener("click", downPressed);
document.getElementById("left").addEventListener("click", leftPressed);
document.getElementById("right").addEventListener("click", rightPressed);
document.getElementById("mark").addEventListener("click", markPressed);