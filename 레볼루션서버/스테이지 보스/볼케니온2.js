var bcount1 = 10; //b패턴 쿨타임 (초/2)
var bcount2 = 0;
var bDamage = 700; //b패턴 데미지
var players = [];
var world;
var isAttack = false;

function init(e)
{
	bcount2 = 0;
	world = e.npc.getWorld();
	players = [];
}

function tick(e)
{
	if(isAttack)
	{
		bcount2++;
		if(bcount1 < bcount2)
		{
			var pos = e.npc.getPos();
			players = world.getNearbyEntities(pos, 5, 1);
			bcount2 = 0;		
			if(players.length != 0)
			{
				for(var i = 0; i < players.length; i++)
				{
					var ran = Math.floor(Math.random() * players.length);
					players[ran].damage(bDamage);
					e.npc.world.spawnParticle("flame", players[ran].getX(),players[ran].getY(),players[ran].getZ(), 0.1, 1, 0.1, 0.3, 100);
					players = [];
				}
			}
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