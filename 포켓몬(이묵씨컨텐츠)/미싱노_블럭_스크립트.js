var block;
var state;
var statePermute;
var tempData;
var world;
var acount;
var playtime = 6;
function init(e)
{
	block = e.block;
	block.setModel("minecraft:gold_block");//minecraft:iron_block
	block.setRotation(0,270,0);
	world = block.getWorld();
	tempData = world.getTempdata();
	tempData.put('statePermute',false);
}

function tick(e)
{
	statePermute = tempData.get('statePermute');
	if(statePermute)
	{
		//e.block.executeCommand("say 변경");
		state = Math.floor(Math.random()*20);
		//e.block.executeCommand("say " + state); //디버깅
		switch (state)
		{
			case 0:
				block.setModel("minecraft:gold_block"); //기본 폼
				e.block.timers.forceStart(1,playtime,true);
			break;
			case 1:
				block.setModel("minecraft:packed_ice"); //얼음 상태이상
				e.block.timers.forceStart(1,playtime,true);
			break;
			case 2:
				block.setModel("minecraft:concrete"); //수면 상태이상
				e.block.timers.forceStart(1,playtime,true);
			break;
			case 3:
				block.setModel("minecraft:magma"); //화상 상태이상
				e.block.timers.forceStart(1,playtime,true);
			break;
			case 4:
				block.setModel("minecraft:slime"); //독 상태이상
				e.block.timers.forceStart(1,playtime,true);
			break;
			case 5:
				block.setModel("minecraft:sponge"); //마비 상태이상
				e.block.timers.forceStart(1,playtime,true);
			break;
			case 6:
				block.setModel("minecraft:lapis_block"); //물
				e.block.timers.forceStart(1,playtime,true);
			break;
			default:
				block.setModel("minecraft:gold_block"); //기본 폼
				e.block.timers.forceStart(1,playtime,true);
			return;
		}
	}
}

function collide(e)
{
	var player = e.entity.getName(); //플레이어 이름 가져오기
	//e.block.executeCommand("say 플레이어 이름 : " + player); 디버깅
	switch (state)
	{
		case 0:
		//e.block.executeCommand("say state0");
		break;
		case 1:
			e.block.executeCommand("effect "+ player +" minecraft:weakness 5 4 true"); //나약함 얼음 
			e.block.executeCommand("effect "+ player +" minecraft:slowness 5 4 true"); //슬로우
		break;
		case 2:
			e.block.executeCommand("effect "+ player +" minecraft:blindness 5 4 true"); //시야차단 콘크리트
			e.block.executeCommand("effect "+ player +" minecraft:weakness 5 4 true"); //나약함
		break;		
		case 3:
			//e.block.executeCommand("effect "+ player +" minecraft:weakness 5 2 true"); //화상
			e.block.executeCommand("setblock ~ ~1 ~ minecraft:lava"); //화상 용암
			e.block.timers.forceStart(2,5,true);
		break;	
		case 4:
			e.block.executeCommand("effect "+ player +" minecraft:poison 3 4 true"); //독
		break;			
		case 5:
			e.block.executeCommand("effect "+ player +" minecraft:slowness 5 4 true"); //마비
			e.block.executeCommand("effect "+ player +" minecraft:nausea 5 2 true"); 
		break;
		case 6:
			e.block.executeCommand("setblock ~ ~1 ~ minecraft:water"); //화상
			e.block.timers.forceStart(2,5,true);
		default:
		statePermute = false;
		//e.block.executeCommand("say state지남");
		return;
	}
}
function timer(e)
{
	if(e.id == 1)
	{	
		statePermute = false;
		tempData.put('statePermute',false);
		e.block.timers.stop(1);
	}
	if(e.id == 2)
	{
		e.block.executeCommand("setblock ~ ~1 ~ minecraft:air"); //화상
		e.block.timers.stop(2);
	}
}
// ///////////////////////////////////////////////////////////////

// var tempData;
// var world;
// function init(e)
// {
	// world = e.npc.getWorld();
// }
// function interact(e)
// {	
	// tempData = world.getTempdata();
	// tempData.put('statePermute',true);
// }


// // var tempData;
// // var world;
// // function interact(e)
// // {
	// // world = e.npc.getWorld();
	// // tempData = world.getTempdata();
	// // var a = tempData.get('1');
	// // e.npc.say(a);
// // }
