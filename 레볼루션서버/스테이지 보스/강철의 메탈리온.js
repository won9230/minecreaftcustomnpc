//기본
var isAttack = false;
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var npcEvent = Java.type('noppes.npcs.api.event.NpcEvent');
//b패턴
var bpcount1 = 5; //b패턴 카운트
var bpcount2 = 0;
var projectileItem;
var verticalCircles = 5;
var radius = 5;
var bpDamage = 400; //b패턴 데미지
var bpKnockback = 5; //b패턴 넉백

function init(e)
{
	isAttack = false;
	projectileItem = e.npc.getWorld().createItem("minecraft:stone",0,1) //minecraft:stone를 다른걸로 바꿈
}

function damaged(e)
{
	bpcount2++;
	if(bpcount1 < bpcount2)
	{
		bpcount2 = 0;
		e.npc.getStats().getRanged().setHasGravity(false); //중력
		e.npc.getStats().getRanged().setStrength(bpDamage);
		e.npc.getStats().getRanged().setKnockback(bpKnockback);
		e.npc.getStats().getRanged().setSize(5); //아이템 크기
		e.npc.getStats().getRanged().setSpeed(5); //아이템 속도
		SimpleSphere(e,5); //e는 건들면 안됨 아마도 개수
	}
}
function SimpleSphere(e,verticalCircles)//원,타원형 만들기
{
    var pi = Math.PI
        for (var a = 0; a < pi * 2; a += pi / verticalCircles)
	{
		var x = Math.cos(a) * radius;
        var z = Math.sin(a) * radius;
		e.npc.shootItem(e.npc.x + x,e.npc.y+1.5,e.npc.z + z ,projectileItem,100);	
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