var acount = 0;
var aDamage = 600;
var ran1 = 3;

function damaged(e)
{
	if(acount >= ran1)
	{
		playerBehind(e);
		e.source.damage(aDamage);
		ran1 = Math.floor(Math.random() * 4) + 1
		acount = 0;
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