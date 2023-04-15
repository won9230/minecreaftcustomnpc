var apcount1 = 40; //디버프 패턴 확률
var apcount2 = 0;
var apTime = 5; //디버프 시간
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var world;
var cpcount1 = 10; //밀쳐내기 쿨타임 (초/2)
var cpcount2 = 0;
var cpcount3 = 10; //넉백 수치
var cpdamage = 60; //c패턴 데미지
var pos;
var isAttack = false;

function init(e)
{
	world = e.npc.getWorld();
}

function damaged(e)
{
	//패턴1(n번때리면 느려짐)
	apcount2 = Math.floor(Math.random()*100);
	//e.npc.say(apcount2);
	if (apcount1 >= apcount2)
	{
		if(e.source == null)
			return;
		var name = e.source.getName();
		npcAPI.executeCommand(world,"effect " +name+ " minecraft:weakness "+apTime+" 1 true"); //나약함
		npcAPI.executeCommand(world,"effect " +name+ " minecraft:wither "+apTime+" 2 true"); //독
		npcAPI.executeCommand(world,"effect " +name+ " minecraft:poison "+apTime+" 2 true"); //위더
		npcAPI.executeCommand(world,"effect " +name+ " minecraft:hunger "+apTime+" 1 true"); //허기
	}
	//e.npc.say(RotationNumber(e));
}

function tick(e)
{
	if(isAttack)
	{
		cpcount2++;
		//e.npc.say(cpcount2);
		if(cpcount1 <= cpcount2)
		{
			pos = e.npc.getPos();
			var players = [];
			players = world.getNearbyEntities(pos, 3, 1);
			for (var i = 0; i < players.length; i++) 
			{
				
				players[i].knockback(3,players[i].getRotation() +180);
				players[i].damage(cpdamage);
				//e.npc.say(players[i].getName());
			}
			npcAPI.executeCommand(world,"particle explode "+pos.getX()+" "+pos.getY()+" "+pos.getZ()+" 3 1 3 2 70 normal");		
			world.playSoundAt(e.npc.getPos(),"minecraft:entity.generic.explode",25,2);
			cpcount2 = 0;
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