var acount = 0;
var acountTime = 5;
var patARaege = 15;
var players = [];
var isAttack;
var world;
function init(e)
{
	isAttack = false;
	world = e.npc.getWorld();
	world.getTempdata().put('7boss2',false);
}
function tick(e)
{
	world.getTempdata().put('7boss2',e.npc.getHealth() <= e.npc.getMaxHealth() * 0.3);
	if(isAttack)
	{
		acount++;
		if(acount > acountTime)
		{
			players = e.npc.getWorld().getNearbyEntities(e.npc.getPos(),patARaege,1);
			var ranPlayer = Math.floor(Math.random()* players.length);
			//e.npc.say(players[ranPlayer]);
			playerBehind(e,players[ranPlayer]);
			acount = 0;
		}
	}
	//e.npc.say(e.npc.getHealth() <= e.npc.getMaxHealth * 0.2);
}
function target(e)
{
	isAttack = true;
}
function targetLost(e)
{
	isAttack = false;
}
function died(e)
{
	isAttack = false;
}
function kill(e)
{
	isAttack = false;
}
function damaged(e)
{
	if(world.getTempdata().get('7boss1') && world.getTempdata().get('7boss2'))
	{
		e.setCanceled(false);
	}
	else if(world.getTempdata().get('7boss1'))
	{
		e.setCanceled(false);
	}
	
	else if(world.getTempdata().get('7boss2'))
	{
		e.setCanceled(true);
	}

}
function playerBehind(e,player)
{
	var pos = player.getPos();
    var facing = player.getRotation();
    if((facing > 225 && facing <=315) || (facing > -135 && facing <= -45)) // Negative values because sometimes the values are negative
        {
            // East, Positive X
            pos = pos.add(0,0,1);
            e.npc.setPos(pos);
        }
        else if((facing > 135 && facing <=225) || (facing > -225 && facing <= -135))
        {
            // North, Negative Z
            pos = pos.subtract(1,0,0);
             e.npc.setPos(pos);
        }
        else if((facing > 45 && facing <=135) || (facing > -315 && facing <= -225)) 
        {
            // West, Negative X
            pos = pos.subtract(0,0,1);
             e.npc.setPos(pos);
        }
        else if((facing > 315 && facing <=360) || (facing > -45 && facing <=45) || (facing >= -360 && facing <= -315))
        {
            // South, Positive Z
            pos = pos.add(1,0,0);
             e.npc.setPos(pos);
        }
        else
        {
            // Something went wrong
            log("[Error!] Couldn't determine where player was looking!");
            log("Facing was: " + facing);
        }
}