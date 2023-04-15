//기본
var isAttack = false;
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var world;
//a패턴
var apcount1 = 7; //a패턴 때린사람
var apSlowTime = 2; //슬로우 시간
var apAmplification = 5;//증폭
var apDamage = 400; //데미지
var apcount2 = 0;
//b패턴
var bpcount1 = 20; //b패턴 쿨타임 (초)
var bpcount2 = 0;
var bpcount3 = 5;
var bpcount4 = 0;
var bpIsAttack1 = false;
var bpIsAttack2 = false;
var bpMaxRange = 13; //b패턴 최대 범위
var bpMinRange = 2; //b패턴 최소 범위
var bpDamage = 300; //b패턴 데미지

function init(e)
{
	world = e.npc.getWorld();
	isAttack = false;
	apcount2 = 0;
	bpcount1 *= 2;
	bpcount3 *= 2;
	e.npc.timers.stop(1);
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
function damaged(e)
{
	//패턴1(n번때리면 느려짐)
	apcount2++;
	if (apcount1 <= apcount2)
	{
		if(e.source == null)
			return;
		apcount2 = 0;
		var pos = e.source.getPos();
		var name = e.source.getName();
		e.source.damage(apDamage);
		e.npc.say("천둥의 서바이트가 번개를 떨어트립니다.");
		npcAPI.executeCommand(world,"effect " +name+ " minecraft:slowness " + apSlowTime + " " + apAmplification + " true");
		npcAPI.executeCommand(world,"particle blockcrack "+pos.getX()+" "+pos.getY()+" "+pos.getZ()+" 0 7 0 0 100 normal @a 41");
		world.thunderStrike(pos.getX(),pos.getY(),pos.getZ());
	}
}

function tick(e)
{
	if(isAttack)
	{
		if(bpcount1 <= bpcount2)
		{
			e.npc.say("천둥의 서바이트가 분노합니다.");
			bpcount2 = 0;
			bpIsAttack1 = true;
			e.npc.timers.forceStart(1,1,true);
		}
		else if(!bpIsAttack1)
		{
			bpcount2++;
		}
		if(bpIsAttack1)
		{
			bpcount4++;
			if(bpcount3 <= bpcount4)
			{
				bpcount4 = 0;
				//e.npc.say("4번");
				bpIsAttack1 = false;
				isAttack = false;
				e.npc.timers.stop(1);
			}
		}
	}
}
function timer(e)
{
	if(e.id == 1)
	{
		var pos = e.npc.getPos();
		var ran1 = Math.floor(Math.random() * bpMaxRange - bpMinRange + 1)+ bpMinRange;
		var ran2 = Math.floor(Math.random() * bpMaxRange - bpMinRange + 1)+ bpMinRange;
		var ran3 = Math.floor(Math.random() * 4) + 1
		//e.npc.say(ran1);
		//e.npc.say("3번");
		switch(ran3)
		{
			case 1:
			    pos = pos.add(ran1,0,ran2);
				Bp1(e,pos,ran1,ran2);
			break;
			case 2:
			    pos = pos.add(ran1,0,0);
				pos = pos.subtract(0,0,ran2);
				Bp1(e,pos,ran1,ran2);
			break;
			case 3:
				pos = pos.add(0,0,ran2);
				pos = pos.subtract(ran1,0,0);
				Bp1(e,pos,ran1,ran2);
			break;
			case 4:
				pos = pos.subtract(ran1,0,ran2);
				Bp1(e,pos,ran1,ran2);
			break;
			default:
				e.npc.say(ran3);
		}
	}
}
function Bp1(e,pos,ran1,ran2) 
{
    //e.npc.say(pos.getX());
    world.thunderStrike(pos.getX(), pos.getY(), pos.getZ());
	npcAPI.executeCommand(world,"particle blockcrack "+pos.getX()+" "+pos.getY()+" "+pos.getZ()+" 0 7 0 0 150 normal @a 41");
    var players = [];
    players = world.getNearbyEntities(pos, 2, 1);
    if (players.length <= 1)
	{
		for (var i = 0; i < players.length; i++) 
		{
			players[i].damage(bpDamage);
			//e.npc.say(players[i].getName());
		}
    }
}


