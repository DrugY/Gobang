function w4evaluate(board,turn)
{
	var rows = flat(board)
	var score = 0;
	var l = rows.length;
	var flag4=false;
	for(var i=0;i<l;i++)
	{
		killflag4=false;
		score += doscore(rows[i],turn);
		if(killflag4)
			flag4=true;
	}
	return [score,flag4];
}

function killchoices(board,turn,main)
{
	var five=[]
	var hfour=[]
	var four=[]
	var tthree=[]
	var three=[]
	for (var p = 0; p < boardsize; p++)
		for (var q = 0; q < boardsize; q++)
		{
			if(board[p][q] ==-1)
			{
				if(!hasNeighbor(board,p,q,2,2))
					continue;
				if(main)
				{
					var score;
					board[p][q] = turn;
					mainz.cal(p,q,turn);
					score = evaluate(board)[turn];
					mainz.cal(p,q,turn);
					board[p][q] = -1
					if(score>=100000)
						return [true,[p,q]];
					else if(score>=10000)
						four.unshift([p,q]);
					else if(score>=2000)
						tthree.unshift([p,q]);
					else if(score>=1000)
						three.unshift([p,q]);
				}
				else
				{
					var scores = new Array()
					var flag4 = false;
					var temp;
					board[p][q] = turn
					mainz.cal(p,q,turn);
					temp = w4evaluate(board,turn);
					scores[turn] = temp[0]
					flag4 = temp[1];
					mainz.cal(p,q,turn);
					mainz.cal(p,q,1-turn);
					board[p][q] = 1-turn
					scores[1-turn] = evaluate(board)[1-turn]
					mainz.cal(p,q,1-turn);
					board[p][q] = -1
					if(scores[turn]>=100000)
						return [true,[p,q]];
					else if(scores[1-turn]>=100000)
						five.push([p,q]);
					else if(scores[turn]>=10000)
						hfour.push([p,q]);
					else if(scores[1-turn]>=10000)
						four.push([p,q]);
					else if(flag4&&scores[turn]>=1000)
						three.push([p,q]);
				}
			}
		}
	if(!main&&five.length)
		return [false,five[0]];
	else if(!main&&hfour.length)
		return [true,hfour[0]];
	return [false].concat(four.concat(tthree.concat(three)));
}



function maxkill(board,turn,deep)
{
	if(deep>maxdepth)
		return false
	var childs = killchoices(board,turn,true)
	//console.log("max",childs,deep)
	if(childs[0]==true)
		return childs[1];
	if(childs.length==1)
		return false;
	for (var i = 1; i < childs.length; i++) {

		board[childs[i][0]][childs[i][1]] = turn;
		mainz.cal(childs[i][0],childs[i][1],turn);
		var result = minkill(board, 1 - turn, deep+1);
		board[childs[i][0]][childs[i][1]] = -1;
		mainz.cal(childs[i][0],childs[i][1],turn);

		if(result)
			return childs[i];
	}
	return false;
}

function minkill(board,turn,deep)
{
	if(deep>maxdepth)
		return false
	var childs = killchoices(board,turn,false)
	//console.log("min",childs,deep);
	if(childs[0]==true)
		return false;
	if(childs.length==1)
		return false;
	for (var i = 1; i < childs.length; i++) {

		board[childs[i][0]][childs[i][1]] = turn;
		mainz.cal(childs[i][0],childs[i][1],turn);
		var result = maxkill(board, 1 - turn, deep+1);
		board[childs[i][0]][childs[i][1]] = -1;
		mainz.cal(childs[i][0],childs[i][1],turn);

		if(!result)
			return false;
	}
	return true;
}