var acount1 = 30; //위더 소환하는 시간 (초 / 2)
var acount2 = 0;
var acount3 = 4; //위더 개 수
var b1Time = 5; //나약함 시간 (초)
var b2Time = 5; //위더 시간 (초
var bpaer = 20; //발생확률
var ccount1 = 20; //tnt시간(초 / 2)
var ccount2 = 0;
var ccount3 = 10; //tnt 범위
var cdamege = 30; //tnt데미지
var spawnNPC1 = "흑마병"; //NPC이름
var world;
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var isAttack;

function init(e)
{
	isAttack = false;
	world = e.npc.getWorld();
}

function tick(e)
{
	if(isAttack)
	{
		acount2++;
		ccount2++;
		if(acount1 <= acount2)
		{
			acount2 = 0;
			//e.npc.say("a패턴");
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
		if(ccount1 <= ccount2)
		{
			ccount2 = 0;
			//e.npc.say("c패턴");
			var players = [];
			var pos = e.npc.getPos();
			players = world.getNearbyEntities(pos, ccount3, 1);
			if (players.length >= 1)
			{
				for (var i = 0; i < players.length; i++) 
				{
					players[i].damage(cdamege);
					//e.npc.say(players[i].getName());
					//e.npc.say(players[i].getName());
				}
			}
			npcAPI.executeCommand(world,"particle largeexplode "+pos.getX()+" "+pos.getY()+" "+pos.getZ()+" 5 1 5 0 70 normal");
		}
	}
}

function damaged(e)
{
	var ran1 = Math.floor(Math.random() * 100);
	if(ran1 <= bpaer)
	{
		//e.npc.say("b패턴");
		if(e.source == null)
			return;
		var name = e.source.getName();
		npcAPI.executeCommand(e.npc.getWorld(),"effect "+ name +" minecraft:wither " + b1Time + " 1 true");	
		npcAPI.executeCommand(e.npc.getWorld(),"effect "+ name +" minecraft:weakness " + b2Time + " 1 true");	
	}
}
function died(e)
{
	isAttack = false;
	acount2 = 0;
}
function target(e)
{
	isAttack = true;
}
function targetLost(e)
{
	isAttack = false;
	acount2 = 0;
}
function kill(e)
{
	isAttack = false;
	acount2 = 0;
}