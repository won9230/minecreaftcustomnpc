var isAttack = false;
var acount1 = 20; //a패턴 시간 (2/초)
var acount2 = 0; 
var acount3 = 10; //a패턴 데미지 시간 (2/초)
var acount4 = 0;
var aDamage = 100; //a패턴 데미지
var ccount1 = 3; //c패턴
var ccount2 = 0;
var cDamage = 300;
var abool1 = false;
var players = [];
var world;

function init(e)
{
	world = e.npc.getWorld();
}

function tick(e)
{
	if(isAttack)
	{
		if(acount1 <= acount2)
		{
			acount2 = 0;
			abool1 = true;
			var pos = e.npc.getPos();
			players = world.getNearbyEntities(pos, 10, 1);
			
		}
		else if(!abool1)
		{
			acount2++;
		}	
		if(abool1)
		{
			//e.npc.say("1");
			acount4++;
			world.spawnParticle("dripWater", e.npc.getX(),e.npc.getY()+5,e.npc.getZ(), 5, 0.1, 5,10, 300);
			for(var i = 0; i < players.length; i++)
			{
				players[i].damage(aDamage);
			}
			if(acount3 <= acount4)
			{
				acount4 = 0;
				abool1 = false;
				players = [];
			}
		}
	}
}
function damaged(e)
{
	ccount2++;
	//e.npc.say(e.source.getPos().getX());
	if(e.source == null)
		return;
	if(ccount1 <= ccount2)
	{
		ccount2 = 0;
		drawLine(e,world,e.npc.getPos(),e.source.getPos(),7,"dripWater");
		e.source.damage(cDamage);
	}
}

function died(e)
{
	isAttack = false;
	players = [];
}
function target(e)
{
	isAttack = true;
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

function drawLine(e,world, pos1, pos2, resolution, particle) //x,y선잇기 월드,좌표,좌표,선 굵기,
{
    var resolution = resolution || 1; // Draw 1 particle per block
    var particle = particle || "endRod"; // Particle Id
    var NpcAPI = Java.type("noppes.npcs.api.NpcAPI").Instance();
    
    var drawAmount = Math.ceil(pos1.distanceTo(pos2))*resolution;

    var subs = pos2.subtract(pos1);
    for(var i = 0; i < drawAmount; i++) // Draw all particles
    {
        var x = (pos1.getX() + subs.getX()*(i/drawAmount)+0.5).toFixed(4);
        var y = (pos1.getY() + subs.getY()*(i/drawAmount)+0.5).toFixed(4);
        var z = (pos1.getZ() + subs.getZ()*(i/drawAmount)+0.5).toFixed(4);
        var cords =  x + " " + y + " " + z;
        //var output = NpcAPI.executeCommand(world, "particle " + particle + " "+ cords + " 0 0 0 0 1 force @a " + colour);
		e.npc.world.spawnParticle(particle, x,y,z, 0, 0, 0, 0, 1);
    }
}
