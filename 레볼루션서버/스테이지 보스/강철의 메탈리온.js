//기본
var isAttack = false;
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var npcEvent = Java.type('noppes.npcs.api.event.NpcEvent');
//a패턴
var apcount1 = 30; //a 쿨타임
var apcount2 = 0;
var apcount3 = 10; //a 지속시간
var apcount4 = 0;
var isApAttack = false;
var apbool1 = false;
var apDamage = 600; //a(반사) 데미지
//b패턴
var bpcount1 = 8; //b패턴 카운트
var bpcount2 = 0;
var projectileItem;
var verticalCircles = 5;
var radius = 5;
var bpDamage = 400; //b패턴 데미지
var bpKnockback = 5; //b패턴 넉백

function init(e)
{
	isAttack = false;
	projectileItem = e.npc.getWorld().createItem("minecraft:stone",0,1)
}

function meleeAttack(e)
{
	bpcount2++;
	if(bpcount1 < bpcount2)
	{
		bpcount2 = 0;
		e.npc.getStats().getRanged().setHasGravity(true);
		e.npc.getStats().getRanged().setStrength(bpDamage);
		e.npc.getStats().getRanged().setKnockback(bpKnockback);
		e.npc.getStats().getRanged().setSize(25);
		e.npc.getStats().getRanged().setSpeed(5);
		SimpleSphere(e,15);
		e.npc.say("메탈리온이 돌을 던집니다.");
	}
}

function tick(e)
{
	if(isAttack)
	{
		if(apcount1 <= apcount2)
		{
			apcount2 = 0;
			isApAttack = true;
			apbool1 = true;
			e.npc.say("메탈리온이 단단해집니다.");
		}
		else if(!isApAttack)
		{
			apcount2++;
		}
		if(isApAttack)
		{
			apcount4++;
			if(apcount3 <= apcount4)
			{
				apcount4 = 0;
				isApAttack = false;
				apbool1 = false;
			}
		}
	}
}

function damaged(e)
{
	e.setCanceled(apbool1);
	if(apbool1)
	{
		e.source.damage(apDamage);
	}
}
function SimpleSphere(e,verticalCircles)//원,타원형 만들기
{
    var pi = Math.PI
        for (var a = 0; a < pi * 2; a += pi / verticalCircles)
	{
		var x = Math.cos(a) * radius;
        var z = Math.sin(a) * radius;
		e.npc.shootItem(e.npc.x + x,e.npc.y - 2.5,e.npc.z + z ,projectileItem,100);	
    }
}

function died(e)
{
	isAttack = false;
	apcount2 = 0;
	apcount4 = 0;
	bpcount2 = 0;
}
function target(e)
{
	isAttack = false;
	apcount2 = 0;
	apcount4 = 0;
	bpcount2 = 0;
}
function targetLost(e)
{
	isAttack = false;
	apcount2 = 0;
	apcount4 = 0;
	bpcount2 = 0;
	
}
function kill(e)
{
	isAttack = false;
	apcount2 = 0;
	apcount4 = 0;
	bpcount2 = 0;
}