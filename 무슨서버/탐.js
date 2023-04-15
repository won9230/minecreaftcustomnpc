var acount1 = 30; //a패턴 (초/2)
var acount2 = 0;
var aDamage = 400; //a데미지
var apIsAttack1 = false;
var acount3 = 10;//구속 시간 밑에 바꿔야됨
var acount4 = 0;
var players = [];
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var world;
var bcount1 = 15; //b패턴
var bcount2 = 0;
var isAttack = false;

function init(e)
{
	world = e.npc.getWorld();
	acount2 = 0;
	acount4 = 0;
	bcount2 = 0;
}
function meleeAttack(e)
{
	var ran1 = Math.floor(Math.random() * 100);
	var name = e.npc.getAttackTarget().getName();
	e.npc.say(ran1);
	if(ran1 <= 10)
	{
		npcAPI.executeCommand(world,"effect " +name + " minecraft:blindness 5 99 true");
		e.npc.getAttackTarget().damage(aDamage);
	}
}

function tick(e)
{
	if(isAttack)
	{
		if(acount1 <= acount2)
		{
			acount2 = 0;
			apIsAttack1 = true;
			var pos = e.npc.getPos();
			players = world.getNearbyEntities(pos, 10, 1);
			for(var i = 0; i < players.length;i++)
			{
				npcAPI.executeCommand(world,"effect " +players[i].getName() + " minecraft:slowness 5 99 true");			
			}
		}
		else if(!apIsAttack1)
		{
			acount2++;
		}
		if(apIsAttack1)
		{
			acount4++;
			for(var i = 0; i < players.length;i++)
			{
				e.npc.world.spawnParticle("smoke", players[i].getX(),players[i].getY()+1.5,players[i].getZ(), 0.3, 0.5, 0.3, 0, 100);		
			}
			if(acount3 <= acount4)
			{
				acount4 = 0;
				apIsAttack1 = false;
				
				players = [];
			}
		}
	}
}
function damaged(e)
{
	bcount2++;
	if(bcount1 < bcount2)
	{
		bcount2 = 0;
		npcAPI.executeCommand(world,"effect " +e.source.getName() + " minecraft:mining_fatigue 5 99 true");	
		e.npc.world.spawnParticle("smoke", e.source.getX(),e.source.getY()+1.5,e.source.getZ(), 0.3, 0.5, 0.3, 0.2, 100);
	}
}
function died(e)
{
	isAttack = false;
}
function target(e)
{
	isAttack = true;
}
function targetLost(e)
{
	isAttack = false;
}
function kill(e)
{
	isAttack = false;
}