/*
function Node(board,prop)
{
	this.parent=null
	this.child = new Array()
	this.board = board
	this.value = -1
	this.prop = prop
}

function Point(x,y)
{
	self.x = x;
	self.y = y;
}
*/


function choices(board,turn) {
	var five=[]
	var four=[]
	var tthree=[]
	var three=[]
	var two=[]
	var one=[]
	var zero=[]

	var aboard = JSON.parse(JSON.stringify(board))
	var avilible = new Array()
	for (var i = 0; i < boardsize; i++)
		for (var j = 0; j < boardsize; j++)
			if (aboard[i][j] >= 0)
			{
				for (var p = Math.max(i-2,0); p <= Math.min(i+2,boardsize-1); p++)
					for (var q = Math.max(j-2,0); q <= Math.min(j+2,boardsize-1); q++)
					{
						if (aboard[p][q] == -1)
						{
							if(!hasNeighbor(board,p,q))
							{
								zero.push([p,q])
								aboard[p][q]=-2
								continue
							}
							var scores = new Array()
							board[p][q] = 0
							scores[0] = evaluate(board)[0]
							board[p][q] = 1
							scores[1] = evaluate(board)[1]
							board[p][q] = -1
							if(flag&&p==8&&q==10)
								output("score",scores)
							if(scores[cpucolor]>=100000)
							{
								board[p][q] = -1
								return [[p,q]];
							}
							if(scores[1-cpucolor]>=100000)
								five.push([p,q])
							else if(scores[cpucolor]>=10000)
							{
								four.unshift([p,q])
								//output(scores[0].toString()+" p="+p.toString()+" q="+q.toString(),board)
							}
							else if(scores[1-cpucolor]>=10000)
								four.push([p,q])
							else if(scores[cpucolor]>=2000)
								tthree.unshift([p,q])
							else if(scores[1-cpucolor]>=2000)
								tthree.push([p,q])
							else if(scores[cpucolor]>=1000)
								three.unshift([p,q])
							else if(scores[1-cpucolor]>=1000)
								three.push([p,q])
							else if(scores[cpucolor]>=100)
								two.unshift([p,q])
							else if(scores[1-cpucolor]>=100)
								two.push([p,q])
							else
								one.push([p,q])
							aboard[p][q]=-2
						}
					}
			}
	if(five.length)
	{
		return [five[0]]
	}
	if(four.length)
	{
		return four
	}
	if(tthree.length)
	{
		return tthree
	}
	if(flag)
	{
		output("three",three);
		output("two",two)
	}
	return three.concat(two.concat(one.concat(zero)))
}

function getfrommax(ary, max) {
	if (max)
		return Math.max.apply(null, ary)
	else
		return Math.min.apply(null, ary)
}


function calnext(board, turn) {
	var childs = choices(board,turn)
	//console.log(JSON.parse(JSON.stringify(childs)))
	flag=false
	var besti = 0;
	var best = -99999999;
	for (var i = 0; i < childs.length; i++) {
		board[childs[i][0]][childs[i][1]] = turn
		var score = callayer(board, 1 - turn, false, 1, best)
		//console.log(childs[i],score.toString())
		if (score > best) {
			besti = i;
			best = score
		}
		board[childs[i][0]][childs[i][1]] = -1
	}
	return childs[besti]
}

function callayer(board, turn, max, count, alpha) {
	if (count == depth)
	{
		return evaluate(board)[2]
	}
	var childs = choices(board,turn)
	var best=max?-99999999:99999999;
	for (var i = 0; i < childs.length; i++) {
		//回溯法
		board[childs[i][0]][childs[i][1]] = turn
		var ascore = callayer(board, 1 - turn, !max, count + 1,best)
		//console.log("child",count,childs[i],ascore)
		//console.log("1111111111111111",ascore)
		if (max&&ascore>alpha)
		{
			board[childs[i][0]][childs[i][1]] = -1
			return ascore
		}
		if(!max&&ascore<alpha)
		{
			board[childs[i][0]][childs[i][1]] = -1
			return ascore
		}
		if(max&&ascore>best)
			best=ascore
		else if (!max&&ascore<best)
			best=ascore
		board[childs[i][0]][childs[i][1]] = -1
	}
	return best

}