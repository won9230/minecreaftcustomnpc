//기가이어스 플레이어가 때리면 데미지2로고정 40퍼
var NpcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();

function damaged(e)
{
	var source = e.source;
	if(source == null)
		return;
	var health = source.getHealth();
	//e.npc.say(health);
	e.source.setHealth(health - 2);
}

function died(e)
{
	NpcAPI.executeCommand(e.npc.getWorld(),"setblock 710 100 -1466 minecraft:redstone_block");
}