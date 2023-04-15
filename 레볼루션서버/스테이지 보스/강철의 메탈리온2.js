var cpcount1 = 30; //c패턴 시간
var cpcount2 = 0;
var cpcount3 = 10; //c패턴 시전시간
var cpcount4 = 0;
var isCpAttack = false;
var cpDamage = 300; //c데미지
var cpKnockback = 2; //c넉백
var players = [];
var playerPos;
var isAttack = false;
var world;
var pos;
var projectileItem;

function init(e)
{
	e.npc.timers.stop(1);
	world = e.npc.getWorld();
	pos = e.npc.getPos();
	projectileItem = e.npc.getWorld().createItem("minecraft:stone",0,1)
}

function tick(e)
{
	if(isAttack)
	{
		if(cpcount1 <= cpcount2)
		{
			cpcount2 = 0;
			isCpAttack = true;
			e.npc.getStats().getRanged().setHasGravity(false);
			e.npc.getStats().getRanged().setStrength(cpDamage);
			e.npc.getStats().getRanged().setKnockback(cpKnockback);
			e.npc.getStats().getRanged().setSize(8);
			e.npc.getStats().getRanged().setSpeed(10);
			e.npc.timers.forceStart(1,1,true);
			e.npc.say("메탈리온이 돌을 연속으로 던집니다.");
		}
		else if(!isCpAttack)
		{
			cpcount2++;
		}
		if(isCpAttack)
		{
			cpcount4++;
			if(cpcount3 <= cpcount4)
			{
				cpcount4 = 0;
				isCpAttack = false;
				e.npc.timers.stop(1);
			}
		}
	}
}
function timer(e)
{
	if(e.id == 1)
	{
		players = world.getNearbyEntities(pos, 20, 1);
		if(players.length != 0)
		{
			var ran1 = Math.floor(Math.random() * players.length);
			playerPos = players[ran1];
			if(playerPos != null)
			{
				e.npc.shootItem(playerPos,projectileItem,100);
			}
		}
	}
}
function died(e)
{
	isAttack = false;
	e.npc.timers.stop(1);
	cpcount2 = 0;
	cpcount4 = 0;
	isCpAttack = false;
}
function target(e)
{
	isAttack = true;
}
function targetLost(e)
{
	isAttack = false;
	e.npc.timers.stop(1);
	cpcount2 = 0;
	cpcount4 = 0;
	isCpAttack = false;
}
function kill(e)
{
	isAttack = false;
	e.npc.timers.stop(1);
	cpcount2 = 0;
	cpcount4 = 0;
	isCpAttack = false;
}