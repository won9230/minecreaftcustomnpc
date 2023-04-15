var world;
var NpcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var apat1 = false;
var apatDamage = false;
var isAttack = false;

function init(e)
{
	apat1 = false;
	isAttack = false;
	world = e.npc.getWorld();
	world.getTempdata().put('cram1',false);
	world.getTempdata().put('cram2',false);
	world.getTempdata().put('cram3',false);
	world.getTempdata().put('cram4',false);
}

function tick(e)
{
	//e.npc.say(world.getTempdata().get('cram1')+world.getTempdata().get('cram2')+world.getTempdata().get('cram3')+world.getTempdata().get('cram4'));
	if(e.npc.getMaxHealth() * 0.5 >= e.npc.getHealth() && !apat1)
	{
		//e.npc.say(1)
		NpcAPI.getClones().spawn(455,52,3728,5,'생크림',world); //좌표 변경해야됨
		NpcAPI.getClones().spawn(455,51,3706,6,'생크림',world); //좌표 변경해야됨
		NpcAPI.getClones().spawn(501,51,3716,7,'생크림',world); //좌표 변경해야됨
		NpcAPI.getClones().spawn(458,51,3717,8,'생크림',world); //좌표 변경해야됨
		apatDamage = true;
		apat1 = true;
	}
	if(world.getTempdata().get('cram1')&&world.getTempdata().get('cram2')&&world.getTempdata().get('cram3')&&world.getTempdata().get('cram4'))
	{
		apatDamage = false;
	}
}
function damaged(e)
{
	if(apatDamage)
	{
		e.setCanceled(true);
		e.npc.say(world.getTempdata().get('cram1'));
		e.npc.say(world.getTempdata().get('cram2'));
		e.npc.say(world.getTempdata().get('cram3'));
		e.npc.say(world.getTempdata().get('cram4'));
	}
	else
	{
		e.setCanceled(false);		
	}
}

