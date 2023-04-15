var tempDate;
function init(e)
{
	tempData = world.getTempdata();
	tempData.put('killall',false);
}
function tick(e)
{
	killall = tempData2.get('killall');
	if(killall)
	{
		tempData2.put('killall',true);
		e.npc.kill();
	}
}