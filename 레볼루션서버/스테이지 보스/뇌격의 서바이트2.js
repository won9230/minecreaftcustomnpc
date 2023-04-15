var cpcount1 = 15;
var cpcount2 = 0;
var cpcount3 = 5;
var cpcount4 = 0;
var isCpAttack = false;
var walkSpeed = 5; //기본 이동속도
var runSpeed = 8; //변경되는 이동속도
var strength1 = 400;
var strength2 = 500;
var npcAi;
var npcStats;
var isAttack = false;

function init(e)
{
	npcAi = e.npc.getAi();
	npcStats = e.npc.getStats();
	walkSpeed = npcAi.getWalkingSpeed();
	strength1 = npcStats.getMelee().getStrength();
}

function tick(e)
{
	if(isAttack)
	{
		if(cpcount1 <= cpcount2)
		{
			cpcount2 = 0;
			isCpAttack = true;
			e.npc.say("천둥의 서바이트가 힘을 방출합니다");
			npcAi.setWalkingSpeed(runSpeed);
			npcStats.getMelee().setStrength(strength2);
			//e.npc.say(npcStats.getMelee().getStrength() + " 속도 " + npcAi.getWalkingSpeed());
		}
		else if(!isCpAttack)
		{
			cpcount2++;
		}
		if(isCpAttack)
		{
			cpcount4++;
			if(cpcount3 <= cpcount4)
			{
				cpcount4 = 0;
				isCpAttack = false;
				npcAi.setWalkingSpeed(walkSpeed);
				npcStats.getMelee().setStrength(strength1);
				//e.npc.say(npcStats.getMelee().getStrength() + " 속도 " + npcAi.getWalkingSpeed());
			}
		}
	}
}

function target(e)
{
	isAttack = true;
}
function targetLost(e)
{
	isAttack = false;
}
function died(e)
{
	isAttack = false;
}
function kill(e)
{
	isAttack = false;
}