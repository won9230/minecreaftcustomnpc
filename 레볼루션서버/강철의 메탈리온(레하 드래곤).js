var Ai; //Ai가져오기
var moveStop; //움직임 멈추기
var temp1 = 0; //패턴1 시간 체크
var temp2 = 0; //패턴1 시간 체크
function init(e)
{
	Ai = e.npc.getAi();
	moveStop = false;
}
function tick(e)
{
	var temp2Start;
	if(temp1 < 10)
	{
		moveStop = true;
	}
	else if(temp2 < 10)
	{
		moveStop = false;
		temp2Start = true;
	}
	if(temp2 < 10)
	{
		
	}
	else if(temp2Start)
	{
		
	}
}
function damaged(e)
{
	if(moveStop)
	{
		e.setCanceled(true);
		Ai.setWalkingSpeed(0);
	}
}