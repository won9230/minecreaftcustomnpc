var Ai;
var NpcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();

function init(e)
{
	Ai = e.npc.getAi();
}
function damaged(e)
{
	Ai.setLeapAtTarget(true);
	e.npc.timers.forceStart(1,10,true);
}
function timer(e)
{
	if(e.id == 1)
	{	
		Ai.setLeapAtTarget(false);
		e.npc.timers.stop(1);
	}
}