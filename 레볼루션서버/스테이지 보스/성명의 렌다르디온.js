var acount1 = 15; //a패턴
var acount2 = 0;
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var bcount1 = 10; //b패턴 (초/2)
var bcount2 = 0;
var bDamage = 1; //b데미지
var players = [];
var world;
var ccount1 = 20; //c패턴
var ccount2 = 0;
var cDamage = 1;//c데미지
var isAttack = false;

function init(e)
{
	isAttack = false;
	world = e.npc.getWorld();
	players = [];
}

function damaged(e)
{
	acount2++;
	var name = e.source.getName();
	if(acount1 < acount2)
	{
		acount2 = 0;
		npcAPI.executeCommand(world,"effect " +name+ " minecraft:weakness 2 99 true");
	}
}

function tick(e)
{
	if(isAttack)
	{
		bcount2++;
		if(bcount1 < bcount2)
		{
			bcount2 = 0;
			var pos = e.npc.getPos();
			players = world.getNearbyEntities(pos, 5, 1);
			e.npc.world.spawnParticle("happyVillager", pos.getX(),pos.getY()+1.5,pos.getZ(), 3, 1, 3, 0, 200);
			for(var i = 0; i < players.length; i++)
			{			
				npcAPI.executeCommand(world,"effect " +players[i].getName() + " minecraft:weakness 2 99 true");
				players[i].damage(bDamage);
			}
			players = [];
		}
		ccount2++;
		if(ccount1 < ccount2)
		{
			ccount2 = 0;
			var pos = e.npc.getPos();
			players = world.getNearbyEntities(pos, 5, 1);
			var ran1 = Math.floor(Math.random() * 4) + 1;
			var ran2 = Math.floor(Math.random() * players.length);		
			e.npc.world.spawnParticle("happyVillager", players[ran2].getX(),players[ran2].getY()+1,players[ran2].getZ(), 0, 0.5, 0, 0, 200);
			switch(ran1) 
			{
				case 1:
					players[ran2].setPosition(e.npc.getX(),e.npc.getY(),e.npc.getZ());  //좌표 적기
				break;
				case 2:
					players[ran2].setPosition(e.npc.getX()+1,e.npc.getY(),e.npc.getZ());
				break;
				case 3:
					players[ran2].setPosition(e.npc.getX(),e.npc.getY(),e.npc.getZ()+2);
				break;
				case 4:
					players[ran2].setPosition(e.npc.getX()+3,e.npc.getY(),e.npc.getZ());
				break;
			}
			players[ran2].damage(cDamage);
		}
	}
}
function died(e)
{
	isAttack = false;
	players = [];
}
function target(e)
{
	isAttack = true;
	players = [];
}
function targetLost(e)
{
	isAttack = false;
	players = [];
}
function kill(e)
{
	isAttack = false;
	players = [];
}