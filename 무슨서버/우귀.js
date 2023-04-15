var bpcount1 = 30; //떨어지는 패턴 발동 시간 (초/2)
var bpcount2 = 0;
var bpcount5 = 0;
var bpcount6 = 0;
var bpIsAttack1 = false;
var bpos1;
var bposy;
var bpdamage = 1; //떨어지는 패턴 데미지
var world , pos;
var isAttack = false;
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var players = [];
var X = [];
var Y = [];
var Z = [];
//var _players = [];

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
			pos = e.npc.getPos();
			players = world.getNearbyEntities(pos, 10, 1);
			for (var i = 0; i < players.length; i++) 
			{
				X[i] = Math.floor(players[i].getPos().getX());
				Y[i] = Math.floor(players[i].getPos().getY()+5);
				Z[i] = Math.floor(players[i].getPos().getZ());
			}
			e.npc.timers.forceStart(1,1,true);
			//_players = world.getNearbyEntities(pos, 10, 1);
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
		if(bpcount5 <= 20)
		{						
					
			//world.playSoundAt(e.npc.getPos(),"minecraft:entity.generic.explode",25,2);
			if (players.length <= 1)
			{
				for (var i = 0; i < players.length; i++) 
				{
					players[i].damage(10);
					npcAPI.executeCommand(world,"particle dripWater "+X[i]+" "+Y[i]+" "+Z[i]+" 0.5 1 0.5 0.5 20 normal");
					//e.npc.say(players[i].getPos().getX());
					//players[i].setPos(players[i].getPos());
					players[i].setPosition(X,Y,Z);
				}
			}
		}
		else
		{
			bpIsAttack1 = false;
			players = [];
			e.npc.timers.stop(1);
			bpcount5 = 0;
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


