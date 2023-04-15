var maxHp;
var npchp;
var stats;
var bbool = false;
var notNpcDamage = false;
var NpcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var spawnNPC1 = "세테르의 결정1";
var spawnNPC2 = "세테르의 결정2";
var spawnNPC3 = "세테르의 결정3";
var spawnNPC4 = "세테르의 결정4";
var world;
var isAttack;


function init(e)
{
	stats = e.npc.getStats();
	maxHp = stats.getMaxHealth();
	world = e.npc.getWorld();
	world.getTempdata().put('spawnNpc1',false);
	world.getTempdata().put('spawnNpc2',false);
	world.getTempdata().put('spawnNpc3',false);
	world.getTempdata().put('spawnNpc4',false);
}
function tick(e)
{
	if(isAttack)
	{
		npchp = e.npc.getHealth();
		if(npchp <= maxHp * 0.5 && !bbool)
		{
			notNpcDamage = true;
			bbool = true;
			//e.npc.say(notNpcDamage);
			NpcAPI.getClones().spawn(e.npc.getX()+5,e.npc.getY(),e.npc.getZ(),8,spawnNPC1,world); //좌표 변경해야됨
			NpcAPI.getClones().spawn(e.npc.getX(),e.npc.getY(),e.npc.getZ()-5,8,spawnNPC2,world); //좌표 변경해야됨
			NpcAPI.getClones().spawn(e.npc.getX()-5,e.npc.getY(),e.npc.getZ(),8,spawnNPC3,world); //좌표 변경해야됨
			NpcAPI.getClones().spawn(e.npc.getX(),e.npc.getY(),e.npc.getZ()+5,8,spawnNPC4,world); //좌표 변경해야됨
		}
		if(world.getTempdata().get('spawnNpc1') && world.getTempdata().get('spawnNpc2') && world.getTempdata().get('spawnNpc3') && world.getTempdata().get('spawnNpc4'))
		{
			notNpcDamage = false;
		}
	}
}
function damaged(e)
{
	if(notNpcDamage)
	{
		e.setCanceled(true);
	}
	else
	{
		e.setCanceled(false);
	}
}
function died(e)
{
	isAttack = false;
}
function target(e)
{
	isAttack = true;
}
function targetLost(e)
{
	isAttack = false;
}
function kill(e)
{
	isAttack = false;
}
