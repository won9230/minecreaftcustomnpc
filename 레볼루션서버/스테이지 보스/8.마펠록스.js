var NpcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var isAttack = false;
var aPatDamage = 80; //가시 데미지
var apcount1 = 5;
var apcount2 = 0;
var apDamage = 100; //a패턴 데미지
var world;

function init(e)
{
	world = e.npc.getWorld();
}

function damaged(e)
{
	var source = e.source;
	if(source == null)
		return;
	var health = source.getHealth();
	//e.npc.say(health);
	source.setHealth(health - aPatDamage);
	
	apcount2++;
	if (apcount1 <= apcount2)
	{
		if(e.source == null)
			return;
		apcount2 = 0;
		var pos = e.source.getPos();
		var name = e.source.getName();
		e.source.damage(apDamage);
		world.thunderStrike(pos.getX(),pos.getY(),pos.getZ());
	}
}