var targetPlayer;
var gocount = 0;
var acount =0;
var bcount =0;
var state;

function tick(e)
{
	e.npc.say(state);
	if(state != 1 && state != 2)
	{
		gocount++;
		state = 0;
	}
	if(gocount == 10 && state == 0)
	{
		state = 1;
		e.npc.say("바뀜"+state);
	}
	if(gocount == 20 && state == 0)
	{
		state = 2;
		e.npc.say("바뀜"+state);
	}
	switch(state)
	{
		case 1 :
		e.npc.timers.start(1,5,false);
		break;
		case 2 :
		e.npc.timers.start(2,5,false);
		break;
		case 0 :
		//e.npc.say("soso  "+gocount);
		if(targetPlayer && gocount != 30) return;
		var targetPlayers = e.npc.getWorld().getNearbyEntities(e.npc.getPos(), 15, 1 );
		var randon = Math.floor(Math.random()* targetPlayers.length);
		targetPlayer = targetPlayers[randon]; 
		break;
	}
}
function timer(e)
{
	if(e.id == 1 && targetPlayer)
	{
		e.npc.say("acount "+acount);
		acount++;
		var projectileItem = e.npc.getInventory().getProjectile();
		var x,y,z;
		x = Math.floor(targetPlayer.getX());
		y = Math.floor(targetPlayer.getY())+1;
		z = Math.floor(targetPlayer.getZ());
		var shoot =	e.npc.shootItem(x,y,z,projectileItem,100);
		var shoot =	e.npc.shootItem(x,y,z,projectileItem,100);
		shoot.setHeading(e.npc.getRotation(),9);
		if(acount > 5)
		{
			acount = 0;
			state = 0;
			gocount++;
			e.npc.timers.stop(1);
		}
	}
	if(e.id == 2 && targetPlayer)
	{
		e.npc.say("2 start");
		bcount++;
		var npc = e.npc;
		var x,y,z,r,oneShoting,projectileItem,ran,rotation;
		projectileItem = e.npc.getInventory().getProjectile();
		x = npc.getBlockX();
		y = npc.getBlockY();
		z = npc.getBlockZ();
		r = 5;
		ran = Math.floor(Math.random()*10);
		rotation = npc.getRotation() % 360;
		oneShoting = 10;
		for(var i = 0; i <= oneShoting;i++)
		{
			e.npc.shootItem(x*rcos(i,oneShoting)*rotation ,y+1.6,z*rsin(i,oneShoting)*rotation,projectileItem,100);
		}
		if(bcount >= 3)
		{
			bcount =0;
			state = 0;
			gocount = 0;
			e.npc.timers.stop(2);
		}
	}
}

//=======================================
function rcos(r,oneShoting)
{
	return Math.cos(Math.PI *2* r / oneShoting);
}
function rsin(r,oneShoting)
{
	return Math.sin(Math.PI *2*r / oneShoting);	
}