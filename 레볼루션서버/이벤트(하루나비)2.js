var ran1;
var acount1 = 20; //넉백 확률
var bpat2 = true;
var bcount1 = 5; //번개 횟수
var bcount2 = 0;
var bcount3 = 30; //쿨타임
var bcount4 = 0;
var pos;
var world;
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var isAttack = false;

function init(e)
{
	bpat2 = true;
	world = e.npc.getWorld();
}

function damaged(e)
{
	if(e.source == null)
		return;
	ran1 = Math.floor(Math.random()*100);
	if(acount1 >= ran1)
	{
		e.source.knockback(3,e.source.getRotation()+180);
		e.source.damage(400);
	}
}

function tick(e)
{
	if(isAttack)
	{
		//e.npc.say(world.getTempdata().get('cram1')+world.getTempdata().get('cram2')+world.getTempdata().get('cram3')+world.getTempdata().get('cram4'));
		if(bpat2)
		{
			bcount4++;
			//e.npc.say(2);
		}
		if(bcount3 <= bcount4 && bpat2)
		{
			e.npc.timers.forceStart(1,10,true);		
			bpat2 = false;
			//e.npc.say(1);
		}
	}
}
function timer(e)
{
	if(e.id == 1)
	{
		bcount2++;
		if(bcount1 >= bcount2)
		{
			//e.npc.say(2);
			var players = [];
			pos = e.npc.getPos();
			players = world.getNearbyEntities(pos, 10, 1);		
			//world.playSoundAt(e.npc.getPos(),"minecraft:entity.generic.explode",25,2);
			for (var i = 0; i < players.length; i++) 
			{
				players[i].damage(140);
				//e.npc.say(players[i].getName());
				npcAPI.executeCommand(world,"particle smoke "+players[i].getX()+" "+players[i].getY()+" "+players[i].getZ()+" 1 1 1 1 150 normal @a");
			}
		}
		else
		{
			bpat2 = true;
			e.npc.timers.stop(1);
			bcount2 = 0;
			bcount4 = 0;
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