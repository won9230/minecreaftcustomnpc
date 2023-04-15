var spawnNPC = new Array();//npc 소환
spawnNPC[0] = "1";
spawnNPC[1] = "대지의 토템";
spawnNPC[2] = "물의 토템";
var NpcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var world;
function interact(e) 
{
	var ranX,ranY,ranZ,MPran;
	MPran = Math.floor(Math.random()*2); //좌표 마이너스 플러스
	for(var i = 0; i < 3; i++)
	{
		ranX = Math.floor(Math.random()*7+1); //x,y,z,좌표
		ranZ = Math.floor(Math.random()*7+1);
		if(MPran)
		{
			ranX *= -1;
			ranZ *= 1;
		}
		else
		{
			ranX *= 1;
			ranZ *= -1;
		}
		world = e.npc.getWorld();
		NpcAPI.getClones().spawn(e.npc.getX()+ranX,e.npc.getY()+0.5,e.npc.getZ()+ranZ,1,spawnNPC[i],world); //좌표 변경해야됨
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var NpcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();//플레이어 좌표 이동
var TP_PlayerName;
function interact(e)
{
	var a = new Array();
	for(var i = 0; i < 2; i++)
	{
		var ran = Math.floor(Math.random()*4);
			e.npc.say(ran);
		switch(ran)
		{
			case 0:
				a[0] = e.npc.getX()+Math.floor(Math.random()*5+1);
				a[1] = e.npc.getZ()+Math.floor(Math.random()*5+1);
			break;
			case 1:
				a[0] = e.npc.getX()-Math.floor(Math.random()*5+1);
				a[1] = e.npc.getZ()+Math.floor(Math.random()*5+1);
			break;
			case 2:
				a[0] = e.npc.getX()+Math.floor(Math.random()*5+1);
				a[1] = e.npc.getZ()-Math.floor(Math.random()*5+1);
			break;
			case 3:
				a[0] = e.npc.getX()-Math.floor(Math.random()*5+1);
				a[1] = e.npc.getZ()-Math.floor(Math.random()*5+1);
			break;
		}
	}
	TP_PlayerName = e.player.getName();
	NpcAPI.executeCommand(e.npc.getWorld(),'tp '+TP_PlayerName+' '+a[0]+' '+e.npc.getY()+' '+a[1]);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////

var tempData;
var world;
function interact(e)
{
	world = e.npc.getWorld();
	tempData = world.getTempdata();
	tempData.put('1',1);
}