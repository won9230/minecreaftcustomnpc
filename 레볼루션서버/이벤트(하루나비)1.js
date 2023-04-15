var world;
var NpcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var apat1 = false;
var apatDamage = false;

function init(e)
{
	apat1 = false;
	world = e.npc.getWorld();

}

function tick(e)
{
	//e.npc.say(world.getTempdata().get('cram1')+world.getTempdata().get('cram2')+world.getTempdata().get('cram3')+world.getTempdata().get('cram4'));
	if(e.npc.getMaxHealth() * 0.5 >= e.npc.getHealth() && !apat1)
	{
		//e.npc.say(1);
		NpcAPI.getClones().spawn(617,51,3717,5,'하루나비',world); //좌표 변경해야됨
		NpcAPI.getClones().spawn(625,51,3728,6,'하루나비',world); //좌표 변경해야됨
		NpcAPI.getClones().spawn(625,51,3706,7,'하루나비',world); //좌표 변경해야됨
		NpcAPI.getClones().spawn(572,51,3717,8,'하루나비',world); //좌표 변경해야됨
		apatDamage = true;
		apat1 = true;
	}
	if(world.getTempdata().get('nabi1')&&world.getTempdata().get('nabi2')&&world.getTempdata().get('nabi3')&&world.getTempdata().get('nabi4'))
	{
		apatDamage = false;
	}
}
function damaged(e)
{
	if(apatDamage)
	{
		e.setCanceled(true);
	}
	else
	{
		e.setCanceled(false);		
	}
}