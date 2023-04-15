var acount1 = 40; //마녀 소환하는 시간 (초 / 2)
var acount2 = 0;
var acount3 = 4; //마녀 개 수
var spawnNPC1 = "마녀"; //NPC이름
var world;
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var isAttack;

function init(e)
{
	world = e.npc.getWorld();
	
}

function tick(e)
{
	if(isAttack)
	{
		acount2++;
		if(acount1 <= acount2)
		{
			acount2 = 0;
			
			for(var i = 0; i < acount3; i++)
			{
				var ran1 = Math.floor(Math.random()*5)+1;
				var ran2 = Math.floor(Math.random()*5)+1;
				var ran3 = Math.floor(Math.random()*4)+1;
				//e.npc.say(ran2);
				switch(ran3)
				{
					case 1:
						npcAPI.getClones().spawn(e.npc.getX()+ran1,e.npc.getY(),e.npc.getZ()+ran2,8,spawnNPC1,world); //좌표 변경해야됨
					break;			
					case 2:
						npcAPI.getClones().spawn(e.npc.getX()+ran1,e.npc.getY(),e.npc.getZ()-ran2,8,spawnNPC1,world); //좌표 변경해야됨
					break;			
					case 3:
						npcAPI.getClones().spawn(e.npc.getX()-ran1,e.npc.getY(),e.npc.getZ()+ran2,8,spawnNPC1,world); //좌표 변경해야됨
					break;			
					case 4:
						npcAPI.getClones().spawn(e.npc.getX()-ran1,e.npc.getY(),e.npc.getZ()-ran2,8,spawnNPC1,world); //좌표 변경해야됨
					break;
				}	
			}
		}
	}
}

function died(e)
{
	isAttack = false;
	e.npc.timers.stop(1);
	acount2 = 0;
}
function target(e)
{
	isAttack = true;
}
function targetLost(e)
{
	isAttack = false;
	e.npc.timers.stop(1);
	acount2 = 0;
}
function kill(e)
{
	isAttack = false;
	e.npc.timers.stop(1);
	acount2 = 0;
}


