var world;

function init(e)
{
	world = e.npc.getWorld();
	world.getTempdata().put('cram1',false);
	//e.npc.say(world.getTempdata().get('spawnNpc1'));
}

function died(e)
{
	world.getTempdata().put('cram1',true);
}