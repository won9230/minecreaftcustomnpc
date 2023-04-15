var spawnNPCA = "1"; //이름 바꾸기
var spawnNPCB = "2";
var spawnNPCC = "3";
var NpcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var world;
function interact(e)
{
	world = e.npc.getWorld();
	NpcAPI.getClones().spawn(e.npc.getX(),e.npc.getY(),e.npc.getZ(),1,spawnNPCA,world); //좌표 변경해야됨
	NpcAPI.getClones().spawn(e.npc.getX(),e.npc.getY(),e.npc.getZ(),1,spawnNPCB,world); //좌표 변경해야됨
	NpcAPI.getClones().spawn(e.npc.getX(),e.npc.getY(),e.npc.getZ(),1,spawnNPCC,world); //좌표 변경해야됨
}
