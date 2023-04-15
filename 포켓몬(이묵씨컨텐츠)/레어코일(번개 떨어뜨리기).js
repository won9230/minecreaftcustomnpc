var target;
var playerX;
var playerY;
var playerZ;

function meleeAttack(e)
{
	var world = e.npc.getWorld();
	var a = e.npc.getAttackTarget();

	var ran;
	ran = Math.floor(Math.random() * 100);
	e.npc.say(ran);
	if(ran >= 50)
	{
		world.thunderStrike(a.getX(),a.getY(),a.getZ());
	}
}
