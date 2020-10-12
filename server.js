express = require('express');				//Import express
obj = express();							//Create object of express

obj.listen(3000,function(){					//Listen to client request at port 3000
console.log("Server is running..");
});

col=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];		//Create a game board of 7 																													columns and 6 rows 
player1=[]									//Keep track of player1 moves
player2=[]									//Keep track of player2 moves

var move=0;									//Variable to decide the player sending request

flag1=0;									//Flags to indicate if either of player wins
flag2=0;

obj.get('/Start',function(req,res){			//Reset board when player hits localhost:3000/Start URL
		col[0]=[0,0,0,0,0,0];
		col[1]=[0,0,0,0,0,0];
		col[2]=[0,0,0,0,0,0];
		col[3]=[0,0,0,0,0,0];
		col[4]=[0,0,0,0,0,0];
		col[5]=[0,0,0,0,0,0];
		col[6]=[0,0,0,0,0,0];
res.send("Ready!!!");
});

obj.get('/',function(req,res){				//Add coin of given player on board if player hits localhost:3000/ URL with column name as 												parameter
column=req.query.column;
column=column-1;
i=5;								
while(i!=-1)								//Logic to check if column has coins in it and add coins at next available position		
{
	if(col[column][i]==0)					
	{
		break;
	}	
	i=i-1;
}
if(i<0)
{
	res.send("Invalid move");				//If all rows in column are filled return Invalid move
}
else										//Else add player coin to column and change coin to other player's coin 
{
	if(move%2==0)
	{
		col[column][i]=1;
		player1.push(column);
		for(p=0;p<3;p++)					//Check if column has four connect for player1
		{
			if(col[column][p]==1 && col[column][p+1]==1 && col[column][p+2]==1 && col[column][p+3]==1)
			{
				flag1=1;
			}
		}
		for(p=0;p<4;p++)					//Check if row has four connect for player1
		{
			if(col[p][i]==1 && col[p+1][i]==1 && col[p+2][i]==1 && col[p+3][i]==1)
			{
				flag1=1;
			}
		}	
	}
	else
	{
		col[column][i]=2;
		player2.push(column);
		for(p=0;p<3;p++)					//Check if column has four connect for player2
		{
			if(col[column][p]==2 && col[column][p+1]==2 && col[column][p+2]==2 && col[column][p+3]==2)
			{
				flag2=1;
			}
		}
		for(p=0;p<4;p++)					//Check if row has four connect for player2
		{
			if(col[p][i]==2 && col[p+1][i]==2 && col[p+2][i]==2 && col[p+3][i]==2)
			{
				flag2=1;
			}
		}
	}
	move=move+1;
	if(flag1==1)
	{
		res.send("Player 1 wins");
	}
	else if(flag2==1)
	{
		res.send("Player 2 wins");
	}
	else
	{
		res.send("Valid move");
	}
}
});
