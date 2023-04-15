var nextP = false;
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var spawnNPC1 = "마왕"
var world;
var count;

function init(e)
{
	e.npc.timers.stop(1);
	world = e.npc.getWorld();
	count = 0;
}

function tick(e)
{		
	if(nextP)
	{
		nextP = false;
		e.npc.timers.forceStart(1,10,true);
	}
	
	//e.npc.say(e.npc.getHealth());
	if(e.npc.getMaxHealth() * 0.1 <= e.npc.getHealth())
	{
		nextP = true;
	}
}

function timer(e)
{
	if(e.id == 1)
	{
		var pos = e.npc.getPos();
		count++;
		if(count == 1)
			e.npc.say("제법이구나..!! 더 나를 즐겁게 해보거라!!");
		if(count == 4)
		{
			npcAPI.executeCommand(world,"particle largeexplode "+pos.getX()+" "+pos.getY()+" "+pos.getZ()+" 5 1 5 0 70 normal");
			world.playSoundAt(e.npc.getPos(),"minecraft:entity.wither.ambient",25,2);
		}
		//e.npc.say(count);
		if(count >= 5)
		{
			npcAPI.getClones().spawn(e.npc.getX(),e.npc.getY(),e.npc.getZ(),3,spawnNPC1,world); //좌표 변경해야됨
			e.npc.despawn();
		}
	}
}