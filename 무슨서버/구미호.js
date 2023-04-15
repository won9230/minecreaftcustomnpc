var acount1 = 20; //폭탄 날리기 쿨타임 (초 / 2)
var acount2 = 0;
var acount3 = 3; //폭탄 날리는 시간 (초 / 2)
var acount4 = 0;
var bcount1 = 10; //때릴때 마다 나약함 독 걸리는 확률
var bcount2 = 0;
var bcount3 = 5;
var bcount4 = 0;
var bweaknessTime = 3; //나약함 시간
var bpoisonTime = 7; //독 시간
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
//var bDamage = 1; //
var aIsAttack = false;
var projectileItem;
var world;
var isAttack = false;

function init(e)
{
	isAttack = false;
	acount2 = 0;
	acount4 = 0;
	world = e.npc.getWorld();
	projectileItem = e.npc.getWorld().createItem("minecraft:lingering_potion",0,1); //minecraft:lingering_potion
	e.npc.timers.stop(1);
}
function tick(e)
{
	if(isAttack)
	{

		if(acount1 <= acount2)
		{
			acount2 = 0;
			aIsAttack = true;
			e.npc.timers.forceStart(1,1,true);
		}
		else if(!aIsAttack)
		{
			acount2++;
		}
		if(aIsAttack)
		{
			acount4++;
			if(acount3 <= acount4)
			{
				acount4 = 0;
				aIsAttack = false;
				e.npc.timers.stop(1);
			}
		}
	}
}
function timer(e)
{
	if(e.id == 1)
	{
		var ran1 = Math.floor(Math.random()*9)+1;
		var ran2 = Math.floor(Math.random()*4)+1;
		//e.npc.say(ran2);
		switch(ran2)
		{
			case 1:
			e.npc.shootItem(e.npc.x + Math.sin(ran1),e.npc.y+5,e.npc.z + Math.cos(ran1),projectileItem,100);
			break;			
			case 2:
			e.npc.shootItem(e.npc.x + Math.sin(ran1),e.npc.y+5,e.npc.z - Math.cos(ran1),projectileItem,100);
			break;			
			case 3:
			e.npc.shootItem(e.npc.x + Math.sin(ran1),e.npc.y+5,e.npc.z + Math.cos(ran1),projectileItem,100);
			break;			
			case 4:
			e.npc.shootItem(e.npc.x + Math.sin(ran1),e.npc.y+5,e.npc.z - Math.cos(ran1),projectileItem,100);
			break;
		}		
	}
}

function damaged(e)
{
	//패턴1(n번때리면 느려짐)
	bcount2 = Math.floor(Math.random()*100);
	if (bcount1 >= bcount2)
	{
		if(e.source == null)
			return;
		var name = e.source.getName();
		npcAPI.executeCommand(world,"effect "+ e.source.getName() +" minecraft:weakness " + bweaknessTime +" 1 true");
		npcAPI.executeCommand(world,"effect "+ e.source.getName() +" minecraft:poison "+ bpoisonTime + " 2 true");
	}
}

function died(e)
{
	isAttack = false;
	e.npc.timers.stop(1);
	acount2 = 0;
	acount4 = 0;
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
	acount4 = 0;
}
function kill(e)
{
	isAttack = false;
	e.npc.timers.stop(1);
	acount2 = 0;
	acount4 = 0;
}