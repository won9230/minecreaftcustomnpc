var bpcount1 = 16; //떨어지는 패턴 발동 시간 (초/2)
var bpcount2 = 0;
var bpcount5 = 0;
var bpcount6 = 0;
var bpIsAttack1 = false;
var bpos1;
var bposy;
var bpdamage = 100; //떨어지는 패턴 데미지
var world , pos;
var isAttack = false;
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();

function init(e)
{
	e.npc.timers.stop(1);
	e.npc.timers.stop(2);
	world = e.npc.getWorld();
}

function tick(e)
{
	if(isAttack)
	{
		if(bpcount1 <= bpcount2)
		{
			bpcount2 = 0;
			bpIsAttack1 = true;
			bposy = e.npc.getY()+5;
			e.npc.timers.forceStart(1,1,true);
		}
		else if(!bpIsAttack1)
		{
			bpcount2++;
		}
	}
	//e.npc.say(bpcount2);
}
function timer(e)
{
	if(e.id == 1)
	{
		bpcount5++;
		if(bpcount5 < 20)
		{
			e.npc.setPosition(e.npc.getX(),bposy,e.npc.getZ());
		}
		else
		{
			bpIsAttack1 = false;
			bpcount5 = 0;    
			var players = [];
			pos = e.npc.getPos();
			players = world.getNearbyEntities(pos, 10, 1);
			npcAPI.executeCommand(world,"particle largeexplode "+pos.getX()+" "+pos.getY()+" "+pos.getZ()+" 10 1 10 0 70 normal");		
			world.playSoundAt(e.npc.getPos(),"minecraft:entity.generic.explode",25,2);
			if (players.length <= 1)
			{
				for (var i = 0; i < players.length; i++) 
				{
					players[i].damage(1);
					//e.npc.say(players[i].getName());
				}
			}
			e.npc.timers.stop(1);
		}
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
