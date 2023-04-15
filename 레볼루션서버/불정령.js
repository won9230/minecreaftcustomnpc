var aDamage = 100;
var acount1 = 10;
var acount2 = 0;
var pos;
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
			//e.npc.say(2);
			//e.npc.say(acount2);
			acount2 = 0;
			var players = [];
			pos = e.npc.getPos();
			players = world.getNearbyEntities(pos, 10, 1);		
			//world.playSoundAt(e.npc.getPos(),"minecraft:entity.generic.explode",25,2);
			for (var i = 0; i < players.length; i++) 
			{
				players[i].damage(140);
				players[i].knockback(3,players[i].getRotation() + 180);
				//e.npc.say(players[i].getName());
				npcAPI.executeCommand(world,"particle flame "+players[i].getX()+" "+players[i].getY()+" "+players[i].getZ()+" 1 1 1 0.2 150 normal @a");
				//파티클 변경 전
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

