var world;
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var bpat2 = true;
var bcount1 = 5; //번개 횟수
var bcount2 = 0;
var bcount3 = 30; //쿨타임
var bcount4 = 0;
var ccount1 = 20;
var cdamage = 400; //뒤도는거 데미지
var pos;
var isAttack = false;

function init(e)
{
	bpat2 = true;
	world = e.npc.getWorld();
	var bcount2 = 0;
	var bcount4 = 0;
}

function tick(e)
{
	if(isAttack)
	{
		//e.npc.say(world.getTempdata().get('cram1')+world.getTempdata().get('cram2')+world.getTempdata().get('cram3')+world.getTempdata().get('cram4'));
		if(bpat2)
		{
			bcount4++;
		}
		if(bcount3 <= bcount4 && bpat2)
		{
			e.npc.timers.forceStart(1,10,true);		
			bpat2 = false;
			//e.npc.say(1);
		}
	}
}

function damaged(e)
{
	var ran1 = Math.floor(Math.random() *100)
	if(ccount1 >= ran1)
	{
		playerBehind(e);
		e.source.damage(cdamage);
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

function playerBehind(e)
{
	var source = e.source;
	var pos = source.getPos();
    var facing = source.getRotation();
    if((facing > 225 && facing <=315) || (facing > -135 && facing <= -45)) // Negative values because sometimes the values are negative
        {
            // East, Positive X
            pos = pos.subtract(1,0,0);
            e.npc.setPos(pos);
        }
        else if((facing > 135 && facing <=225) || (facing > -225 && facing <= -135))
        {
            // North, Negative Z
            pos = pos.add(0,0,1);
             e.npc.setPos(pos);
        }
        else if((facing > 45 && facing <=135) || (facing > -315 && facing <= -225)) 
        {
            // West, Negative X
            pos = pos.add(1,0,0);
             e.npc.setPos(pos);
        }
        else if((facing > 315 && facing <=360) || (facing > -45 && facing <=45) || (facing >= -360 && facing <= -315))
        {
            // South, Positive Z
            pos = pos.subtract(0,0,1);
             e.npc.setPos(pos);
        }
        else
        {
			return;
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