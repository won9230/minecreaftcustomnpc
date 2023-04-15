var npcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();
var npcAI;
var ranPlayer;
var poison = false;
var patB = false;
var walkingSpeed; 
var players = [];
var a = 50;             //독 or 멀미 발생 확률
var poisonTime = 3;     //독 시간
var poisonDamage = 30;   //독 데미지
var nauseaTime = 1;     //멀미 시간
var patBcooltime1 = 10; //광역 독 패턴 쿨타임
var patBTime = 5;      //광역 독 패턴 독 시간
var patBRaege = 5;     //광역 독 패턴 범위
var patBdamage = 70; //광역 독 데미지
var patBcooltime2 = 0;
var isAttack = false;

function init(e)
{
	poisonTime *= 20;
	patBTime *= 20;
	npcAI = e.npc.getAi();
	walkingSpeed = npcAI.getWalkingSpeed();
	isAttack = false;
}
function target(e)
{
	isAttack = true;
}
function kill(e)
{
	ranPlayer = null;
	isAttack = false;
	//e.npc.say("kill" + isAttack);
	patB = false;
}
function targetLost(e)
{
	isAttack = false;
	//e.npc.say("targetLost" + isAttack);
	ranPlayer = null;
	poison = false;
}
function died(e)
{
	poison = false;
	isAttack = false;
	ranPlayer = null;
}
function tick(e)
{
	if(isAttack)
	{	
		if(poison)
		{
			ranPlayer.damage(poisonDamage);
		}
		//////////////////////////////////////////////////////////////////////////////////
		if(patBcooltime1 <= patBcooltime2)
		{
			patBcooltime2 = 0;
			patB = true;
		}
		else if(!patB)
		{
			patBcooltime2++;
		}
		
		if(patB)
		{
			players = e.npc.getWorld().getNearbyEntities(e.npc.getPos(),patBRaege,1);
			if(!e.npc.timers.has(2))
			{
				e.npc.timers.forceStart(2,patBTime,true);
			}
			if(players.length <= 1)
			{
				for(var i = 0; i < players.length; i++)
				{
					players[i].damage(patBdamage);
					//e.npc.say(isAttack);
				}
			}
		}
	}
}

function damaged(e)
{
	if(isAttack)
	{
		var source = e.source;
		if(Ran(100) < a)
		{
			ranPlayer = e.source; //플레이어 이름 가져오기
			if(Ran(2) == 1)
			{
				poison = true;
				e.npc.timers.forceStart(1,poisonTime,true);
			}
			else
			{
				npcAPI.executeCommand(e.npc.getWorld(),"effect "+ ranPlayer.getName() +" minecraft:nausea " + nauseaTime + " 1 true");			
			}	
		}
	}
}

function timer(e)
{
	if(e.id == 1)
	{	
		poison = false;
		e.npc.timers.stop(1);
	}
	if(e.id == 2)
	{
		patB = false;
		e.npc.timers.stop(2);
	}
}

function Ran(a)
{
	return Math.floor(Math.random()*a)+1;
}
function StopNpc(e)
{
	npcAI.setWalkingSpeed(0);
}