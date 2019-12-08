var Button = document.querySelector("#Button");

var cell = document.querySelectorAll("td");

var reset = document.querySelector("#reset");

var turn = false; //Variable that determines if is X's or O's turn.

var isGameOver = false; //Becomes true when game is over.




function redThisShit(a,b,c)
{
	if(cell[a].type === "circle")
	{
		cell[a].classList.add("circleRed")
		cell[b].classList.add("circleRed")
		cell[c].classList.add("circleRed")
	}
	if(cell[a].type === "cross")
	{
		cell[a].classList.add("crossRed")
		cell[b].classList.add("crossRed")
		cell[c].classList.add("crossRed")
	}

}

function checkGameOver(){

	var countFullCells =0;


//~~~~~~~~~~~~~~~~~~~~Checking all winning conditions~~~~~~~~~~~//
	for(var i = 2 ; i<=8; i+=3)
	{
		if(cell[i-2].type === cell[i-1].type && cell[i-1].type === cell[i].type)
		{
			redThisShit(i-2,i-1,i);
			return true;
		}

	}
	for(var i = 0 ; i<=2; i++)
	{
		if(cell[i].type === cell[i+3].type && cell[i+3].type === cell[i+6].type)
		{
			redThisShit(i,i+3,i+6);
			return true;
		}

	}

	if(cell[0].type === cell[4].type && cell[4].type === cell[8].type)
	{
		redThisShit(0,4,8);
		return true;
	}

	if(cell[2].type === cell[4].type && cell[4].type === cell[6].type)
	{
		redThisShit(2,4,6);
		return true;
	}


//~~~~~~~~~checking if all cells ara full~~~~~~~~~~~~~///
	for(i = 0 ; i<=8; i++)
	{
		if(cell[i].type === "circle" || cell[i].type === "cross")
		{
			countFullCells++
		}

	}

	if(countFullCells === 9)
	{
		return true;
	}
//~~~~~if everything fails return false and continue game~~~~~//

	return false;

}

//~~~~~~~~~~~~~~Initialize cell type and num~~~~~~~~~~~~~~~~~~~~~//

for(var i = 0; i<cell.length; i++)
{

	cell[i].num = i; //num starts from 0 to 8, from left to right.
	cell[i].type = "nothing"+i;
	console.log(cell[i].type);

}




Button.addEventListener("mouseover",function(){
	
		this.classList.add("hoverOver");
});


Button.addEventListener("mouseout",function(){
	
		this.classList.remove("hoverOver");

});



for(var i = 0; i<cell.length; i++)  
{

		cell[i].addEventListener("click",function(){
		
		if(!isGameOver) //check if game is over.
		{
			if(turn)
			{
				if(this.type === "nothing"+this.num)//Prevents double clicking bugs
				{
					this.classList.add("circle"); //css class that adds circle img.
					this.type = "circle";
				}
				
			}
			else if(!turn)
			{
				if(this.type === "nothing"+this.num)//Prevents double clicking bugs
				{
					this.classList.add("cross"); //css class that adds cross img.
					this.type = "cross";
				}
				
			}

			turn = !turn;

			isGameOver=checkGameOver();  //Returns true if game is over
		}



	});
}


//~~~~~~~~~~~~~~~~Random input fuction~~~~~~~~~~~~~~~~~~~//

Button.addEventListener("click",function(){

		if(!isGameOver)//Check if game is over
		{
			var randomCell = Math.floor(Math.random() * 9);  //pick random cell.

			while(cell[randomCell].type === "cross" ||cell[randomCell].type === "circle") //if the cell you picked is already assigned pick another. 
			{

				var randomCell = Math.floor(Math.random() * 9); 
			}

			if(turn)
			{

				cell[randomCell].classList.add("circle");
				cell[randomCell].type = "circle";

			}
			else if(!turn)
			{

				cell[randomCell].classList.add("cross");
				cell[randomCell].type = "cross";
			}

			isGameOver=checkGameOver();
			turn = !turn;

		}
		else console.log("isGameOver");

});


//~~~~~~~~~~Reset Button~~~~~~~~~~~~~~~~~~~~~~~~~~///

reset.addEventListener("click",function(){


	for(i=0 ; i<=8 ; i++)
	{

		cell[i].type = "nothing"+i;
		cell[i].classList.remove("circle");
		cell[i].classList.remove("cross");
		cell[i].classList.remove("circleRed");
		cell[i].classList.remove("crossRed");

	}	

	isGameOver = false;



})




