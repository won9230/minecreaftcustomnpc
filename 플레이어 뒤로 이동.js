function interact(e)
{
	playerBehind(e);
}

function playerBehind(e)
{
	var pos = e.player.getPos();
    var facing = e.player.getRotation();
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
            // Something went wrong
            log("[Error!] Couldn't determine where player was looking!");
            log("Facing was: " + facing);
        }
}