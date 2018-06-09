function doscore(list,before,after)
{
	var score0 = 0;
	var score1 = 0;
	var n0=0;
	var n1=0;
	var match = {0:0,1:10,2:100,3:1000,4:10000,5:100000}
	for(var i=0;i<5;i++)
	{
		if(list[i]<0)
			continue
		if(list[i])
		{
			if(n0)
				return[0,0]
			else
				n1+=1
		}
		else
		{
			if(n1)
				return [0,0]
			else
				n0+=1
		}
	}
	/*
	if(n0>2||n1>2)
	{
		console.log(list)
		console.log("n",n0,n1)
	}*/
	return [match[n0],match[n1]]
}




//局势评估函数
function evaluate(chessboard)
{
	var score0 = 0;
	var score1 = 0;
	for (var i = 0; i < boardsize; i++)
	{
		for (var j = 0; j < boardsize; j++)
		{
			var tscore;
			//横
			if (j<boardsize-4)
			{
				tscore = doscore([chessboard[i][j],chessboard[i][j+1],chessboard[i][j+2],chessboard[i][j+3],chessboard[i][j+4]],(j!=0),(j!=boardsize-5))
				score0 += tscore[0]
				score1 += tscore[1]
			}
			//竖
			if (i<boardsize-4)
			{
				tscore = doscore([chessboard[i][j],chessboard[i+1][j],chessboard[i+2][j],chessboard[i+3][j],chessboard[i+4][j]],(i!=0),(i!=boardsize-5))
				score0 += tscore[0]
				score1 += tscore[1]
			}
			//斜\
			if (i<boardsize-4&&j<boardsize-4)
			{
				tscore = doscore([chessboard[i][j],chessboard[i+1][j+1],chessboard[i+2][j+2],chessboard[i+3][j+3],chessboard[i+4][j+4]],(i!=0&&j!=0),(i!=boardsize-5&&j!=boardsize-5))
				score0 += tscore[0]
				score1 += tscore[1]
			}
			// 斜/
			if (i<boardsize-4&&j>=4)
			{
				tscore = doscore([chessboard[i][j],chessboard[i+1][j-1],chessboard[i+2][j-2],chessboard[i+3][j-3],chessboard[i+4][j-4]],(i!=0&&j!=boardsize-1),(i!=boardsize-5&&j!=4))
				score0 += tscore[0]
				score1 += tscore[1]
			}
		}
	}
	return cpucolor?score1-score0:score0-score1;
}

