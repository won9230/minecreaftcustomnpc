var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var world;
var pos;
var players = [];
var a1 = 0;
var a2 = 0;
var a3 = 0;
var a4 = 0;
var aDamage = 600; //a패턴 데미지
var acount1 = 5; //a번 때리면
var acount2 = 0;
var isAttack = false;

function init(e)
{
	world = e.npc.getWorld();
	pos = e.npc.getPos();
	e.npc.timers.stop(1);
	e.npc.timers.stop(2);
	e.npc.timers.stop(3);
	e.npc.timers.stop(4);
}
function damaged(e)
{
	acount2++;
	if(acount1 < acount2)
	{
		acount2 = 0;
		var pos = e.npc.getPos();
		var facing = Math.floor(e.npc.getRotation() % 360);
		
		if((facing > 225 && facing <=315) || (facing > -135 && facing <= -45)) // Negative values because sometimes the values are negative
		{
			// East, Positive X
			e.npc.timers.forceStart(1,1,true);
		}
		else if((facing > 135 && facing <=225) || (facing > -225 && facing <= -135))
		{
			// North, Negative Z
			e.npc.timers.forceStart(2,1,true);
		}
		else if((facing > 45 && facing <=135) || (facing > -315 && facing <= -225)) 
		{
			e.npc.timers.forceStart(3,1,true);
		}
		else if((facing > 315 && facing <=360) || (facing > -45 && facing <=45) || (facing >= -360 && facing <= -315))
		{
			e.npc.timers.forceStart(4,1,true);
		}
		else
		{
			return;
		}
	}
}
function timer(e)
{
	if(e.id == 1)
	{
		pos = e.npc.getPos();
		a1 += 0.5;
		if(a1 > 10)
		{
			e.npc.timers.stop(1);
			a1 = 0;
			return;
		}
		for(var i = 0; i < 15; i++)
		{
			e.npc.world.spawnParticle("flame", pos.getX()+1+a1,pos.getY()+1.5,pos.getZ()+(i*0.2), 0, 1, 0, 0, 20);
		}
		for(var i = 0; i < 9; i++)
		{
			e.npc.world.spawnParticle("flame", pos.getX()+1+a1,pos.getY()+1.5,pos.getZ()-(i*0.2), 0, 1, 0, 0, 20);
		}
		for(var i = 0; i < 3; i++)
		{
			pos = pos.add(a1,0,i);
			players = world.getNearbyEntities(pos, 2, 1);
		}		
		for(var i = 1; i < 3; i++)
		{
			pos = pos.subtract(0,0,i);
			players = world.getNearbyEntities(pos, 2, 1);
		}
		for(var i = 0; i < players.length; i++)
		{
			players[i].damage(aDamage);
		}
		players = [];
	}
	if(e.id == 2)
	{
		pos = e.npc.getPos();
		a2 += 0.5;
		if(a2 > 10)
		{
			e.npc.timers.stop(2);
			a2 = 0;
			return;
		}
		for(var i = 0; i < 15; i++)
		{
			e.npc.world.spawnParticle("flame", pos.getX()+(i*0.2),pos.getY()+1.5,pos.getZ()-a2, 0, 1, 0, 0, 20);
		}			
		for(var i = 0; i < 9; i++)
		{
			e.npc.world.spawnParticle("flame", pos.getX()-(i*0.2),pos.getY()+1.5,pos.getZ()-a2, 0, 1, 0, 0, 20);
		}
		for(var i = 0; i < 3; i++)
		{
			pos = pos.add(i,0,0);
			players = world.getNearbyEntities(pos, 2, 1);
		}		
		for(var i = 1; i < 3; i++)
		{
			pos = pos.subtract(i,0,a2);
			players = world.getNearbyEntities(pos, 2, 1);
		}
		for(var i = 0; i < players.length; i++)
		{
			players[i].damage(aDamage);
		}
		players = [];
	}
	if(e.id == 3)
	{
		pos = e.npc.getPos();
		a3 += 0.5;
		if(a3 > 10)
		{
			e.npc.timers.stop(3);
			a3 = 0;
			return;
		}
		for(var i = 0; i < 15; i++)
		{
			e.npc.world.spawnParticle("flame", pos.getX()-a3,pos.getY()+1.5,pos.getZ()+(i*0.2), 0, 1, 0, 0, 20);
		}			
		for(var i = 0; i < 9; i++)
		{
			e.npc.world.spawnParticle("flame", pos.getX()-a3,pos.getY()+1.5,pos.getZ()-(i*0.2), 0, 1, 0, 0, 20);
		}
		for(var i = 0; i < 3; i++)
		{
			pos = pos.add(0,0,i);
			players = world.getNearbyEntities(pos, 2, 1);
		}		
		for(var i = 1; i < 3; i++)
		{
			pos = pos.subtract(a3,0,i);
			players = world.getNearbyEntities(pos, 2, 1);
		}
		for(var i = 0; i < players.length; i++)
		{
			players[i].damage(aDamage);
		}
		players = [];
	}
	if(e.id == 4)
	{
		pos = e.npc.getPos();
		a4 += 0.5;
		if(a4 > 10)
		{
			e.npc.timers.stop(4);
			a4 = 0;
			return;
		}
		for(var i = 0; i < 15; i++)
		{
			e.npc.world.spawnParticle("flame", pos.getX()+(i*0.2),pos.getY()+1.5,pos.getZ()+1+a4, 0, 1, 0, 0, 20);
		}			
		for(var i = 0; i < 9; i++)
		{
			e.npc.world.spawnParticle("flame", pos.getX()-(i*0.2),pos.getY()+1.5,pos.getZ()+1+a4, 0, 1, 0, 0, 20);
		}
		for(var i = 0; i < 3; i++)
		{
			pos = pos.add(i,0,a4);
			players = world.getNearbyEntities(pos, 2, 1);
		}		
		for(var i = 1; i < 3; i++)
		{
			pos = pos.subtract(i,0,0);
			players = world.getNearbyEntities(pos, 2, 1);
		}
		for(var i = 0; i < players.length; i++)
		{
			players[i].damage(aDamage);
		}
		players = [];
	}
}

function died(e)
{
	isAttack = false;
	e.npc.timers.stop(1);
	e.npc.timers.stop(2);
	e.npc.timers.stop(3);
	e.npc.timers.stop(4);
}
function target(e)
{
	isAttack = true;
	e.npc.timers.stop(1);
	e.npc.timers.stop(2);
	e.npc.timers.stop(3);
	e.npc.timers.stop(4);
}
function targetLost(e)
{
	isAttack = false;
	e.npc.timers.stop(1);
	e.npc.timers.stop(2);
	e.npc.timers.stop(3);
	e.npc.timers.stop(4);
}
function kill(e)
{
	isAttack = false;
	acount2 = 0;
	e.npc.timers.stop(1);
	e.npc.timers.stop(2);
	e.npc.timers.stop(3);
	e.npc.timers.stop(4);
}