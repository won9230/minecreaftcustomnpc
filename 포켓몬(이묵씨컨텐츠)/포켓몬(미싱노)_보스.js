var spawnNPC = new Array();//npc 소환
spawnNPC[0] = '아이스크';
spawnNPC[1] = '럭키';
spawnNPC[2] = '폴리곤Z';
var NpcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var world;
var TP_PlayerName;
var tempData;
var tempData2;
var acount = 0;
var block_Skill_Start = false;
var bossHits = 0;
var start = false;
var killall = false;

var MAXACOUNT = 10; //10초에 한번
var BOSS_ATTACK_RAN = 85; //보스 확률
var BOOS_HIT = 20; //보스가 스킬을 쓰기까지 맞는 횟수

function init(e)
{
	MAXACOUNT *= 2;
	world = e.npc.getWorld();
	tempData2 = world.getTempdata();
	tempData2.put('killall',false);
	//start = true;
}

function tick(e)
{
	if(start){
	block_Skill_Start = false;
	//e.npc.say(acount); 카운드 디버깅

	acount++;
	if(acount > MAXACOUNT)
	{
		block_Skill_Start = true;
		acount = 0;
	}
	if(block_Skill_Start)
	{
		tempData = world.getTempdata();
		tempData.put('statePermute',true);
		block_Skill_Start = false;
	}
	}
}
function damaged(e)
{
	start = true;
	if(start){
	var ran = Math.floor(Math.random()*100);
	bossHits++;
	e.npc.setPosition(1205,109,-275);
	//e.npc.say(bossHits); //보스 히트 디버깅
	//e.npc.say(ran); //보스 랜덤 디버깅
	if(ran > BOSS_ATTACK_RAN)
	{
		var ranX,ranY,ranZ,MPran,NSran,Monran;
		
		NSran = Math.floor(Math.random()*(6-4)+4);
		MPran = Math.floor(Math.random()*2); //좌표 마이너스 플러스
		for(var i = 0; i < NSran; i++)
		{
			ranX = Math.floor(Math.random()*7+2); //x,y,z,좌표
			ranZ = Math.floor(Math.random()*7+2);
			Monran = Math.floor(Math.random()*(3-0)+0);
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
			NpcAPI.getClones().spawn(e.npc.getX()+ranX,e.npc.getY()+0.5,e.npc.getZ()+ranZ,2,spawnNPC[Monran],world); //좌표 변경해야됨
		}
	}
		//e.npc.say(e.source.getName());
	if(bossHits >= BOOS_HIT)
	{
		if(e.source.getName() != null)
		{
		TP_PlayerName = e.source.getName();
		bossHits = 0;
		NpcAPI.executeCommand(e.npc.getWorld(),'tp '+TP_PlayerName+' '+1000+' '+121+' '+-1000);
		}
	}
	}
}
function died(e)
{
	killall = tempData2.get('killall');
	if(killall)
	{
		tempData2.put('killall',true);
	}
	NpcAPI.executeCommand(e.npc.getWorld(),"setblock 732 100 -1466 minecraft:redstone_block");
}
// function interact(e)
// {	
	// TP_PlayerName = e.player.getName();
	// e.npc.say(TP_PlayerName);
// }