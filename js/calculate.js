/*
function Node(chessboard,prop)
{
	this.parent=null
	this.child = new Array()
	this.chessboard = chessboard
	this.value = -1
	this.prop = prop
}

function Point(x,y)
{
	self.x = x;
	self.y = y;
}
*/
function choices(board) {
	var chessboard= deepcopy(board)
	var avilible = new Array()
	for (var i = 0; i < boardsize; i++)
		for (var j = 0; j < boardsize; j++)
			if (chessboard[i][j] >= 0)
			{
				for (var p = Math.max(i-2,0); p <= Math.min(i+2,boardsize-1); p++)
					for (var q = Math.max(j-2,0); q <= Math.min(j+2,boardsize-1); q++)
						if (chessboard[p][q] == -1)
						{
							chessboard[p][q]=-2
							avilible.push([p, q])
						}
			}
	return avilible
}

function getfrommax(ary, max) {
	if (max)
		return Math.max.apply(null, ary)
	else
		return Math.min.apply(null, ary)
}


function calnext(chessboard, turn) {
	console.log(chessboard)
	var childs = choices(chessboard)
	var besti = 0;
	var best = -99999999;
	for (var i = 0; i < childs.length; i++) {
		chessboard[childs[i][0]][childs[i][1]] = turn
		var score = callayer(chessboard, 1 - turn, false, 1, best)
		if (score > best) {
			besti = i;
			best = score
		}
		chessboard[childs[i][0]][childs[i][1]] = -1
	}
	console.log(childs,besti)
	return childs[besti]
}

function callayer(chessboard, turn, max, count, alpha) {
	if (count == depth)
		return evaluate(chessboard)
	var childs = choices(chessboard)
	var best=max?-99999999:99999999;
	for (var i = 0; i < childs.length; i++) {
		//回溯法
		chessboard[childs[i][0]][childs[i][1]] = turn
		var ascore = callayer(chessboard, 1 - turn, !max, count + 1,best)
		if (max&&ascore>alpha)
		{
			//console.log("cut")
			chessboard[childs[i][0]][childs[i][1]] = -1
			return ascore
		}
		if(!max&&ascore<alpha)
		{
			//console.log("cut")
			chessboard[childs[i][0]][childs[i][1]] = -1
			return ascore
		}
		if(max&&ascore>best)
			best=ascore
		else if (!max&&ascore<best)
			best=ascore
		chessboard[childs[i][0]][childs[i][1]] = -1
	}
	return best

}