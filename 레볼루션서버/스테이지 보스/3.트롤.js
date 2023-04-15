var npcHp;
var acount = 0;
var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var world;
function init(e)
{
	world = e.npc.getWorld();
}
function damaged(e) 
{
        npcHp = e.npc.getHealth();
        acount++;
        //e.npc.say(npcHp);
        if (acount >= 10) 
		{
			e.npc.say(acount);
			var name = e.source.getName();
			npcAPI.executeCommand(world,"effect " +name+ " minecraft:slowness 5 10 true");
            //e.npc.say("작동 " +e.npc.getHealth());
            acount = 0;
        }
}
