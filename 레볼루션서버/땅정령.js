var projectileItem;
var pos;
var world;
var acount1 = 10;
var acount2 = 0;
var verticalCircles = 5;
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var isAttack = false;


function init(e)
{
	isAttack = false;
	projectileItem = e.npc.getWorld().createItem("minecraft:stone",0,1)
}

function tick(e)
{
	if(isAttack)
	{
		acount2++;
		if(acount1 <= acount2)
		{
			acount2 = 0;
			SimpleSphere(e,verticalCircles,5);
		}
	}
}

function SimpleSphere(e,verticalCircles,radius)//원,타원형 만들기
{
    var pi = Math.PI
    for (var a = 0; a < pi * 2; a += pi / verticalCircles)
	{
		var x = Math.cos(a) * radius;
        var z = Math.sin(a) * radius;
		e.npc.shootItem(e.npc.x + x,e.npc.y+1.5 ,e.npc.z + z ,projectileItem,100);	
    }
}

function died(e)
{
	isAttack = false;
	acount2 = 0;
}
function target(e)
{
	isAttack = true;
}
function targetLost(e)
{
	isAttack = false;
	acount2 = 0;
}
function kill(e)
{
	isAttack = false;
	acount2 = 0;
}